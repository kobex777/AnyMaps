import { useCallback, useState, useEffect, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    type Node,
    type Edge,
    applyNodeChanges,
    applyEdgeChanges,
    BackgroundVariant,
    type NodeChange,
    type EdgeChange,
    type Connection,
    addEdge,
    reconnectEdge,
    ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


import { MindMapNode } from './MindMapNode';
import { CustomEdge } from './CustomEdge';
import { NodeContextMenu } from './NodeContextMenu';
import { CanvasContextMenu } from './CanvasContextMenu';
import { NodeDialog } from './NodeDialog';
import { ProgressiveLoader } from './ProgressiveLoader';
import { useAppStore } from '@/store/useAppStore';

// Define custom node types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes: any = {
    mindMapNode: MindMapNode,
};

const edgeTypes: any = {
    custom: CustomEdge,
};

// Sample initial nodes for demo
// Sample initial nodes for demo - NOW EMPTY
const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

interface DiagramCanvasProps {
    mapTitle?: string;
}

export function DiagramCanvas({ mapTitle = 'The Medici Era' }: DiagramCanvasProps) {
    const storeNodes = useAppStore((state) => state.nodes);
    const storeEdges = useAppStore((state) => state.edges);
    const setStoreNodes = useAppStore((state) => state.setNodes);
    const setStoreEdges = useAppStore((state) => state.setEdges);
    const lastSavedAt = useAppStore((state) => state.lastSavedAt);
    const saveCurrentMap = useAppStore((state) => state.saveCurrentMap);

    // Context Menu State

    const [menu, setMenu] = useState<{ id: string; top: number; left: number } | null>(null);
    const [canvasMenu, setCanvasMenu] = useState<{ top: number; left: number; flowPos: { x: number; y: number } } | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use store nodes/edges if available, otherwise use initial sample data
    // We don't use useNodesState/useEdgesState here because we want Zustand to be the single source of truth
    const nodes = storeNodes.length > 0 ? storeNodes : initialNodes;
    const edges = storeEdges.length > 0 ? storeEdges : initialEdges;

    // Callbacks to update store directly
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            // @ts-ignore - applyNodeChanges types are compatible but strict TS complains
            const nextNodes = applyNodeChanges(changes, nodes);
            setStoreNodes(nextNodes);
        },
        [nodes, setStoreNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            // @ts-ignore
            const nextEdges = applyEdgeChanges(changes, edges);
            setStoreEdges(nextEdges);
        },
        [edges, setStoreEdges]
    );

    const edgeReconnectSuccessful = useRef(false);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnect = useCallback(
        async (oldEdge: Edge, newConnection: Connection) => {
            edgeReconnectSuccessful.current = true;
            const nextEdges = reconnectEdge(oldEdge, newConnection, edges);
            setStoreEdges(nextEdges);
            await saveCurrentMap(true);
        },
        [edges, setStoreEdges, saveCurrentMap]
    );

    const onReconnectEnd = useCallback(
        async (_: MouseEvent | TouchEvent, edge: Edge) => {
            if (!edgeReconnectSuccessful.current) {
                setStoreEdges(edges.filter((e) => e.id !== edge.id));
                await saveCurrentMap(true);
            }
            edgeReconnectSuccessful.current = false;
        },
        [edges, setStoreEdges, saveCurrentMap]
    );

    const onConnect = useCallback(
        async (connection: Connection) => {
            const nextEdges = addEdge(connection, edges);
            setStoreEdges(nextEdges);
            // Persist changes immediately (silent save)
            await saveCurrentMap(true);
        },
        [edges, setStoreEdges, saveCurrentMap]
    );

    const [rfInstance, setRfInstance] = useState<any>(null); // ReactFlowInstance type is annoying to import sometimes
    const currentMapId = useAppStore((state) => state.currentMapId);

    const setChatInputValue = useAppStore((state) => state.setChatInputValue);

    // Context Menu Handlers
    const onNodeContextMenu = useCallback(
        (event: React.MouseEvent, node: Node) => {
            event.preventDefault();

            const pane = containerRef.current?.getBoundingClientRect();
            if (pane) {
                setMenu({
                    id: node.id,
                    top: event.clientY - pane.top,
                    left: event.clientX - pane.left,
                });
            }
        },
        []
    );

    const onPaneClick = useCallback(() => {
        setMenu(null);
        setCanvasMenu(null);
    }, []);

    const onPaneContextMenu = useCallback(
        (event: React.MouseEvent | MouseEvent) => {
            event.preventDefault();
            // Close other menus
            setMenu(null);

            const pane = containerRef.current?.getBoundingClientRect();
            if (pane && rfInstance) {
                // Calculate flow position for the new node
                const flowPos = rfInstance.screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                });

                setCanvasMenu({
                    top: event.clientY - pane.top,
                    left: event.clientX - pane.left,
                    flowPos,
                });
            }
        },
        [rfInstance]
    );

    // Let's rely on a separate pending state or just pass it through.
    // Since I can't rewrite the whole file, I will implement a ref for the pending position.
    const pendingNodePos = useRef<{ x: number, y: number } | null>(null);

    const onAddNodeClick = useCallback(() => {
        if (canvasMenu) {
            pendingNodePos.current = canvasMenu.flowPos;
            setCanvasMenu(null);
            setEditingNodeId(null); // Ensure create mode
            setIsDialogOpen(true);
        }
    }, [canvasMenu]);

    const onEditNode = useCallback(() => {
        if (menu) {
            setEditingNodeId(menu.id);
            setMenu(null);
            setIsDialogOpen(true);
        }
    }, [menu]);

    const onDialogSubmit = useCallback(async (title: string, description: string, isCentral: boolean) => {
        // Edit Mode
        if (editingNodeId) {
            const nextNodes = nodes.map((n) => {
                if (n.id === editingNodeId) {
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            label: title,
                            description: description,
                            isCentral: isCentral,
                        },
                    };
                }
                return n;
            });
            setStoreNodes(nextNodes);
            setEditingNodeId(null);
        }
        // Create Mode
        else if (pendingNodePos.current) {
            const newNode: Node = {
                id: crypto.randomUUID(),
                type: 'mindMapNode',
                position: pendingNodePos.current,
                data: {
                    label: title,
                    description: description,
                    isCentral: isCentral,
                },
            };
            setStoreNodes([...nodes, newNode]);
            pendingNodePos.current = null;
        }

        setIsDialogOpen(false);
        await saveCurrentMap(true);
    }, [nodes, setStoreNodes, saveCurrentMap, editingNodeId]);

    const onNodeDragStop = useCallback(async () => {
        await saveCurrentMap(true);
        // We don't need to manually update state here because onNodesChange handles the position updates during drag
    }, [saveCurrentMap]);

    const onDeleteNode = useCallback(async () => {
        if (!menu) return;

        // Remove node and connected edges
        const nextNodes = nodes.filter((n) => n.id !== menu.id);
        const nextEdges = edges.filter(
            (e) => e.source !== menu.id && e.target !== menu.id
        );

        setStoreNodes(nextNodes);
        setStoreEdges(nextEdges);
        setMenu(null);

        // Persist
        await saveCurrentMap(true);
    }, [menu, nodes, edges, setStoreNodes, setStoreEdges, saveCurrentMap]);


    // Auto-center on load and map switch
    useEffect(() => {
        if (!rfInstance || nodes.length === 0) return;

        // Small timeout to ensure nodes are rendered
        const timeoutId = setTimeout(() => {
            const centralNode = nodes.find(n => n.data.isCentral === true);

            if (centralNode) {
                rfInstance.fitView({
                    nodes: [{ id: centralNode.id }],
                    duration: 800,
                    padding: 2, // Zoom out a bit to show context
                });
            } else {
                rfInstance.fitView({
                    duration: 800,
                    padding: 0.2,
                });
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [currentMapId, rfInstance, nodes.length]); // Dependency on nodes.length to trigger when map enhances

    const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        if (node.data.label) {
            setChatInputValue(node.data.label as string);
        }
    }, [setChatInputValue]);

    return (
        <section className="flex-1 flex flex-col relative h-full" ref={containerRef}>
            {/* Toolbar */}
            <div className="absolute top-0 left-0 right-0 h-16 px-6 flex items-center justify-between z-10 pointer-events-none">
                <div className="pointer-events-auto bg-white/80 backdrop-blur shadow-sm border border-gold/20 px-4 py-2 rounded-lg flex items-center gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-espresso font-bold text-base leading-none font-serif">{mapTitle}</h2>
                        <span className="text-xs text-primary font-medium mt-1 font-display">
                            {lastSavedAt
                                ? `Last saved ${new Date(lastSavedAt).toLocaleTimeString()}`
                                : 'Drafting Mode • Unsaved'
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* React Flow Canvas */}
            <div className="flex-1 w-full h-full bg-white">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onReconnect={onReconnect}
                    onReconnectStart={onReconnectStart}
                    onReconnectEnd={onReconnectEnd}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    onNodeContextMenu={onNodeContextMenu}
                    onNodeDragStop={onNodeDragStop}
                    onPaneClick={onPaneClick}
                    onPaneContextMenu={onPaneContextMenu}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onInit={setRfInstance}
                    connectionMode={ConnectionMode.Loose}
                    fitView
                    defaultEdgeOptions={{
                        type: 'custom',
                        style: { stroke: '#003366', strokeWidth: 2 },
                    }}
                >
                    <Background variant={BackgroundVariant.Lines} gap={40} size={1} color="#e2e8f0" />
                    <Controls
                        position="bottom-right"
                        className="!bg-white !border !border-slate-200 !shadow-lg !rounded-lg"
                    />
                </ReactFlow>
            </div>

            {/* Context Menu */}
            {menu && <NodeContextMenu {...menu} onDelete={onDeleteNode} onEdit={onEditNode} />}
            {canvasMenu && <CanvasContextMenu {...canvasMenu} onAddNode={onAddNodeClick} />}

            {/* Dialog */}
            <NodeDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={onDialogSubmit}
                mode={editingNodeId ? 'edit' : 'create'}
                initialData={
                    editingNodeId
                        ? {
                            title: nodes.find(n => n.id === editingNodeId)?.data.label as string || '',
                            description: nodes.find(n => n.id === editingNodeId)?.data.description as string || '',
                            isCentral: nodes.find(n => n.id === editingNodeId)?.data.isCentral as boolean || false
                        }
                        : undefined
                }
            />

            {/* Progressive Loader Overlay */}
            <ProgressiveLoader />




        </section>
    );
}
