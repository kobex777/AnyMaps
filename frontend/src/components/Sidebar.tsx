import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { getUserMaps, deleteMap, type MapData } from '../lib/maps';
import { useAppStore } from '../store/useAppStore';

// Using placeholder images - these should be replaced with local assets
const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtT8udp-Rz5OuzsrIO0rzNEHjHp7JehkdmQxZOk5016XwCbrA62L6paXQyaXv-U2LXJ3YHi78fRVaRnqL57PPoXEeH8CtI0-VeaOwzV9K8mxkhkirSkltX6SgcNau0PZuVKOgt_oaYhhKd79uM_za8o82afVvStk8KFC4uUa1LJYeFaawE734Wm4lJ6yLFGI_bP4CEN5-xXSIafb4_FFy9J-zEJyuIXnZnqAHFpP2RN8i8_c3Ialk-nvqoIaNVBk-T7o0a3ns00YA';

interface SidebarProps {
    onNewAtlas?: () => void;
    isChatOpen: boolean;
    onToggleChat: () => void;
}

export function Sidebar({ onNewAtlas, isChatOpen, onToggleChat }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [userMaps, setUserMaps] = useState<MapData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Get lastSavedAt from store to trigger refresh after saves
    const lastSavedAt = useAppStore((state) => state.lastSavedAt);

    // Load user's saved maps (re-runs when lastSavedAt changes)
    useEffect(() => {
        const loadMaps = async () => {
            setIsLoading(true);
            // Small delay to ensure auth session is ready
            await new Promise(resolve => setTimeout(resolve, 500));
            const maps = await getUserMaps();
            setUserMaps(maps);
            setIsLoading(false);
        };
        loadMaps();
    }, [lastSavedAt]);

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; mapId: string } | null>(null);

    // Close context menu on global click
    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const handleContextMenu = (e: React.MouseEvent, mapId: string) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            mapId,
        });
    };

    return (
        <>
            <aside
                className={cn(
                    "flex-shrink-0 bg-espresso text-parchment flex flex-col justify-between border-r border-[#4A3B32] shadow-2xl z-20 transition-all duration-300 relative",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {/* Inner container handles hover expansion, effectively excluding the button from the trigger area */}
                <div
                    className="flex flex-col justify-between h-full w-full"
                    onMouseMove={(e) => {
                        // Only expand if hovering the left part (safe zone logic)
                        if (isCollapsed && e.clientX < 60) {
                            setIsCollapsed(false);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!contextMenu) setIsCollapsed(true);
                    }}
                >
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* Logo */}
                        <Link
                            to="/"
                            className={cn(
                                "h-20 flex items-center border-b border-[#4A3B32] cursor-pointer hover:bg-[#4A3B32]/30 transition-colors overflow-hidden",
                                isCollapsed ? "justify-center px-0" : "justify-start px-6"
                            )}
                        >
                            <div className="size-10 bg-gold rounded-full flex items-center justify-center text-espresso shadow-lg shrink-0">
                                <span className="material-symbols-outlined">psychology</span>
                            </div>
                            <div className={cn(
                                "flex-col ml-3 transition-opacity duration-300",
                                isCollapsed ? "hidden" : "flex"
                            )}>
                                <h1 className="text-white text-xl font-bold tracking-wide font-serif whitespace-nowrap">AnyMaps</h1>
                                <span className="text-xs text-gold uppercase tracking-widest opacity-80 font-display whitespace-nowrap">Atelier</span>
                            </div>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex-1 flex flex-col gap-2 p-3 mt-4 font-display min-h-0 overflow-hidden">
                            <button
                                onClick={onNewAtlas}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-[#4A3B32]/50 text-gold border border-gold/20 hover:bg-[#4A3B32] hover:border-gold transition-colors group overflow-hidden shrink-0",
                                    isCollapsed ? "justify-center px-0 gap-0" : "justify-start"
                                )}
                                title="New Atlas"
                            >
                                <div className="flex items-center justify-center w-6 h-6 shrink-0">
                                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-[24px]">add_circle</span>
                                </div>
                                <span className={cn(
                                    "font-medium text-sm whitespace-nowrap transition-all duration-300",
                                    isCollapsed ? "w-0 opacity-0" : "inline w-auto opacity-100"
                                )}>New Atlas</span>
                            </button>

                            <div className={cn(
                                "pt-4 pb-2 px-3 transition-opacity duration-300",
                                isCollapsed ? "hidden" : "block"
                            )}>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#8A7B70] whitespace-nowrap">
                                    {userMaps.length > 0 ? 'Your Maps' : 'No saved maps'}
                                </p>
                            </div>

                            <div className={cn(
                                "flex-1 overflow-y-auto min-h-0 space-y-1 pr-1",
                                isCollapsed
                                    ? "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                    : "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full"
                            )}>
                                {userMaps.map((map) => (
                                    <button
                                        key={map.id}
                                        onClick={() => navigate(`/dashboard/${map.id}`)}
                                        onContextMenu={(e) => handleContextMenu(e, map.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-parchment hover:bg-[#4A3B32] hover:text-white transition-colors cursor-pointer overflow-hidden",
                                            "transition-all duration-300 ease-out origin-center",
                                            deletingId === map.id
                                                ? "opacity-0 scale-95 max-h-0 py-0 mb-0 pointer-events-none"
                                                : "opacity-100 scale-100 max-h-[50px]",
                                            isCollapsed && "justify-center gap-0"
                                        )}
                                        title={map.title}
                                    >
                                        <span className="material-symbols-outlined opacity-70 shrink-0">map</span>
                                        <span className={cn(
                                            "text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300",
                                            isCollapsed ? "w-0 opacity-0" : "inline w-auto opacity-100"
                                        )}>{map.title}</span>
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>

                    {/* User Section */}
                    <div className="p-3 border-t border-[#4A3B32] font-display">
                        <div className={cn(
                            "mt-2 flex items-center gap-3 px-3 py-2 transition-all duration-300 overflow-hidden",
                            isCollapsed ? "justify-center gap-0" : "justify-start"
                        )}>
                            <div
                                className="size-8 rounded-full bg-cover bg-center border border-gold shrink-0"
                                style={{ backgroundImage: `url('${USER_AVATAR}')` }}
                            ></div>
                            <div className={cn(
                                "flex flex-col transition-all duration-300",
                                isCollapsed ? "w-0 opacity-0" : "flex w-auto opacity-100"
                            )}>
                                <span className="text-sm font-medium text-white whitespace-nowrap">Tester User</span>
                                <span className="text-xs text-gold/80 whitespace-nowrap">Pro Plan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Toggle Button - Outside inner container to prevent hover trigger */}
                {!isChatOpen && (
                    <button
                        onClick={onToggleChat}
                        className="absolute -right-5 top-1/2 -translate-y-1/2 h-24 w-5 bg-espresso border border-l-0 border-[#4A3B32] text-gold rounded-r-lg shadow-lg flex items-center justify-center hover:bg-[#4A3B32] hover:text-white transition-all z-50 cursor-pointer"
                        title="Open Atelier"
                    >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                )}
            </aside>

            {/* Context Menu Portal */}
            {contextMenu && (
                <div
                    className="fixed z-50 bg-white rounded-lg shadow-xl border border-slate-200 py-1 min-w-[160px] animate-in fade-in zoom-in-95 duration-100"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        onClick={async (e) => {
                            e.stopPropagation();

                            // Start animation and close menu
                            setDeletingId(contextMenu.mapId);
                            setContextMenu(null);

                            const success = await deleteMap(contextMenu.mapId);

                            // Wait for animation to finish
                            await new Promise(resolve => setTimeout(resolve, 300));

                            if (success) {
                                // Update local state
                                setUserMaps(current => current.filter(m => m.id !== contextMenu.mapId));

                                // If we're currently on this map, redirect to dashboard
                                if (location.pathname === `/dashboard/${contextMenu.mapId}`) {
                                    navigate('/dashboard');
                                }
                            }
                            setDeletingId(null);
                        }}
                    >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Delete Map
                    </button>
                </div>
            )}
        </>
    );
}
