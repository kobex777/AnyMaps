import { useState, useEffect, useCallback } from 'react';
import type { Node, Edge } from '@xyflow/react';
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

interface UseLayoutOptions {
    algorithm?: string;
}

export function useLayout(
    initialNodes: Node[],
    initialEdges: Edge[],
    options: UseLayoutOptions = {}
) {
    const [layoutedNodes, setLayoutedNodes] = useState<Node[]>([]);
    const [layoutedEdges, setLayoutedEdges] = useState<Edge[]>([]);
    const [isLayouting, setIsLayouting] = useState(true);

    const { algorithm = 'mrtree' } = options;

    const runLayout = useCallback(async () => {
        if (initialNodes.length === 0) {
            setLayoutedNodes([]);
            setLayoutedEdges([]);
            setIsLayouting(false);
            return;
        }

        setIsLayouting(true);

        try {
            // Build ELK graph with measured or default dimensions
            const elkGraph = {
                id: 'root',
                layoutOptions: {
                    'elk.algorithm': algorithm,
                    'elk.spacing.nodeNode': '80',
                    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
                },
                children: initialNodes.map((node) => ({
                    id: node.id,
                    width: node.width ?? node.measured?.width ?? 200,
                    height: node.height ?? node.measured?.height ?? 100,
                })),
                edges: initialEdges.map((edge) => ({
                    id: edge.id,
                    sources: [edge.source],
                    targets: [edge.target],
                })),
            };

            // Run ELK layout
            const layoutResult = await elk.layout(elkGraph);

            // Apply calculated positions to nodes
            const positionedNodes = initialNodes.map((node) => {
                const elkNode = layoutResult.children?.find((n) => n.id === node.id);
                return {
                    ...node,
                    position: {
                        x: elkNode?.x ?? node.position.x,
                        y: elkNode?.y ?? node.position.y,
                    },
                };
            });

            setLayoutedNodes(positionedNodes);
            setLayoutedEdges(initialEdges);
        } catch (error) {
            console.error('Layout error:', error);
            // Fallback to original positions
            setLayoutedNodes(initialNodes);
            setLayoutedEdges(initialEdges);
        } finally {
            setIsLayouting(false);
        }
    }, [initialNodes, initialEdges, algorithm]);

    useEffect(() => {
        runLayout();
    }, [runLayout]);

    return {
        layoutedNodes,
        layoutedEdges,
        isLayouting,
        rerunLayout: runLayout,
    };
}
