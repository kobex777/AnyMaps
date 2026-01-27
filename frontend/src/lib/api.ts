/**
 * API Client for AnyMaps Backend
 * Handles communication with the Python FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Default timeout for API requests (60 seconds - AI calls can be slow)
const DEFAULT_TIMEOUT_MS = 60000;

// ============================================
// Type Definitions (matching backend models)
// ============================================

export interface NodeSpec {
    id: string;
    label: string;
    description?: string;
    type: string;
    icon?: string;
}

export interface EdgeSpec {
    source: string;
    target: string;
    label?: string;
    style: string;
}

export interface PlannerSpec {
    title: string;
    central_topic: string;
    nodes: NodeSpec[];
    edges: EdgeSpec[];
    summary?: string;
}

export interface GeneratePlanRequest {
    user_prompt: string;
    image_base64?: string;
}

export interface GeneratePlanResponse {
    success: boolean;
    planner_spec?: PlannerSpec;
    error?: string;
}

export interface GenerateBuildRequest {
    planner_spec: PlannerSpec;
}

export interface GenerateBuildResponse {
    success: boolean;
    mermaid_syntax?: string;
    error?: string;
}

export interface GenerateFullRequest {
    user_prompt: string;
    image_base64?: string;
}

export interface GenerateFullResponse {
    success: boolean;
    planner_spec?: PlannerSpec;
    mermaid_syntax?: string;
    error?: string;
}

// ============================================
// Timeout Helper
// ============================================

/**
 * Wraps a fetch request with a timeout
 */
async function fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error(`Request timed out after ${timeoutMs / 1000} seconds`);
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

// ============================================
// API Client Functions
// ============================================

/**
 * Generate a mind map plan from user prompt
 */
export async function generatePlan(
    userPrompt: string,
    imageBase64?: string
): Promise<GeneratePlanResponse> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/generate/plan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_prompt: userPrompt,
            image_base64: imageBase64,
        } as GeneratePlanRequest),
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Convert a PlannerSpec to Mermaid syntax
 */
export async function generateBuild(
    plannerSpec: PlannerSpec
): Promise<GenerateBuildResponse> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/generate/build`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            planner_spec: plannerSpec,
        } as GenerateBuildRequest),
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Full pipeline: Generate plan and build in one request
 */
export async function generateFull(
    userPrompt: string,
    imageBase64?: string
): Promise<GenerateFullResponse> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/generate/full`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_prompt: userPrompt,
            image_base64: imageBase64,
        } as GenerateFullRequest),
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Health check endpoint
 */
export async function healthCheck(): Promise<{ status: string; version: string }> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/health`, {}, 5000);

    if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
    }

    return response.json();
}

// ============================================
// Enhance Map Types and Functions
// ============================================

export type EnhanceMode = 'expand' | 'refine' | 'focus' | 'simplify';

export interface EnhanceMapRequest {
    current_spec: PlannerSpec;
    enhance_prompt: string;
    enhance_mode: EnhanceMode;
}

export interface EnhanceMapResponse {
    success: boolean;
    planner_spec?: PlannerSpec;
    changes_summary?: string;
    error?: string;
}

/**
 * Enhance an existing mind map with additional content
 * 
 * @param currentSpec - The current diagram state
 * @param enhancePrompt - What to add, change, or expand
 * @param mode - 'expand' (add nodes), 'refine' (improve labels), 'focus' (dive deeper)
 */
export async function enhanceMap(
    currentSpec: PlannerSpec,
    enhancePrompt: string,
    mode: EnhanceMode = 'expand'
): Promise<EnhanceMapResponse> {
    const response = await fetchWithTimeout(
        `${API_BASE_URL}/generate/enhance`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_spec: currentSpec,
                enhance_prompt: enhancePrompt,
                enhance_mode: mode,
            } as EnhanceMapRequest),
        },
        60000 // Allow more time for enhance (60s) since it processes larger context
    );

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}
