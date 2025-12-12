# GEMINI.md

## Project Overview

This is a modern, responsive portfolio website for Fares Bermak, a Remote Virtual Assistant & Data Entry Expert. The site showcases his services, skills, and provides a contact form.

**Key Technologies:**

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Deployment:** Vercel
*   **Email:** Nodemailer
*   **Analytics:** Vercel Analytics

**Architecture:**

*   The project uses the Next.js App Router.
*   The UI is built with React components, with a focus on lazy loading for performance.
*   Static content (text, SEO data, etc.) is centralized in `src/config/site.config.ts` for easy maintenance.
*   The site includes a contact form that sends emails via an API route using Nodemailer.
*   It has a strong focus on security, with custom headers and a Content Security Policy.

## Building and Running

**Prerequisites:**

*   Node.js 18+
*   npm

**Commands:**

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

*   **Build for production:**
    ```bash
    npm run build
    ```

*   **Start the production server:**
    ```bash
    npm run start
    ```

*   **Lint the code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. Utility classes are preferred over custom CSS.
*   **Components:** Components are organized into `sections` (for page-level components) and `ui` (for general-purpose UI elements).
*   **Static Content:** All static content should be added to `src/config/site.config.ts` to keep it separate from the UI code.
*   **API:** API routes are located in `src/app/api`.
*   **Sitemap:** The sitemap is generated automatically at build time using the `scripts/generate-sitemap.js` script.
