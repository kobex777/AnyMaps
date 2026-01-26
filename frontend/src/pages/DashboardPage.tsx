import { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { ChatPanel } from '@/components/ChatPanel';
import { DiagramCanvas } from '@/components/DiagramCanvas';
import { useAppStore } from '@/store/useAppStore';

export function DashboardPage() {
    const { mapId } = useParams<{ mapId?: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { chatHistory, currentMapTitle, currentMapId, enhanceMap, loadMapById, reset, setStatus } = useAppStore();
    const [isChatOpen, setIsChatOpen] = useState(true);

    // Handle initial load, URL params, and navigation state
    useEffect(() => {
        const initDashboard = async () => {
            // Case 1: Navigating to specific map ID
            if (mapId && mapId !== currentMapId) {
                await loadMapById(mapId);
            }
            // Case 2: Landing page redirect with prompt
            else if (location.state?.initialPrompt) {
                // Check if we need to force a new chat (e.g. coming from landing page "Construct")
                if (location.state.forceNewChat) {
                    reset();
                    // Force status to planning immediately so loader appears while we await enhanceMap
                    setStatus('planning');
                }

                // Clear the state so we don't re-run on refresh
                window.history.replaceState({}, document.title);
                await enhanceMap(location.state.initialPrompt);
            }
        };

        initDashboard();
    }, [mapId, location.state]);

    // Update URL when map is created/loaded (if ID mismatches)
    useEffect(() => {
        // If we represent a "new chat" intent, do not redirect to old ID
        if (location.state?.forceNewChat) return;

        if (currentMapId && mapId !== currentMapId) {
            navigate(`/dashboard/${currentMapId}`, { replace: true });
        }
    }, [currentMapId, mapId, navigate, location.state]);

    const handleSendMessage = useCallback(async (content: string) => {
        // enhanceMap auto-detects: if no map exists, it generates a new one
        // if a map exists, it enhances it with the new prompt
        await enhanceMap(content);
    }, [enhanceMap]);

    const handleNewAtlas = useCallback(() => {
        // Reset state
        reset();
        // Clear URL param
        navigate('/dashboard');
    }, [reset, navigate]);

    return (
        <div className="font-display text-slate-800 bg-background-light dark:bg-background-dark h-screen flex overflow-hidden">
            {/* Sidebar Navigation */}
            <Sidebar
                onNewAtlas={handleNewAtlas}
                isChatOpen={isChatOpen}
                onToggleChat={() => setIsChatOpen(!isChatOpen)}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden relative paper-grain font-display">
                {/* Chat Panel */}
                <ChatPanel
                    messages={chatHistory}
                    onSendMessage={handleSendMessage}
                    isOpen={isChatOpen}
                    onToggle={() => setIsChatOpen(!isChatOpen)}
                />

                {/* Diagram Canvas */}
                <DiagramCanvas mapTitle={currentMapTitle || 'Loading...'} />
            </main>

            {/* Modal Overlay (hidden by default) */}
            <div className="fixed inset-0 bg-black/50 z-30 hidden"></div>
        </div>
    );
}
