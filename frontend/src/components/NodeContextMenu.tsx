import { memo } from 'react';

interface NodeContextMenuProps {
    id: string;
    top: number;
    left: number;
    onDelete: () => void;
    onEdit: () => void;
}

export const NodeContextMenu = memo(({ id, top, left, onDelete, onEdit }: NodeContextMenuProps) => {
    return (
        <div
            style={{ top, left }}
            className="absolute z-50 bg-white border border-slate-200 rounded-lg shadow-xl p-1 min-w-[150px] animate-in fade-in zoom-in-95 duration-100"
        >
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 py-1 mb-1">
                Node Actions
            </p>
            <button
                onClick={onEdit}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 text-sm font-medium flex items-center gap-2 transition-colors mb-1"
                title={`Edit node ${id}`}
            >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Edit Node
            </button>
            <button
                onClick={onDelete}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2 transition-colors"
                title={`Delete node ${id}`}
            >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                Delete Node
            </button>
        </div>
    );
});

NodeContextMenu.displayName = 'NodeContextMenu';
