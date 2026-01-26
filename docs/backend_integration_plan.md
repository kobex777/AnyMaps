# Backend Integration Plan

## Goal Description
Establish the backend infrastructure for AnyMaps, enabling the Dual-AI generation pipeline (Python/FastAPI) and persistent storage (Supabase). This plan bridges the React frontend with the AI orchestration logic and database.

## Proposed Changes

### Phase 1: Supabase Schema & Persistence
*   **Database Setup**:
    *   Enable Auth (Google/Email).
    *   Create tables:
        *   `profiles`: Sync with auth.users (id, email, full_name, avatar_url).
        *   `maps`: (id, user_id, title, created_at, updated_at, is_public).
        *   `map_versions`: (id, map_id, content [JSON], mermaid_syntax [TEXT], created_at).
*   **RLS Policies**:
    *   `maps`: Users can only View/Edit their own maps. Public maps are viewable by all.
    *   `map_versions`: Inherit permissions from parent map.

### Phase 2: Python Backend (AI Orchestration)
*   **Service Setup**:
    *   Initialize `backend/` directory with `FastAPI`.
    *   Dependencies: `fastapi`, `uvicorn`, `openai` (for OpenRouter), `python-dotenv`, `supabase`.
*   **API Endpoints**:
    *   `POST /generate/plan`: Accepts `{ user_prompt, image_base64? }`. Returns `Planner Spec`.
    *   `POST /generate/build`: Accepts `{ planner_spec }`. Returns `{ mermaid_syntax }`.
    *   `POST /generate/full`: Chains both steps (optional for simpler UX).
*   **AI Logic**:
    *   **Planner Agent**: System Prompt to output rigid JSON specs.
    *   **Builder Agent**: System Prompt to output strict Mermaid syntax.
    *   **Vision Handler**: Processing image inputs via OpenRouter Vision models.

### Phase 3: Frontend-Backend Connection
*   **API Client**:
    *   Create `src/lib/api.ts` to call the Python backend.
    *   Create `src/lib/supabase.ts` for DB interactions.
*   **Integration Points**:
    *   `PromptInput` calls `POST /generate/plan`.
    *   `ChatPanel` displays progress.
    *   `DiagramCanvas` renders the result and saves to Supabase `map_versions`.

## Verification Plan
### Manual Verification
*   **Database**: Create a user in Supabase, ensure `profiles` entry is created. Create a map, ensure RLS blocks other users.
*   **AI API**: Curl the `/generate/plan` endpoint with a test prompt. Verify JSON output.
*   **End-to-End**: Type a prompt in the frontend -> See "Planning..." -> "Building..." -> Diagram appears -> Reload page -> Diagram persists.
