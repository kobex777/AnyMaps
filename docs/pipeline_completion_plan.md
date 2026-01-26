# Pipeline Completion Plan (Gap Analysis Fixes)

## Goal Description
Implement the missing components of the "Builder AI" rendering pipeline as identified in the Gap Analysis. This will bring the implementation to full parity with `docs/pipeline_architecture.md`.

## User Review Required
> [!IMPORTANT]
> **Strict Pipeline**: We are moving from a "Simple" layout to a robust **Mermaid -> Parser -> ELK -> React Flow** pipeline.
> **Dependency**: This requires installing `mermaid-parser` and `elkjs` web-worker files.

## Proposed Changes

### Phase 1: Dependencies & Setup
*   **Install**:
    *   `npm install mermaid-parser elkjs web-worker`
*   **Config**: Ensure `elkjs` worker is correctly served by Vite (may need `vite-plugin-comlink` or static asset copy).

### Phase 2: Core Logic Services
*   **Mermaid Parser Service** (`src/lib/mermaid.ts`):
    *   **Function**: `parseMermaid(syntax: string): Promise<GraphTopology>`
    *   **Logic**: Use `mermaid-parser` to extract nodes/edges from the raw AI string.
*   **ELK Layout Service** (`src/lib/layout.ts`):
    *   **Function**: `calculateLayout(topology: GraphTopology): Promise<LayoutData>`
    *   **Logic**:
        *   Construct `ELK` graph.
        *   Pass `mrtree` algorithm options (hierarchical layout).
        *   **Crucial**: Use "Pre-Layout Measurement" (opacity 0) if custom node sizes are unknown, or passed from Parser.

### Phase 3: State & UX Integration
*   **Store Update** (`src/store/useAppStore.ts`):
    *   Update `status` type: add `'structuring'`.
*   **Progressive Loading** (`src/components/ProgressiveLoader.tsx`):
    *   Add "Structuring..." step between "Building..." and "Ready".
*   **Orchestration Logic** (`src/hooks/useBuilder.ts`):
    *   Chain: `API.build()` -> `MermaidParser` -> `ELK` -> `setNodes`.

### Phase 4: Persistence Layer
*   **Supabase Client** (`src/lib/maps.ts`):
    *   `saveMap(mapId, content)`: Writes to `map_versions`.
    *   `loadMap(mapId)`: Fetches latest version.
*   **UI Integration**:
    *   Connect "Save" button in `Navbar` / `Dashboard`.

## Verification Plan
### Automated Tests
*   **Parser**: Unit test `parseMermaid` with simple "A -> B" string.
*   **Layout**: Unit test `calculateLayout` ensuring x/y coordinates are returned.

### Manual Verification
1.  **Full Flow**: Enter prompt -> Watch 4-step loader -> Verify Diagram.
2.  **Layout Quality**: Create complex hierarchy. Verify ELK distributes it cleanly (no overlap).
3.  **Save/Load**: Refresh page after saving. Map should restore exactly.
