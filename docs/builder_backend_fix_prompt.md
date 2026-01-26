# Builder Agent Prompt: Backend Integration Fixes

You are the **Builder Agent**. Your goal is to **update the backend integration plan** and implement the following fixes. Each fix includes the exact code to add.

---

## Fix 1: Add Profile Trigger (Supabase)

**Location:** Phase 1 → Database Setup
**Problem:** When a user signs up, their `profiles` row won't be created automatically.
**Action:** Add this SQL migration after creating the tables:

```sql
-- File: supabase/migrations/002_profile_trigger.sql

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## Fix 2: Add CORS Middleware (FastAPI)

**Location:** Phase 2 → Service Setup
**Problem:** The React frontend (`localhost:5173`) cannot call the Python backend due to CORS.
**Action:** Add this to `backend/main.py` after creating the `app`:

```python
# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative dev server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Fix 3: Create `api.ts` (Frontend)

**Location:** Phase 3 → API Client
**Problem:** The file `src/lib/api.ts` does not exist. The frontend cannot call the backend.
**Action:** Create `frontend/src/lib/api.ts`:

```typescript
// frontend/src/lib/api.ts

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

interface PlannerSpec {
  // Define based on your Planner AI output structure
  nodes: Array<{ id: string; label: string }>;
  edges: Array<{ source: string; target: string }>;
}

export async function generatePlan(prompt: string, imageBase64?: string): Promise<PlannerSpec> {
  const res = await fetch(`${API_URL}/generate/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_prompt: prompt, image_base64: imageBase64 }),
  });
  if (!res.ok) throw new Error('Failed to generate plan');
  return res.json();
}

export async function generateBuild(plannerSpec: PlannerSpec): Promise<{ mermaid_syntax: string }> {
  const res = await fetch(`${API_URL}/generate/build`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planner_spec: plannerSpec }),
  });
  if (!res.ok) throw new Error('Failed to generate build');
  return res.json();
}

export async function generateFull(prompt: string, imageBase64?: string): Promise<{ mermaid_syntax: string }> {
  const res = await fetch(`${API_URL}/generate/full`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_prompt: prompt, image_base64: imageBase64 }),
  });
  if (!res.ok) throw new Error('Failed to generate');
  return res.json();
}
```

---

## Fix 4: Add `.env.example` (Backend)

**Location:** Phase 2 → Service Setup
**Problem:** No template for required environment variables.
**Action:** Create `backend/.env.example`:

```
OPENROUTER_API_KEY=your_openrouter_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_key_here
```

---

## Summary Checklist
- [ ] Add profile trigger SQL to `supabase/migrations/`
- [ ] Add CORS middleware to `backend/main.py`
- [ ] Create `frontend/src/lib/api.ts`
- [ ] Create `backend/.env.example`
