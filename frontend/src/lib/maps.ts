/**
 * Maps Service
 * Handles saving and loading mind maps to/from Supabase
 */
import { supabase } from './supabase';
import type { Node, Edge } from '@xyflow/react';
import type { PlannerSpec } from './api';
import type { Message } from '@/components/MessageBubble';

// ============================================
// Types
// ============================================

export interface MapData {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
    updated_at: string;
    is_public: boolean;
}

export interface MapVersionData {
    id: string;
    map_id: string;
    content: MapContent;
    mermaid_syntax: string | null;
    created_at: string;
}

export interface MapContent {
    nodes: Node[];
    edges: Edge[];
    plannerSpec?: PlannerSpec;
    chatHistory?: Message[];
}

export interface MapWithVersion extends MapData {
    latestVersion?: MapVersionData;
}

// ============================================
// Map CRUD Operations
// ============================================

/**
 * Create a new map for the current user
 */
export async function createMap(title: string): Promise<MapData | null> {
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) {
        console.error('User not authenticated');
        return null;
    }

    const { data, error } = await supabase
        .from('maps')
        .insert({
            user_id: user.user.id,
            title,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating map:', error);
        return null;
    }

    return data;
}

/**
 * Get a map by ID
 */
export async function getMap(mapId: string): Promise<MapData | null> {
    const { data, error } = await supabase
        .from('maps')
        .select('*')
        .eq('id', mapId)
        .single();

    if (error) {
        console.error('Error fetching map:', error);
        return null;
    }

    return data;
}

/**
 * Get all maps for the current user
 */
export async function getUserMaps(): Promise<MapData[]> {
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) {
        console.error('User not authenticated');
        return [];
    }

    const { data, error } = await supabase
        .from('maps')
        .select('*')
        .eq('user_id', user.user.id)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('Error fetching user maps:', error);
        return [];
    }

    return data || [];
}

/**
 * Update map title
 */
export async function updateMapTitle(mapId: string, title: string): Promise<boolean> {
    const { error } = await supabase
        .from('maps')
        .update({ title, updated_at: new Date().toISOString() })
        .eq('id', mapId);

    if (error) {
        console.error('Error updating map title:', error);
        return false;
    }

    return true;
}

/**
 * Delete a map and all its versions
 */
export async function deleteMap(mapId: string): Promise<boolean> {
    const { error } = await supabase
        .from('maps')
        .delete()
        .eq('id', mapId);

    if (error) {
        console.error('Error deleting map:', error);
        return false;
    }

    return true;
}

// ============================================
// Map Version Operations
// ============================================

/**
 * Save a new version of a map
 */
export async function saveMapVersion(
    mapId: string,
    content: MapContent,
    mermaidSyntax?: string | null
): Promise<MapVersionData | null> {
    const { data, error } = await supabase
        .from('map_versions')
        .insert({
            map_id: mapId,
            content,
            mermaid_syntax: mermaidSyntax || null,
        })
        .select()
        .single();

    if (error) {
        console.error('Error saving map version:', error);
        return null;
    }

    // Update the parent map's updated_at timestamp
    await supabase
        .from('maps')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', mapId);

    return data;
}

/**
 * Get the latest version of a map
 */
export async function getLatestMapVersion(mapId: string): Promise<MapVersionData | null> {
    const { data, error } = await supabase
        .from('map_versions')
        .select('*')
        .eq('map_id', mapId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            // No versions found - not an error
            return null;
        }
        console.error('Error fetching map version:', error);
        return null;
    }

    return data;
}

/**
 * Get all versions of a map (for version history)
 */
export async function getMapVersions(mapId: string): Promise<MapVersionData[]> {
    const { data, error } = await supabase
        .from('map_versions')
        .select('*')
        .eq('map_id', mapId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching map versions:', error);
        return [];
    }

    return data || [];
}

// ============================================
// Convenience Functions
// ============================================

/**
 * Save a map - creates new map if no mapId, otherwise saves new version
 */
export async function saveMap(
    title: string,
    content: MapContent,
    mermaidSyntax?: string | null,
    existingMapId?: string | null
): Promise<{ map: MapData; version: MapVersionData } | null> {
    let map: MapData | null = null;

    // Use existing map or create new one
    if (existingMapId) {
        map = await getMap(existingMapId);
        if (map) {
            // Update title if changed
            await updateMapTitle(existingMapId, title);
        }
    }

    if (!map) {
        map = await createMap(title);
    }

    if (!map) {
        return null;
    }

    // Save the version
    const version = await saveMapVersion(map.id, content, mermaidSyntax);

    if (!version) {
        return null;
    }

    return { map, version };
}

/**
 * Load a complete map with its latest version
 */
export async function loadMap(mapId: string): Promise<MapWithVersion | null> {
    const map = await getMap(mapId);

    if (!map) {
        return null;
    }

    const latestVersion = await getLatestMapVersion(mapId);

    return {
        ...map,
        latestVersion: latestVersion || undefined,
    };
}
