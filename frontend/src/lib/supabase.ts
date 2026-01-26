import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock/null client if credentials are missing (for development)
let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn('Supabase credentials not configured. Using placeholder client.');
    // Create a minimal placeholder that won't crash the app
    supabase = createClient(
        'https://placeholder.supabase.co',
        'placeholder-key'
    );
}

export { supabase };

// ============================================
// TEMPORARY: Anonymous Session for Testing
// See docs/TEMP_ANONYMOUS_AUTH.md - REMOVE BEFORE PRODUCTION
// ============================================

/**
 * Initialize anonymous session for testing persistence.
 * This allows saving/loading maps without login UI.
 * 
 * ⚠️ TEMPORARY - Remove when implementing proper auth
 */
export async function initAnonymousSession(): Promise<void> {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        console.log('📝 Creating anonymous session for testing...');
        const { error } = await supabase.auth.signInAnonymously();

        if (error) {
            console.error('❌ Anonymous sign-in failed:', error.message);
        } else {
            console.log('✅ Anonymous session created');
        }
    } else {
        console.log('✅ Session already exists');
    }
}
