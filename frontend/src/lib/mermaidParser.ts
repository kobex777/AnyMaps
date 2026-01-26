/**
 * Mermaid Mindmap Parser
 * Converts raw Mermaid mindmap syntax to GraphTopology
 *
 * This is Step 2 of the Pipeline Architecture:
 * AI Layer → [Parser Layer] → Layout Engine → State Store → React Flow
 *
 * @example
 * Input:
 * mindmap
 *   root((Python Programming))
 *     Data Types
 *       Built-in Types
 *       Collections
 *     Functions
 *       Lambda Functions
 *
 * Output: GraphTopology { nodes, edges }
 */

import type { GraphTopology } from './layout';

interface ParsedNode {
    id: string;
    label: string;
    level: number;
    type: 'central' | 'primary' | 'secondary';
    parentId: string | null;
}

/**
 * Clean a label by removing Mermaid special syntax
 * Handles: root((Label)), root(Label), [Label], (Label), etc.
 */
function cleanLabel(raw: string): { label: string; isRoot: boolean } {
    let label = raw.trim();
    let isRoot = false;

    // Handle root((Label)) - double parentheses (stadium shape)
    if (label.startsWith('root((') && label.endsWith('))')) {
        return { label: label.slice(6, -2), isRoot: true };
    }

    // Handle root(Label) - single parentheses (rounded)
    if (label.startsWith('root(') && label.endsWith(')')) {
        return { label: label.slice(5, -1), isRoot: true };
    }

    // Handle root[Label] - square brackets
    if (label.startsWith('root[') && label.endsWith(']')) {
        return { label: label.slice(5, -1), isRoot: true };
    }

    // Handle plain root identifier
    if (label.toLowerCase() === 'root') {
        return { label: 'Root', isRoot: true };
    }

    // Handle ((Label)) - stadium shape node
    if (label.startsWith('((') && label.endsWith('))')) {
        return { label: label.slice(2, -2), isRoot: false };
    }

    // Handle (Label) - rounded node
    if (label.startsWith('(') && label.endsWith(')') && !label.startsWith('((')) {
        return { label: label.slice(1, -1), isRoot: false };
    }

    // Handle [Label] - square node
    if (label.startsWith('[') && label.endsWith(']')) {
        return { label: label.slice(1, -1), isRoot: false };
    }

    // Handle {Label} - diamond node
    if (label.startsWith('{') && label.endsWith('}')) {
        return { label: label.slice(1, -1), isRoot: false };
    }

    // Handle )Label( - bang node
    if (label.startsWith(')') && label.endsWith('(')) {
        return { label: label.slice(1, -1), isRoot: false };
    }

    return { label, isRoot };
}

/**
 * Calculate indentation level from a line
 * Each 2 spaces = 1 level
 */
function getIndentLevel(line: string): number {
    const match = line.match(/^(\s*)/);
    if (!match) return 0;
    return Math.floor(match[1].length / 2);
}

/**
 * Generate a slug-style ID from a label
 */
function generateId(label: string, index: number): string {
    const slug = label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '')
        .slice(0, 20);
    return slug ? `${slug}_${index}` : `node_${index}`;
}

/**
 * Parse Mermaid mindmap syntax into GraphTopology
 *
 * @param mermaidSyntax - Raw Mermaid mindmap string from the AI
 * @returns GraphTopology object ready for ELK layout
 */
export function parseMermaidMindmap(mermaidSyntax: string): GraphTopology {
    const lines = mermaidSyntax
        .split('\n')
        .map((line) => line.trimEnd())
        .filter((line) => line.trim().length > 0);

    // Find the mindmap declaration and start after it
    const startIndex = lines.findIndex((line) => line.trim().toLowerCase() === 'mindmap');
    if (startIndex === -1) {
        throw new Error('Invalid Mermaid syntax: missing "mindmap" declaration');
    }

    const contentLines = lines.slice(startIndex + 1);
    if (contentLines.length === 0) {
        throw new Error('Invalid Mermaid syntax: no content after "mindmap" declaration');
    }

    const parsedNodes: ParsedNode[] = [];
    const levelStack: { id: string; level: number }[] = [];

    // Find the root level first (to calculate relative depths)
    const rootLevel = getIndentLevel(contentLines[0]);

    contentLines.forEach((line, index) => {
        const level = getIndentLevel(line);
        const relativeLevel = level - rootLevel; // 0 = root, 1 = primary, 2+ = secondary
        const { label, isRoot } = cleanLabel(line.trim());

        // Skip empty labels
        if (!label) return;

        // Generate ID - use 'central' for root node for consistency with PlannerSpec
        const id = isRoot || index === 0 ? 'central' : generateId(label, index);

        // Determine node type based on relative level from root
        const type: 'central' | 'primary' | 'secondary' =
            relativeLevel === 0 ? 'central' : relativeLevel === 1 ? 'primary' : 'secondary';

        // Find parent by walking back the level stack
        while (levelStack.length > 0 && levelStack[levelStack.length - 1].level >= level) {
            levelStack.pop();
        }
        const parentId = levelStack.length > 0 ? levelStack[levelStack.length - 1].id : null;

        parsedNodes.push({ id, label, level, type, parentId });
        levelStack.push({ id, level });
    });

    // Convert to GraphTopology format
    const nodes = parsedNodes.map((node) => ({
        id: node.id,
        label: node.label,
        type: node.type,
    }));

    // Create edges for all non-root nodes
    const edges = parsedNodes
        .filter((node) => node.parentId !== null)
        .map((node, index) => ({
            id: `edge_${index}`,
            source: node.parentId!,
            target: node.id,
        }));

    return { nodes, edges };
}

/**
 * Check if a string is valid Mermaid mindmap syntax
 */
export function isValidMermaidMindmap(syntax: string): boolean {
    try {
        const result = parseMermaidMindmap(syntax);
        return result.nodes.length > 0;
    } catch {
        return false;
    }
}
