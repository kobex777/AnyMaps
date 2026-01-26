import { memo } from 'react';

interface CanvasContextMenuProps {
    top: number;
    left: number;
    onAddNode: () => void;
}

export const CanvasContextMenu = memo(({ top, left, onAddNode }: CanvasContextMenuProps) => {
    return (
        <div
            style={{ top, left }}
            className="absolute z-50 bg-white border border-slate-200 rounded-lg shadow-xl p-1 min-w-[150px] animate-in fade-in zoom-in-95 duration-100"
        >
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 py-1 mb-1">
                Node Actions
            </p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onAddNode();
                }}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-green-50 text-green-700 text-sm font-medium flex items-center gap-2 transition-colors"
                title="Add a new node here"
            >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add Node
            </button>
        </div>
    );
});

CanvasContextMenu.displayName = 'CanvasContextMenu';
