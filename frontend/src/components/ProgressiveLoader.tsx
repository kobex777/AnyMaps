/**
 * Progressive Loader Component
 * Minimalistic Apple-style loading screen
 */
import { useAppStore } from '@/store/useAppStore';

export function ProgressiveLoader() {
    const status = useAppStore((state) => state.status);

    // Only show during active generation
    if (status === 'idle' || status === 'ready' || status === 'error') {
        return null;
    }

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-500">
            <div className="relative flex flex-col items-center p-8 bg-[#323232]/80 backdrop-blur-md rounded-2xl shadow-2xl">
                {/* iOS-style Spinner */}
                <div className="relative w-8 h-8 animate-[spin_1s_steps(12)_infinite]">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute left-1/2 top-0 w-[8%] h-[28%] bg-white/80 rounded-full -translate-x-1/2 origin-[50%_179%]"
                            style={{
                                transform: `rotate(${i * 30}deg) translate(0, 0)`,
                                opacity: Math.max(0.1, 1 - (i / 11)), // Fade opacity around the circle
                            }}
                        />
                    ))}
                </div>
                {/* <p className="text-white/80 text-xs font-medium mt-4 tracking-wide">Processing...</p> */}
            </div>
        </div>
    );
}
