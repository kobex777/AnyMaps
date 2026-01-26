# Builder Agent Prompt: Architecture Update Instructions

You are the **Builder Agent**. Your goal is to update the existing `pipeline_architecture.md` to Version 2.0 based on the selected design decisions.

## Core Context
We have reviewed the initial architecture and decided on specific technologies to close the gaps in Persistence, Input Handling, Layout, and State Management.

**Goal:** Modify the architecture document to reflect these specific decisions. Ensure the new components connect logically to the existing pipeline without creating new "black boxes".

## Required Changes

### 1. Persistence Layer (Supabase)
**Current Status:** Missing.
**Instruction:**
- Add a new **"Phase 2.5: Persistence & User Session"** (or integrate into Backend Phase).
- **Technology:** **Supabase** (PostgreSQL).
- **Schema Requirements:** Define a schema that links `Users` -> `Maps` -> `Versions`.
  - Store the `GraphTopology` (parsed JSON) or `LayoutData` (final positions) so maps can be reloaded.
- **API:** Define `GET /maps/{id}` and `PUT /maps/{id}` endpoints.

### 2. AI Layer Update (OpenRouter + Vision)
**Current Status:** "Planner Agent" is generic; Image input is vague.
**Instruction:**
- Update **Step 1: AI Layer**.
- **Technology:** Explicitly state **OpenRouter** as the gateway.
- **Model Selection:** Specify that for Image Inputs, we MUST use Vision-capable models (e.g., **GPT-4o**, **Gemini 1.5 Pro**) via OpenRouter.
- **Data Flow:** Explain that images are passed (likely as Base64 or URL) to the Planner Agent to generate the initial specs.

### 3. Layout Engine (Elk.js)
**Current Status:** "elkjs OR dagre".
**Instruction:**
- **Decision:** **Strictly use `elkjs`**.
- **Reason:** We need advanced "Mental Map" handling (nested clusters, complex hierarchies) which Dagre lacks.
- **Implementation:** Update the "Layout Engine" section to reference `elkjs` specifically (suggesting `mrtree` or `layered` algorithms).

### 4. Frontend State Management (Zustand)
**Current Status:** Local React State (`useState`).
**Instruction:**
- **Decision:** **Zustand**.
- **Reason:** To manage the complex interplay between the Chat UI (Sidebar) and the Diagram (Canvas).
- **Implementation:** Define a global store structure, e.g., `useStore = { nodes, edges, chatHistory, isGenerating, setNodes... }`.

### 5. Deployment / UX (Loading State)
**Current Status:** "Stream & Render".
**Instruction:**
- **Decision:** **Discard complex token-by-token streaming** for the diagram.
- **Implementation:** Adopt a **"Progressive Loading"** UX:
  1.  Show "Planning..." (Planner AI working).
  2.  Show "Building..." (Builder AI generating Mermaid).
  3.  Show "Structuring..." (Elk.js calculating layout).
  4.  Fade in final Diagram.

## Output Format
Please generate the **revised `pipeline_architecture.md`** file incorporating these changes. Keep the existing Mermaid diagrams but update the text and technical specs to match the decisions above.
