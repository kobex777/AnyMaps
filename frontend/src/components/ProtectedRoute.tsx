import { useEffect, useState, type ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true);
    const [_session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light flex items-center justify-center">
                <div className="text-center">
                    <div className="size-12 bg-gold rounded-full flex items-center justify-center text-espresso shadow-lg mx-auto mb-4 animate-pulse">
                        <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <p className="text-espresso font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // For development, allow access without auth
    // In production, uncomment the redirect below
    // if (!session) return <Navigate to="/" replace />;

    return <>{children}</>;
}
