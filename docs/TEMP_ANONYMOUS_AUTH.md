# Temporary Anonymous Auth - REMOVE BEFORE PRODUCTION

> ⚠️ **This document tracks temporary anonymous authentication code that MUST be removed before production deployment.**

## Purpose

Anonymous sessions are used for **testing persistence** without requiring login UI. This is a temporary measure.

---

## Changes to Remove

### 1. `frontend/src/lib/supabase.ts`

**Added**: `initAnonymousSession()` function

```typescript
// ❌ REMOVE THIS FUNCTION
export async function initAnonymousSession() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) console.error('Anonymous sign-in failed:', error);
    }
}
```

---

### 2. `frontend/src/App.tsx`

**Added**: `useEffect` that calls `initAnonymousSession()`

```typescript
// ❌ REMOVE THIS useEffect
useEffect(() => {
    initAnonymousSession();
}, []);
```

---

## When to Remove

Remove these changes when implementing proper authentication:
- [ ] Login/Signup UI is complete
- [ ] Protected routes are working
- [ ] Users can register and log in

## Replacement

Replace anonymous session with proper auth flow:
```typescript
// ✅ REPLACE WITH
if (!session) {
    navigate('/login');
}
```

---

## Database Cleanup

After removing anonymous auth, you may want to clean up anonymous user data:
```sql
-- Delete anonymous users older than 30 days
DELETE FROM auth.users 
WHERE is_anonymous = true 
AND created_at < NOW() - INTERVAL '30 days';
```
