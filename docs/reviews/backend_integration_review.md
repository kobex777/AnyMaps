# Backend Integration Plan Review

**Date:** 2026-01-24
**Status:** ✅ **APPROVED with Clarifications**

## Current Project State

| Artifact | Status | Notes |
|----------|--------|-------|
| `frontend/src/lib/supabase.ts` | ✅ Exists | Placeholder client if no env vars |
| `frontend/src/lib/api.ts` | ❌ Missing | Required by Phase 3 |
| `frontend/src/store/useAppStore.ts` | ✅ Exists | Has `status`, `chatHistory`, actions |
| `backend/` directory | ❌ Missing | Not yet created |
| Supabase tables (`maps`, `profiles`) | ❓ Unknown | Need to verify in Supabase dashboard |

## Plan vs Reality Analysis

### Phase 1: Supabase Schema ✅ Ready to Execute
The plan correctly defines:
- `profiles`, `maps`, `map_versions` tables.
- RLS policies.

**Gap:** No mention of creating a **database trigger** to auto-populate `profiles` on new user signup in `auth.users`.
**Recommendation:** Add to Phase 1:
```sql
-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Phase 2: Python Backend ✅ Aligned
The plan correctly defines:
- FastAPI with `/generate/plan`, `/generate/build`, `/generate/full`.
- OpenRouter integration.
- Vision handler.

**Gap:** No mention of **CORS configuration**.
**Recommendation:** Add to Phase 2 Service Setup:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Gap:** No `.env.example` template.
**Recommendation:** Add a template for required env vars:
```
OPENROUTER_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

### Phase 3: Frontend-Backend Connection ⚠️ Needs Update
**Current State:**
- `supabase.ts` exists but uses placeholder if env vars missing.
- `api.ts` does **NOT** exist.

**Plan says:** "Create `src/lib/api.ts`".
**Recommendation:** Provide explicit implementation:
```typescript
// src/lib/api.ts
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function generatePlan(prompt: string, imageBase64?: string) {
  const res = await fetch(`${API_URL}/generate/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_prompt: prompt, image_base64: imageBase64 }),
  });
  return res.json();
}

export async function generateBuild(plannerSpec: object) {
  const res = await fetch(`${API_URL}/generate/build`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planner_spec: plannerSpec }),
  });
  return res.json();
}
```

**Integration Point:** `ChatPanel.tsx` currently has `onSendMessage` prop but no actual API call.
**Recommendation:** Wire it to `api.ts` in the `DashboardPage`.

## Conclusion
The plan is **logically correct** and will guide the Builder to implement the backend. Add the clarifications above to prevent runtime errors (CORS, triggers, api.ts implementation).
