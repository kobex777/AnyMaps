/**
 * Utility to convert PlannerSpec to React Flow nodes and edges
 */
import type { Node, Edge } from '@xyflow/react';
import type { PlannerSpec, NodeSpec } from './api';

/**
 * Convert a PlannerSpec to React Flow format
 */
export function plannerSpecToReactFlow(spec: PlannerSpec): {
    nodes: Node[];
    edges: Edge[];
} {
    // Convert nodes
    const nodes: Node[] = spec.nodes.map((nodeSpec: NodeSpec, index: number) => {
        // Calculate position based on type and index
        const position = calculateNodePosition(nodeSpec, index, spec.nodes.length);

        return {
            id: nodeSpec.id,
            type: 'mindMapNode',
            position,
            data: {
                label: nodeSpec.label,
                description: nodeSpec.description || '',
                isCentral: nodeSpec.type === 'central',
                icon: nodeSpec.icon,
            },
        };
    });

    // Convert edges
    const edges: Edge[] = spec.edges.map((edgeSpec, index) => ({
        id: `edge-${index}`,
        source: edgeSpec.source,
        target: edgeSpec.target,
        label: edgeSpec.label,
        animated: edgeSpec.style === 'dashed',
        style: {
            stroke: edgeSpec.style === 'dotted' ? '#003366' : '#003366',
            strokeWidth: 2,
            strokeDasharray: edgeSpec.style === 'dashed' ? '5,5' : undefined,
        },
    }));

    return { nodes, edges };
}

/**
 * Calculate node position based on type and index
 */
function calculateNodePosition(
    node: NodeSpec,
    index: number,
    totalNodes: number
): { x: number; y: number } {
    // Central node in the middle
    if (node.type === 'central') {
        return { x: 400, y: 300 };
    }

    // Primary nodes in a circle around the center
    if (node.type === 'primary') {
        const radius = 300;
        const angle = (index * 2 * Math.PI) / Math.max(totalNodes - 1, 1);
        return {
            x: 400 + radius * Math.cos(angle),
            y: 300 + radius * Math.sin(angle),
        };
    }

    // Secondary nodes further out
    const radius = 500;
    const angle = (index * 2 * Math.PI) / totalNodes;
    return {
        x: 400 + radius * Math.cos(angle),
        y: 300 + radius * Math.sin(angle),
    };
}
