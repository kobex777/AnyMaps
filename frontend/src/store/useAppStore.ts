import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';
import type { Message } from '@/components/MessageBubble';
import { generateFull, enhanceMap as enhanceMapApi, type PlannerSpec, type EnhanceMode } from '@/lib/api';
import { layoutFromPlannerSpec } from '@/lib/layout';
import { saveMap, loadMap, type MapContent } from '@/lib/maps';

export type AppStatus = 'idle' | 'planning' | 'building' | 'structuring' | 'enhancing' | 'ready' | 'error';

interface AppStore {
    // Canvas State
    nodes: Node[];
    edges: Edge[];

    // Chat State
    chatHistory: Message[];

    // App State
    status: AppStatus;
    currentMapId: string | null;
    currentMapTitle: string;
    currentPlannerSpec: PlannerSpec | null;
    currentMermaidSyntax: string | null;
    isSaving: boolean;
    lastSavedAt: string | null;
    chatInputValue: string;

    // Actions
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateEdge: (id: string, data: any) => void;
    addMessage: (message: Message) => void;
    setStatus: (status: AppStatus) => void;
    setCurrentMap: (id: string | null, title?: string) => void;
    generateMap: (userPrompt: string, imageBase64?: string) => Promise<void>;
    enhanceMap: (prompt: string, mode?: EnhanceMode) => Promise<void>;
    saveCurrentMap: (silent?: boolean) => Promise<boolean>;
    loadMapById: (mapId: string) => Promise<boolean>;
    reset: () => void;
    setChatInputValue: (value: string) => void;
}

const initialState = {
    nodes: [],
    edges: [],
    chatHistory: [
        {
            id: '1',
            role: 'assistant' as const,
            content: 'Welcome to the Atelier. I am ready to draft your next mental landscape. Shall we explore the complexities of <strong class="text-white">Renaissance Architecture</strong> or perhaps chart a new territory?',
        },
    ],
    status: 'idle' as AppStatus,
    currentMapId: null,
    currentMapTitle: 'Untitled Map',
    currentPlannerSpec: null,
    currentMermaidSyntax: null,
    isSaving: false,
    lastSavedAt: null,
    chatInputValue: '',
};

