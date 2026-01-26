/**
 * ELK Layout Service
 * Uses elkjs to calculate optimal node positions for mind maps
 */
import ELK, { type ElkNode, type ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';
import type { Node, Edge } from '@xyflow/react';
import type { PlannerSpec, NodeSpec } from './api';

// Initialize ELK instance
const elk = new ELK();

// ELK layout options for mind map style
const ELK_OPTIONS = {
    'elk.algorithm': 'mrtree',
    'elk.direction': 'RIGHT',
    'elk.spacing.nodeNode': '80',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.mrtree.weighting': 'CONSTRAINT',
};

// Default node dimensions
const NODE_WIDTH = 280;
const NODE_HEIGHT = 120;
const CENTRAL_NODE_WIDTH = 350;
const CENTRAL_NODE_HEIGHT = 200;

/**
 * GraphTopology interface matching pipeline architecture spec
 */
export interface GraphTopology {
    nodes: Array<{ id: string; label: string; type?: string; description?: string; icon?: string }>;
    edges: Array<{ id: string; source: string; target: string; label?: string }>;
}

/**
 * Convert PlannerSpec to GraphTopology
 * This bridges our AI output to the ELK layout input
 */
export function plannerSpecToTopology(spec: PlannerSpec): GraphTopology {
    return {
        nodes: spec.nodes.map((node: NodeSpec) => ({
            id: node.id,
            label: node.label,
            type: node.type,
            description: node.description,
            icon: node.icon,
        })),
        edges: spec.edges.map((edge, index) => ({
            id: `edge-${index}`,
            source: edge.source,
            target: edge.target,
            label: edge.label,
        })),
    };
}

/**
 * Calculate layout using ELK.js
 * Returns positioned React Flow nodes and edges
 */
export async function calculateLayout(
    topology: GraphTopology
): Promise<{ nodes: Node[]; edges: Edge[] }> {
    // Build ELK graph structure
    const elkGraph: ElkNode = {
        id: 'root',
        layoutOptions: ELK_OPTIONS,
        children: topology.nodes.map((node) => {
            const isCentral = node.type === 'central';
            return {
                id: node.id,
                width: isCentral ? CENTRAL_NODE_WIDTH : NODE_WIDTH,
                height: isCentral ? CENTRAL_NODE_HEIGHT : NODE_HEIGHT,
                // Store metadata for later
                labels: [{ text: node.label }],
            };
        }),
        edges: topology.edges.map((edge) => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target],
            labels: edge.label ? [{ text: edge.label }] : [],
        })) as ElkExtendedEdge[],
    };

    // Run ELK layout algorithm
    const layoutedGraph = await elk.layout(elkGraph);

    // Convert ELK output to React Flow format
    const nodes: Node[] = (layoutedGraph.children || []).map((elkNode) => {
        const originalNode = topology.nodes.find((n) => n.id === elkNode.id);
        const isCentral = originalNode?.type === 'central';

        return {
            id: elkNode.id,
            type: 'mindMapNode',
            position: {
                x: elkNode.x || 0,
                y: elkNode.y || 0,
            },
            data: {
                label: originalNode?.label || elkNode.id,
                description: originalNode?.description || '',
                isCentral,
                icon: originalNode?.icon,
            },
        };
    });

    // Convert edges to React Flow format
    const edges: Edge[] = topology.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        animated: true,
        style: {
            stroke: '#003366',
            strokeWidth: 2,
        },
    }));

    return { nodes, edges };
}

/**
 * Full pipeline: PlannerSpec -> GraphTopology -> ELK Layout -> React Flow
 */
export async function layoutFromPlannerSpec(
    spec: PlannerSpec
): Promise<{ nodes: Node[]; edges: Edge[] }> {
    const topology = plannerSpecToTopology(spec);
    return calculateLayout(topology);
}

/**
 * Full pipeline: Mermaid Syntax -> GraphTopology -> ELK Layout -> React Flow
 * This is the architecture-compliant path using Step 2 (Parser Layer)
 */
export async function layoutFromMermaid(
    mermaidSyntax: string
): Promise<{ nodes: Node[]; edges: Edge[] }> {
    // Dynamic import to keep bundle size smaller if not used
    const { parseMermaidMindmap } = await import('./mermaidParser');
    const topology = parseMermaidMindmap(mermaidSyntax);
    return calculateLayout(topology);
}
