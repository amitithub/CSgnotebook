# 🧠 Session Context & Architecture Log
**Project:** Gemini Notebook Use Case Portal
**Last Updated:** 2026-07-23
**File Delivered:** `Index.html` (Single-file SPA architecture)

## 1. Core Architecture Decisions
* **Zero Backend / Edge Computing:** The app runs 100% in the browser. There is no Node.js, Python, or external database.
* **Dual-Storage Engine (Crucial):** 
  * `localStorage`: Stores the JSON `state` object (titles, text, settings, landing page content, prompt templates). It is synchronous and fast, but has a ~5MB limit.
  * `IndexedDB` (Database: `NotebookPortalDB`, Store: `media`): Stores image blobs (Base64). It is asynchronous and handles gigabytes of data. *We had to split these because putting images in localStorage was crashing the browser.*
* **Smart Video Iframe Parser (`getEmbedUrl`):** Browsers block standard `youtube.com/watch?v=` links in iframes. We built a regex parser to auto-convert YouTube and Loom links into their `/embed/` equivalents on the fly.
* **Image Editing (`Cropper.js`):** Integrated via CDN to allow users to crop, rotate, and zoom images locally before saving them to IndexedDB.
* **Zero-Asset Graphic Architecture:** Instead of relying on `.jpg` or `.png` files, we use inline, scalable SVGs (like the Gemini Notebook hero logo) to maintain the single-file portability and ensure infinite resolution.

## 2. Routing Logic (Single File Workaround)
Because everything is in `Index.html`, we simulated a router:
* **Welcome View (First-Visit):** If no data exists, shows an import prompt to easily onboard new users sharing the file.
* **Home Dashboard:** Default state (`Index.html`) showing Hero, Prompts, Case Studies Accordion, Stats, and Grid. Now includes smooth-scrolling sticky navigation.
* **Creator View:** Uses Hash Routing (`#create`).
* **Admin View:** Uses Hash Routing (`#admin`). 
* **Feature View (New Tab):** Uses Query Parameters (`Index.html?id=1690000000000`). Fetches text from `state`, fetches images from `IndexedDB`.

## 3. State Management Shape
The `state` object in localStorage looks exactly like this:
```json
{
  "isDark": false,
  "password": "admin123",
  "adminEmail": "admin@yourcompany.com",
  "portalTitle": "Gemini Notebook Use Case",
  "landingOverview": {
    "title": "...",
    "content": "...",
    "supportContext": "..."
  },
  "landingSummary": "...",
  "caseStudySections": [
    {
      "id": "cs-1",
      "order": 1,
      "title": "Log Investigation & Root Cause Analysis",
      "challenge": "...",
      "solution": "...",
      "impact": "...",
      "pros": ["..."],
      "cons": ["..."],
      "status": "active"
    }
  ],
  "promptSamples": [
    {
      "id": "p1",
      "title": "Log Analysis & RCA",
      "text": "Act as a senior Tableau engineer..."
    }
  ],
  "features": [
    {
      "id": "1690000000000",
      "title": "Mind Map",
      "details": "Text...",
      "usecase": "Text...",
      "refUrl": "https://...",
      "media": [{ "type": "video", "url": "https://..." }],
      "createdAt": 1690000000000
    }
  ],
  "setupComplete": true
}
```

## 4. Current Constraints & Quirks
* **Cross-Device Sync:** Because there is no backend, data lives on the local machine. We added an **Export/Import** JSON feature to manually move data between computers. The new "Welcome Screen" forces users to import if they have no data.
* **Theme Persistence:** Fixed a bug where dark mode was resetting in new tabs. `applyTheme()` now runs strictly before `handleRoute()` on DOM load to prevent "flash of white screen".
* **Tailwind CDN:** Requires an internet connection to render styles.

## 5. What Was Built So Far
- [x] Complete Dashboard Redesign (Hero, NotebookLM Overview, Dynamic Stats).
- [x] Global Sticky Navigation with smooth scrolling.
- [x] Tableau-specific Expert Prompts section with 1-Click Clipboard copying.
- [x] Slack Canvas Generator to aggregate portal state into shareable text.
- [x] Case Studies Accordion (7 pre-populated, admin-manageable sections).
- [x] Creator Form (Refactored UI, resizable textareas).
- [x] Built-in Image Cropping (Cropper.js) integrated into Admin panel.
- [x] Welcome Screen for first-time visitors to import `.json` backups.
- [x] "View All" Grid layout integrated into the Home dashboard.
- [x] Split-Screen Feature Reader (Text scrolls left, Media is sticky right).
- [x] Admin Panel (Password gate, Edit/Update/Delete features).
- [x] Admin Tabs for Landing Page Content CRUD (Overview, Case Studies, Prompts).
- [x] Replaced external images with scalable SVG vector graphics.
- [x] Export/Import Database functionality.

## 6. Logical Next Steps (If requested later)
1. **Markdown Support:** Integrate a library like `marked.js` so users can use **bold** and `code blocks` in the Details/Usecase textareas instead of just plain text.
2. **PWA (Progressive Web App):** Add a `manifest.json` and Service Worker so stakeholders can "Install" this web app to their desktop like a native application, allowing it to run fully offline (if Tailwind is pre-compiled).
3. **Analytics Dashboard:** Add a chart library (e.g. Chart.js) to the Admin panel to track usecase trends over time.
