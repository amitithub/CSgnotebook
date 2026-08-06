# 📓 Gemini Notebook Use Case Portal

A zero-backend, enterprise-grade Single Page Application (SPA) designed to serve as a centralized knowledge-sharing hub. It documents how Google's NotebookLM features (like Mind Maps, Audio Overviews, and Data Tables) can be leveraged by technical support teams (e.g., Tableau Tech Support) to drastically improve productivity, investigate logs, and navigate system limitations.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![No Backend Required](https://img.shields.io/badge/Backend-None_Single_File-success)
![Cloudflare](https://img.shields.io/badge/Deployed-Cloudflare_Workers-F38020?style=flat&logo=cloudflare&logoColor=white)

**Salesforce Internal (GitPages):** [https://git.soma.salesforce.com/pages/anarsikar/Gemini_Notebook/](https://git.soma.salesforce.com/pages/anarsikar/Gemini_Notebook/)
**Public GitHub Demo:** [https://amitithub.github.io/WebPortal/](https://amitithub.github.io/WebPortal/)

## 🌟 Project Highlights & Insights

Building a dynamic, media-heavy web application without a traditional backend (Node.js, Python, etc.) presents unique challenges regarding data persistence and UI responsiveness. This project solves these elegantly:

1. **Dual-Database Client-Side Architecture:** 
   Browsers limit `localStorage` to ~5MB. Storing multiple high-resolution screenshots as Base64 strings quickly crashes standard applications. To solve this, this app uses a **split-storage strategy**:
   * **`localStorage`** is used for instant, synchronous retrieval of text data (titles, descriptions, settings, prompts).
   * **`IndexedDB`** is used as an asynchronous, high-capacity database to store heavy binary media (images), preventing UI freezes and data loss.
2. **SPA Routing & State Management in a Single File:** 
   Using native JavaScript `URLSearchParams` and the `HashChangeEvent` API, the application simulates a multi-page environment inside one `index.html` file (e.g., `index.html?id=123` opens a specific case study in a new tab, while `#admin` opens the settings panel).
3. **Pre-seeded JSON Data payload:**
   Instead of requiring a blank slate on first load, the application has an 11MB JSON data payload embedded directly into `index.html` via injection scripts. This ensures all users automatically see the pre-populated case studies without needing an initial import.
4. **Custom SVG Graphics & Animations:**
   Instead of relying on external image dependencies, the platform uses custom, scalable SVGs built directly into the HTML (e.g., the Gemini Notebook Hero Logo) paired with frosted glassmorphism UI elements and smooth-scrolling sticky navigation.

## ✨ Core Features

### 📝 For Content Creators & Engineers
* **Expert Prompt Templates:** Ready-to-use prompt samples tailored for Tableau Tech Support Engineers (Log analysis, RCA documentation, etc.), complete with a 1-click "Copy to Clipboard" button.
* **Rich Feature Documentation:** Add detailed use cases including Titles, Details, Usecases, and Reference links.
* **Media Uploader & Cropper:** Upload screenshots directly in the browser and crop/edit them seamlessly using the integrated image cropper within the Admin Panel.
* **Slack Canvas Generator:** Instantly generate a clean, text-formatted summary of the entire portal to copy directly into Slack or download as a `.txt` file.

### 📖 For Readers & Stakeholders
* **World-Class UI/UX:** A highly polished "Sophisticated Enterprise" design language featuring sticky navigation, hover micro-animations, and responsive glass panels.
* **Split-Screen Reading Experience:** When viewing a feature, the left side holds crisp, scrolling text while the right side remains *sticky*, continuously displaying images as you read.
* **Global Dark Mode:** Persists seamlessly across all tabs and page refreshes.

### ⚙️ For Administrators
* **Password-Protected Dashboard:** Client-side gated access to manage content.
* **Full CRUD Operations:** Seamlessly Add, Edit, or Delete published features and Expert Prompt Samples.
* **Cross-Browser Data Portability:** Easily export the entire database (text + images) as a single `.json` file from the Admin panel, and import it on another computer or browser to sync environments.

## 🛠️ Tech Stack & Design System

* **Framework:** Vanilla JavaScript (ES6+). No React or Vue was used to ensure maximum portability and zero build steps.
* **Styling:** Tailwind CSS (via Play CDN). 
* **Typography:** `Inter` for primary sans-serif body text and `Fira Code` for prompt variables and code snippets.
* **Icons:** Custom inline SVGs mapped to Lucide-React standards for zero external dependencies.

## 🚀 How to Run Locally

Because there is no build process or backend, running this project is as simple as it gets:

1. Clone the repository:
   ```bash
   git clone https://git.soma.salesforce.com/anarsikar/Gemini_Notebook.git
   ```
2. Navigate to the folder and simply double-click `index.html`, or open it via your preferred browser.
   ```bash
   # On Mac
   open index.html
   
   # On Windows
   start index.html
   ```
3. That's it. The app is live.

## 📂 Project Structure
Despite being a single file application, the codebase includes deployment configs and injection scripts:
```text
├── index.html          # The entire application (HTML, CSS, JS) with embedded JSON
├── data.json           # Raw backup of the portal's data
├── wrangler.toml       # Cloudflare Workers configuration
├── README.md           # You are here
├── check_deploy.js     # Verification script for deployments
├── inject.js           # Scripts to automate embedding data.json into index.html
└── (Internal HTML Structure)
    ├── <header>        # Sticky Nav, Admin Link & Theme Toggle
    ├── <main>
    │   ├── Hero        # Branding and SVG Logo
    │   ├── Prompts     # Copiable Expert Prompt Samples
    │   ├── View All    # Grid View for Usecases
    │   ├── Feature     # Split-Screen Detail Reader
    │   └── Admin       # CRUD Panel (Usecases, Prompts, Image Cropper)
    ├── <dialog>        # Feedback & Slack Canvas Modals
    └── <script>        # State, IndexedDB, Router, Logic
```

## 📄 License
This project is intended for internal use. All rights reserved.
