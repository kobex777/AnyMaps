# Frontend Integration Plan: HTML Mockups → React Application

This document outlines the migration of static HTML/Tailwind mockups into a fully functional React application. It incorporates 4 critical technical fixes to ensure a successful build.

---

## Phase 1: Project Scaffolding & Tailwind Migration

### 1.1 Initialize Project
- `npx create-vite@latest . --template react-ts`
- Move `index.html` and `dashboard.html` to a `mockups/` directory for reference.

### 1.2 Install Dependencies
```bash
npm install react-router-dom zustand @xyflow/react @supabase/supabase-js elkjs clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 1.3 Tailwind Configuration (Fix #2)
> [!IMPORTANT]
> **Do NOT use the CDN `<script>` tag from the mockups.**

**Action**: Extract the following from `mockups/index.html` lines 15-36:

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#003366",
        "background-light": "#f9f7f2",
        "background-dark": "#0f1923",
        "espresso": "#2D241E",
        "espresso-light": "#3E3228",
        "gold": "#C5A059",
        "parchment": "#DBCBB6",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "serif": ["Playfair Display", "serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
```

**Action**: Add custom CSS classes to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.paper-grain {
  background-color: #f9f7f2;
  /* Replace with local asset path */
  background-image: url('/assets/images/paper-grain.png');
}

