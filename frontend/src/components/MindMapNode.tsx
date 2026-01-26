import { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';
import { useAppStore } from '@/store/useAppStore';

// Helper to determine if an icon string is valid
const isValidIcon = (icon: string | undefined): boolean => {
    if (!icon) return false;
    const cleanIcon = icon.trim();

    // Strict validation: 
    // 1. Must be non-empty
    // 2. Must only contain lowercase letters, numbers, and underscores (snake_case)
    // 3. Must not be a reserved word like 'null' or 'none'
    // 4. Must be reasonably short (< 30 chars) to avoid full sentences
    // 4. Must be reasonably short (< 30 chars) to avoid full sentences
    // UPDATE: Now allowing paths (containing / or .) for custom image icons
    const isSnakeCase = /^[a-z0-9_]+$/.test(cleanIcon) || /^[\/.\w-]+$/.test(cleanIcon);
    const isReasonableLength = cleanIcon.length > 0 && cleanIcon.length < 30;
    const isNotReserved = cleanIcon !== 'null' && cleanIcon !== 'undefined' && cleanIcon !== 'none';

    return isSnakeCase && isReasonableLength && isNotReserved;
};

interface MindMapNodeData {
    label: string;
    description?: string;
    isCentral?: boolean;
    image?: string;
    thumbnail?: string;
    icon?: string;
}

interface MindMapNodeProps {
    data: MindMapNodeData;
    selected?: boolean;
    id: string; // React Flow passes id automatically
}

export const MindMapNode = memo(({ data, selected }: MindMapNodeProps) => {
    const { label, description, isCentral, image, thumbnail, icon } = data;

    const onResizeEnd = () => {
        // Persist the new size
        useAppStore.getState().saveCurrentMap(true);
    };

    // Central node style (larger card with image)
    if (isCentral) {
        return (
            <div className="bg-white p-1 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-primary/20 min-w-[20rem] max-w-sm w-full h-full group flex flex-col">
                <NodeResizer
                    color="#003366"
                    isVisible={selected}
                    minWidth={320}
                    minHeight={200}
                    onResizeEnd={onResizeEnd}
                />
                <Handle type="target" position={Position.Top} id="top" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
                <Handle type="target" position={Position.Left} id="left" className="!bg-primary !w-1.5 !h-1.5 !z-50" />

                {image && (
                    <div
                        className="h-32 rounded-lg bg-cover bg-center relative overflow-hidden"
                        style={{ backgroundImage: `url('${image}')` }}
                    >
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                )}

                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-espresso leading-tight font-serif">{label}</h3>
                        <span className="bg-gold/20 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide font-display">
                            Central Node
                        </span>
                    </div>
                    {description && (
                        <p className="text-sm text-slate-600 mb-4 font-display">{description}</p>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent node selection
                            const setChatInputValue = useAppStore.getState().setChatInputValue;
                            const enhanceMap = useAppStore.getState().enhanceMap;
                            const prompt = `Extend ${label}`;
                            setChatInputValue(prompt); // Visual feedback
                            enhanceMap(prompt); // Auto-submit
                        }}
                        className="w-full py-2 bg-background-light text-primary text-xs font-bold uppercase tracking-wider rounded border border-primary/10 hover:bg-primary hover:text-white transition-colors font-display"
                    >
                        Expand Node
                    </button>
                </div>

                <Handle type="source" position={Position.Right} id="right" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
                <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
            </div>
        );
    }

    // Compact node with thumbnail (only if no explicit icon is provided)
    if (thumbnail && !isValidIcon(icon)) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 min-w-[14rem] max-w-xs w-full h-full flex items-center gap-3 hover:scale-105 transition-transform">
                <NodeResizer
                    color="#003366"
                    isVisible={selected}
                    minWidth={224}
                    minHeight={80}
                    onResizeEnd={onResizeEnd}
                />
                <Handle type="target" position={Position.Top} id="top" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
                <Handle type="target" position={Position.Left} id="left" className="!bg-primary !w-1.5 !h-1.5 !z-50" />

                <div
                    className="size-10 bg-slate-100 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url('${thumbnail}')` }}
                ></div>
                <div>
                    <h4 className="font-bold text-espresso text-sm font-serif">{label}</h4>
                    {description && (
                        <p className="text-[10px] text-primary font-display">{description}</p>
                    )}
                </div>

                <Handle type="source" position={Position.Right} id="right" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
                <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
            </div>
        );
    }

    // Default to Icon layout (using provided icon or fallback 'circle')
    // This handles both explicit icons and the fallback for plain nodes
    const displayIcon = isValidIcon(icon) ? icon : 'circle';

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-gold min-w-[16rem] max-w-xs w-full h-full hover:scale-105 transition-transform flex flex-col justify-center">
            <NodeResizer
                color="#003366"
                isVisible={selected}
                minWidth={256}
                minHeight={100}
                onResizeEnd={onResizeEnd}
            />
            <Handle type="target" position={Position.Top} id="top" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
            <Handle type="target" position={Position.Left} id="left" className="!bg-primary !w-1.5 !h-1.5 !z-50" />

            <div className="flex items-center gap-2 mb-2">
                {displayIcon && displayIcon.match(/^(\/|http)/) ? (
                    <img src={displayIcon} alt="Icon" className="w-8 h-8 object-contain" />
                ) : (
                    <span className="material-symbols-outlined text-primary">{displayIcon}</span>
                )}
                <h4 className="font-bold text-espresso text-sm font-serif">{label}</h4>
            </div>
            {description && (
                <p className="text-xs text-slate-500 font-display">{description}</p>
            )}

            <Handle type="source" position={Position.Right} id="right" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
            <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-primary !w-1.5 !h-1.5 !z-50" />
        </div>
    );
});

MindMapNode.displayName = 'MindMapNode';
