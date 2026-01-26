# Frontend Integration Plan Review

**Date:** 2026-01-24
**Status:** ✅ **APPROVED with Minor Additions**

## Summary
The "Frontend Integration Plan" is comprehensive and accurately maps the existing static HTML components to a React structure. It correctly identifies the core libraries (Zustand, React Flow, Supabase) and component boundaries.

However, specifically for the "Builder Agent" that will execute this, a few technical specifics need to be clarified to avoiding "painting ourselves into a corner," particularly regarding the **ELK.js layout engine** and **Custom Nodes**.

## Identified Gaps & Recommendations

### 1. 🔴 Critical: Custom Node Sizing for Layout
**Issue:** The plan mentions "Custom React Flow node components" and separately "ELK.js" (in previous architecture).
- **The Trap:** ELK.js needs to know the **exact width and height** of every node *before* it calculates positions. Since your nodes have variable text ("Medici Family" vs "Renaissance"), we cannot use fixed sizes.
- **Recommendation:** Add a specific step to implementing a `useLayout` hook that:
    1.  Temporarily renders nodes to measure them (or approximates based on character count).
    2.  Passes dimensions to ELK.
    3.  Applies the layout.

### 2. 🟡 High: Taildwind & Assets
**Issue:** The plan says "Migrate tailwind.config".
- **Detail:** accurately porting the `<script>` config to `tailwind.config.js` is crucial.
- **Assets:** The mockups use `lh3.googleusercontent.com` images.
- **Recommendation:**
    - Create an `assets/` folder.
    - Download the specific placeholder images used in `index.html` (Medici, etc.) or replace them with local placeholders to ensure the app works offline/if links die.
    - Ensure `Material Symbols` and `Playfair Display/Inter` fonts are imported in `index.css`.

### 3. ⚪ Medium: Protected Routes
**Issue:** Auth is mentioned, but Routing plan is simple.
- **Recommendation:**
    - Wrap `/dashboard` routes in a `<ProtectedRoute>` component that checks the Supabase session.

### 4. ⚪ Medium: Supabase Initialization
**Issue:** "Install @supabase/supabase-js".
- **Recommendation:**
    - Explicitly list creating a `.env` file for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
    - Create `src/lib/supabase.ts` for the client instance.

## Revised Phase 1 Instruction (For Builder Agent)
When running the "Initialize Vite" step, the Builder Agent should specifically:
1.  Run `npm install -D tailwindcss postcss autoprefixer` (standard npm setup, not script tag).
2.  Run `npx tailwindcss init -p`.
3.  **Manually copy** the `colors`, `fontFamily`, and `backgroundImage` (paper grain) from the `index.html` script tag into `tailwind.config.js`.

## Conclusion
The plan is safe to execute. I recommend starting with **Phase 1 (Scaffolding)**, but explicitly instructing the Builder to set up the `tailwind.config.js` immediately after initialization.
