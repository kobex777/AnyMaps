# Planner Agent Prompt: Fix Frontend Migration Plan

You are the **Planner Agent**. Your goal is to **revise and correct** your "Frontend Integration Plan" based on the technical review below.

## Context
Your initial plan correctly mapped the static HTML to React components. However, you missed critical implementation details regarding **ELK.js layout calculations**, **Tailwind configuration migration**, and **Asset reliability**. If these are not fixed, the Builder Agent will fail to produce a working application.

## Required Fixes (Update your Plan)

### 1. Fix Layout Logic (Node Sizing for ELK.js)
**The Problem:** You cannot run `elk.layout()` on nodes with unknown dimensions. In React Flow, custom nodes (like your "Italian Design" cards) have variable heights based on their text content.
**The Fix:**
- Add a **"Pre-Layout Measurement"** step to Phase 4 (React Flow Integration).
- **Technical Instruction:**
  1.  Tell the Builder to implement a `useLayout` hook.
  2.  This hook must first render nodes with `opacity: 0` to let the DOM settle and measure their `offsetWidth`/`offsetHeight`.
  3.  Only *then* pass these dimensions to the ELK.js algorithm.
  4.  Finally, apply the positions and set `opacity: 1`.

### 2. Fix Tailwind Migration Strategy
**The Problem:** The mockups use a CDN `<script>` tag with a custom `tailwind.config` object. You cannot just "copy-paste" this into a standard Vite/PostCSS setup.
**The Fix:**
- Update Phase 1 (Project Scaffolding) with specific instructions:
  - **Do NOT** use the CDN script in the React app.
  - **Action:** Extract the `colors`, `fontFamily`, and `backgroundImage` (paper grain) from the HTML script tag.
  - **Action:** Paste them into the `theme.extend` section of the `tailwind.config.js` file created by `npx tailwindcss init`.

### 3. Fix Asset Reliability
**The Problem:** The HTML relies on external `lh3.googleusercontent.com` URLs for the specific "Medici" and "Renaissance" styling images. If these links expire, the app breaks.
**The Fix:**
- Add a **"Assets & Resources"** step to Phase 2 (Component Extraction).
- **Action:** Create a `src/assets/` directory.
- **Action:** Download the images from the HTML (lines 90, 112, 222, 229, 237, 244, 282) and save them locally (e.g., `medici-hero.jpg`).
- **Action:** Update the component code to import these local assets instead of using the raw URLs.

### 4. Fix Routing Security
**The Problem:** The Dashboard route is unprotected.
**The Fix:**
- Update Phase 5 (Routing).
- **Action:** Instruct the Builder to create a `ProtectedRoute` wrapper component that checks `supabase.auth.getSession()`.
- **Action:** Wrap the `/dashboard` route with this component to redirect unauthenticated users to `/`.

## Output
Please strictly update your "Frontend Integration Plan" to reflect these technical requirements. Do not remove the existing component mappings; simply enhance the implementation steps.
