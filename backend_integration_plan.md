# Backend Integration Plan (Revised)

## Goal Description
Establish the backend infrastructure for AnyMaps, enabling the Dual-AI generation pipeline (Python/FastAPI) and persistent storage (Supabase). This plan incorporates 4 critical technical fixes identified in the Builder Audit.

## User Review Required
> [!IMPORTANT]
> **Profile Sync**: We will use a Postgres Trigger to auto-create profiles from `auth.users`.
> **CORS**: Middleware added to allow Frontend (port 5173) to talk to Backend (port 8000).
> **API Client**: Explicit TypeScript definitions for the Planner/Builder endpoints.

## Proposed Changes

### Phase 1: Supabase Schema & Persistence
*   **Database Setup**:
    *   Enable Auth (Google/Email).
    *   Create tables:
        *   `profiles`: (id, email, full_name, avatar_url).
        *   `maps`: (id, user_id, title, created_at, updated_at, is_public).
        *   `map_versions`: (id, map_id, content [JSON], mermaid_syntax [TEXT], created_at).
*   **Fix #1: Profile Trigger**:
    *   Create logic to sync `auth.users` to `public.profiles`.
    *   **Action**: Add `supabase/migrations/002_profile_trigger.sql` with `handle_new_user()` function and trigger.
*   **RLS Policies**:
    *   `maps`: Users can only View/Edit their own maps. Public maps are viewable by all.

### Phase 2: Python Backend (AI Orchestration)
*   **Service Setup**:
    *   Initialize `backend/` directory with `FastAPI`.
    *   Dependencies: `fastapi`, `uvicorn`, `openai`, `python-dotenv`, `supabase`.
    *   **Fix #4: Environment Variables**: Create `backend/.env.example` with (OPENROUTER_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY).
*   **Fix #2: CORS Middleware**:
    *   Update `backend/main.py`.
    *   **Action**: Add `CORSMiddleware` allowing origins `http://localhost:5173`.
*   **API Endpoints**:
    *   `POST /generate/plan`: Accepts `{ user_prompt, image_base64? }`. Returns `Planner Spec`.
    *   `POST /generate/build`: Accepts `{ planner_spec }`. Returns `{ mermaid_syntax }`.
    *   `POST /generate/full`: Chains both steps.

### Phase 3: Frontend-Backend Connection
*   **Fix #3: API Client**:
    *   Create `src/lib/api.ts`.
    *   **Interfaces**: `PlannerSpec` (nodes/edges).
    *   **Functions**: `generatePlan`, `generateBuild`, `generateFull`.
    *   **Config**: Load `VITE_BACKEND_URL` from env (default localhost:8000).
*   **Integration Points**:
    *   `PromptInput` calls `generatePlan`.
    *   `DiagramCanvas` renders the result.

## Verification Plan
### Manual Verification
*   **Auth**: Sign up with a new user -> Check `profiles` table for auto-created row.
*   **CORS**: Run both servers. Frontend fetch should NOT return Access-Control-Allow-Origin error.
*   **API**: `POST /generate/plan` returns valid JSON spec.
*   **Persistence**: Diagram saves to `map_versions` and loads correctly.