.drafting-grid {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, #e5e0d8 1px, transparent 1px),
    linear-gradient(to bottom, #e5e0d8 1px, transparent 1px);
}

.scrollbar-dark::-webkit-scrollbar { width: 6px; }
.scrollbar-dark::-webkit-scrollbar-track { background: #2D241E; }
.scrollbar-dark::-webkit-scrollbar-thumb { background: #4A3B32; border-radius: 3px; }
```

---

## Phase 2: Component Extraction & Asset Management

### 2.1 Asset Reliability (Fix #3)
> [!WARNING]
> External `lh3.googleusercontent.com` URLs may expire.

**Action**: Create `src/assets/images/` directory.

**Action**: Download and save the following images locally:

| Source Line | New Filename | Description |
|-------------|--------------|-------------|
| index.html:41 | `paper-grain.png` | Background texture |
| index.html:90 | `medici-card.jpg` | Hero card image |
| index.html:112 | `political-power.jpg` | Node thumbnail |
| index.html:222 | `silk-road.jpg` | Archive gallery |
| index.html:229 | `cognitive-bias.jpg` | Archive gallery |
| index.html:237 | `quantum-theory.jpg` | Archive gallery |
| dashboard.html:244 | `medici-hero.jpg` | Central node image |
| dashboard.html:282 | `council-meeting.jpg` | Node thumbnail |

**Action**: Update all component imports to use local paths:
```tsx
import mediciHero from '@/assets/images/medici-hero.jpg';
```

### 2.2 Component Mapping

**Landing Page (`src/pages/LandingPage.tsx`):**
| Component | Source | Notes |
|-----------|--------|-------|
| `<Navbar />` | index.html:56-75 | Shared with Dashboard |
| `<HeroSection />` | index.html:77-157 | Landing only |
| `<PromptInput />` | index.html:163-181 | Reused in Dashboard |
| `<CategoryChips />` | index.html:182-203 | Filter presets |
| `<ArchivesGallery />` | index.html:206-244 | Showcase maps |
| `<Footer />` | index.html:247-270 | Site-wide |

**Dashboard (`src/pages/DashboardPage.tsx`):**
| Component | Source | Notes |
|-----------|--------|-------|
| `<Sidebar />` | dashboard.html:65-122 | Navigation + User |
| `<ChatPanel />` | dashboard.html:124-204 | The "Atelier" |
| `<MessageBubble />` | dashboard.html:132-183 | AI/User messages |
| `<DiagramCanvas />` | dashboard.html:205-293 | **React Flow wrapper** |
| `<Legend />` | dashboard.html:308-327 | Overlay component |

---

## Phase 3: Routing & Security

### 3.1 Basic Routing
```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/:mapId" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3.2 Protected Route (Fix #4)
**Action**: Create `src/components/ProtectedRoute.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/" replace />;
  
  return <>{children}</>;
}
```

---

## Phase 4: State Management & ELK.js Layout

### 4.1 Zustand Store
```typescript
// src/store/useAppStore.ts
interface AppStore {
  nodes: Node[];
  edges: Edge[];
  chatHistory: Message[];
  status: 'idle' | 'planning' | 'building' | 'structuring' | 'ready';
  currentMapId: string | null;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setStatus: (status: AppStore['status']) => void;
}
```

### 4.2 Pre-Layout Measurement (Fix #1)
> [!IMPORTANT]
> ELK.js requires explicit node dimensions. Custom nodes have variable heights based on text content.

**Action**: Implement `src/hooks/useLayout.ts`:

```typescript
// Pseudocode for the Builder Agent
export function useLayout(initialNodes: Node[], initialEdges: Edge[]) {
  const [layoutedNodes, setLayoutedNodes] = useState<Node[]>([]);
  const [isLayouting, setIsLayouting] = useState(true);

  useEffect(() => {
    async function runLayout() {
      // STEP 1: Render nodes with opacity: 0
      // Set nodes with { style: { opacity: 0 } }
      
      // STEP 2: Wait for DOM to settle (requestAnimationFrame or small timeout)
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // STEP 3: Measure each node's actual dimensions
      const measuredNodes = initialNodes.map(node => {
        const element = document.querySelector(`[data-id="${node.id}"]`);
        return {
          ...node,
          width: element?.offsetWidth ?? 200,
          height: element?.offsetHeight ?? 100,
        };
      });
      
      // STEP 4: Build ELK graph with measured dimensions
      const elkGraph = {
        id: 'root',
        children: measuredNodes.map(n => ({
          id: n.id,
          width: n.width,
          height: n.height,
        })),
        edges: initialEdges.map(e => ({
          id: e.id,
          sources: [e.source],
          targets: [e.target],
        })),
      };
      
      // STEP 5: Run ELK layout
      const elk = new ELK();
      const layoutResult = await elk.layout(elkGraph, {
        layoutOptions: { 'elk.algorithm': 'mrtree' }
      });
      
      // STEP 6: Apply positions and set opacity: 1
      const finalNodes = measuredNodes.map(node => {
        const elkNode = layoutResult.children?.find(n => n.id === node.id);
        return {
          ...node,
          position: { x: elkNode?.x ?? 0, y: elkNode?.y ?? 0 },
          style: { opacity: 1 },
        };
      });
      
      setLayoutedNodes(finalNodes);
      setIsLayouting(false);
    }
    
    runLayout();
  }, [initialNodes, initialEdges]);

  return { layoutedNodes, isLayouting };
}
```

---

## Implementation Checklist

### Phase 1: Setup
- [x] Create Vite project
- [x] Install all dependencies
- [x] Configure `tailwind.config.js` with extracted theme
- [x] Add custom CSS classes to `index.css`

### Phase 2: Assets & Components
- [ ] Download all 8 images to `src/assets/images/` (using external URLs as placeholders)
- [x] Create `Navbar`, `Footer` components
- [x] Create `HeroSection`, `PromptInput` components
- [x] Create `Sidebar`, `ChatPanel` components

### Phase 3: Routing
- [x] Implement `App.tsx` with routes
- [x] Create `ProtectedRoute.tsx` with Supabase auth check

### Phase 4: State & Layout
- [x] Create Zustand `useAppStore`
- [x] Create `useLayout` hook with ELK.js pre-measurement
- [x] Build `DiagramCanvas` with React Flow
- [x] Implement Custom Node component ("Italian Design" card)

### Phase 5: Integration
- [ ] Connect `PromptInput` to backend API
- [x] Wire `ChatPanel` to Zustand state
- [ ] Implement Save/Load with Supabase