export const useAppStore = create<AppStore>((set, get) => ({
    ...initialState,

    setChatInputValue: (value) => set({ chatInputValue: value }),

    setNodes: (nodes) => set({ nodes }),

    setEdges: (edges) => set({ edges }),

    updateEdge: (id, data) => {
        const state = get();
        const newEdges = state.edges.map((edge) => {
            if (edge.id === id) {
                return { ...edge, data: { ...edge.data, ...data } };
            }
            return edge;
        });
        set({ edges: newEdges });
        // Trigger silent save
        get().saveCurrentMap(true);
    },

    addMessage: (message) =>
        set((state) => ({
            chatHistory: [...state.chatHistory, message],
        })),

    setStatus: (status) => set({ status }),

    setCurrentMap: (id, title) =>
        set({
            currentMapId: id,
            currentMapTitle: title || 'Untitled Map',
        }),

    generateMap: async (userPrompt: string, imageBase64?: string) => {
        try {
            // Add user message
            get().addMessage({
                id: Date.now().toString(),
                role: 'user',
                content: userPrompt,
            });

            // ==========================================
            // STEP 1: PLANNING
            // ==========================================
            set({ status: 'planning' });


            // Call the full generation pipeline (Planner + Builder)
            const response = await generateFull(userPrompt, imageBase64);

            if (!response.success || !response.planner_spec) {
                throw new Error(response.error || 'Generation failed');
            }

            // ==========================================
            // STEP 2: BUILDING
            // ==========================================
            set({
                status: 'building',
                currentPlannerSpec: response.planner_spec,
                currentMermaidSyntax: response.mermaid_syntax || null,
                currentMapTitle: response.planner_spec.title,
            });


            // ==========================================
            // STEP 3: STRUCTURING (ELK Layout)
            // ==========================================
            set({ status: 'structuring' });


            // Use ELK.js to calculate positions
            const { nodes, edges } = await layoutFromPlannerSpec(response.planner_spec);

            // ==========================================
            // STEP 4: READY
            // ==========================================
            set({
                nodes,
                edges,
                status: 'ready',
            });

            // Auto-save the new map to Supabase (silent)
            await get().saveCurrentMap(true);

            // Final success message


        } catch (error) {
            console.error('Map generation error:', error);
            set({ status: 'error' });
            get().addMessage({
                id: (Date.now() + 5).toString(),
                role: 'assistant',
                content: `<strong class="text-red-500">Error:</strong> ${error instanceof Error ? error.message : 'Failed to generate map'}. Please try again.`,
            });
        }
    },

    enhanceMap: async (prompt: string, mode: EnhanceMode = 'expand') => {
        const state = get();
        const currentSpec = state.currentPlannerSpec;

        // If no existing map, generate a new one instead
        if (!currentSpec) {
            console.log('No existing map, generating new map instead');
            return get().generateMap(prompt);
        }

        try {
            // Add user message
            get().addMessage({
                id: Date.now().toString(),
                role: 'user',
                content: prompt,
            });

            // Set enhancing status
            set({ status: 'enhancing' });
            // Call the enhance API
            const response = await enhanceMapApi(currentSpec, prompt, mode);

            if (!response.success || !response.planner_spec) {
                throw new Error(response.error || 'Enhancement failed');
            }

            // Restructure with ELK
            set({ status: 'structuring' });


            const { nodes, edges } = await layoutFromPlannerSpec(response.planner_spec);

            // Update state
            set({
                nodes,
                edges,
                currentPlannerSpec: response.planner_spec,
                currentMapTitle: response.planner_spec.title,
                status: 'ready',
            });

            // Auto-save the enhanced map to Supabase (silent)
            await get().saveCurrentMap(true);

            // Success message with changes summary
            get().addMessage({
                id: (Date.now() + 3).toString(),
                role: 'assistant',
                content: `<strong class="text-gold">Enhanced & Saved!</strong> ${response.changes_summary || 'Map updated successfully.'}`,
                suggestions: ['Add more details', 'Refine labels'],
            });

        } catch (error) {
            console.error('Map enhancement error:', error);
            set({ status: 'error' });
            get().addMessage({
                id: (Date.now() + 4).toString(),
                role: 'assistant',
                content: `<strong class="text-red-500">Error:</strong> ${error instanceof Error ? error.message : 'Failed to enhance map'}. Please try again.`,
            });
        }
    },

    saveCurrentMap: async (silent: boolean = false) => {
        const state = get();

        if (state.nodes.length === 0) {
            console.warn('No map content to save');
            return false;
        }

        set({ isSaving: true });

        try {
            const content: MapContent = {
                nodes: state.nodes,
                edges: state.edges,
                plannerSpec: state.currentPlannerSpec || undefined,
                chatHistory: state.chatHistory,
            };

            const result = await saveMap(
                state.currentMapTitle,
                content,
                state.currentMermaidSyntax,
                state.currentMapId
            );

            if (result) {
                const savedAt = new Date().toISOString();
                set({
                    currentMapId: result.map.id,
                    isSaving: false,
                    lastSavedAt: savedAt,
                });

                if (!silent) {
                    // Add confirmation message
                    get().addMessage({
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: `<strong class="text-gold">Saved!</strong> Your map "<strong class="text-white">${state.currentMapTitle}</strong>" has been saved successfully.`,
                    });
                }

                return true;
            } else {
                throw new Error('Failed to save map');
            }
        } catch (error) {
            console.error('Save error:', error);
            set({ isSaving: false });
            get().addMessage({
                id: Date.now().toString(),
                role: 'assistant',
                content: `<strong class="text-red-500">Error:</strong> Could not save your map. Please try again.`,
            });
            return false;
        }
    },

    loadMapById: async (mapId: string) => {
        try {
            const mapData = await loadMap(mapId);

            if (!mapData || !mapData.latestVersion) {
                throw new Error('Map not found or has no content');
            }

            const content = mapData.latestVersion.content;

            set({
                currentMapId: mapData.id,
                currentMapTitle: mapData.title,
                nodes: content.nodes || [],
                edges: content.edges || [],
                currentPlannerSpec: content.plannerSpec || null,
                currentMermaidSyntax: mapData.latestVersion.mermaid_syntax || null,
                status: 'ready',
                lastSavedAt: mapData.latestVersion.created_at,
                chatHistory: content.chatHistory || initialState.chatHistory,
            });



            return true;
        } catch (error) {
            console.error('Load error:', error);
            console.error('Load error:', error);
            return false;
        }
    },

    reset: () => set(initialState),
}));

