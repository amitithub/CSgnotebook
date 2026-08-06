export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      // 2. Parse the incoming submission from the web portal
      const payload = await request.json();
      
      // We expect payload to have { state: {...}, media: {...} }
      if (!payload.state || !payload.state.features) {
        return new Response("Invalid payload", { status: 400 });
      }

      // 3. Configuration (Provided via Cloudflare Secrets/Env)
      const GITHUB_TOKEN = env.GITHUB_PAT;
      const REPO_OWNER = env.REPO_OWNER || "amitithub";
      const REPO_NAME = env.REPO_NAME || "CSgnotebook";
      const FILE_PATH = "data.json";

      if (!GITHUB_TOKEN) {
        return new Response("Server configuration error: Missing GITHUB_PAT", { status: 500 });
      }

      const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

      // 4. Fetch the current data.json SHA from GitHub (required to update a file)
      const getReq = await fetch(githubApiUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Cloudflare-Worker",
          "Accept": "application/vnd.github.v3+json"
        }
      });

      let currentSha = null;
      if (getReq.ok) {
        const fileInfo = await getReq.json();
        currentSha = fileInfo.sha;
      }

      // 5. Convert the JSON payload to a base64 string safely
      const jsonString = JSON.stringify(payload);
      
      // Cloudflare Workers support btoa, but for unicode we need to escape it
      const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

      // 6. Commit the new file to GitHub
      const commitMessage = `Auto-publish: New Use Case added via Web Portal`;
      
      const putBody = {
        message: commitMessage,
        content: base64Content,
        branch: "main"
      };
      
      if (currentSha) {
        putBody.sha = currentSha;
      }

      const putReq = await fetch(githubApiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Cloudflare-Worker",
          "Content-Type": "application/json",
          "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify(putBody)
      });

      if (!putReq.ok) {
        const errorText = await putReq.text();
        console.error("GitHub API Error:", errorText);
        return new Response(`Failed to commit to GitHub: ${errorText}`, { status: 502 });
      }

      // 7. Success Response
      return new Response(JSON.stringify({ success: true, message: "Use case published successfully!" }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });

    } catch (error) {
      return new Response(`Error processing request: ${error.message}`, { status: 500 });
    }
  }
};
