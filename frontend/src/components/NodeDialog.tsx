import React, { useState, useEffect } from 'react';

interface NodeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string, description: string, isCentral: boolean) => void;
    initialData?: { title: string; description: string; isCentral?: boolean };
    mode?: 'create' | 'edit';
}

export function NodeDialog({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode = 'create'
}: NodeDialogProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isCentral, setIsCentral] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Reset or Initialize form when opened
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            if (mode === 'edit' && initialData) {
                setTitle(initialData.title);
                setDescription(initialData.description);
                setIsCentral(initialData.isCentral || false);
            } else {
                setTitle('');
                setDescription('');
                setIsCentral(false);
            }
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen, mode, initialData]);

    if (!isOpen && !isAnimating) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit(title, description, isCentral);
    };

    const isEdit = mode === 'edit';

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-black/20 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'}`}
        >
            <div
                className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 w-full max-w-sm p-6 transform transition-all duration-300 ease-out ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'} origin-center`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-sans font-semibold text-slate-900 tracking-tight">
                        {isEdit ? 'Edit Node' : 'New Node'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-primary/70">
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-sans text-base text-slate-800 placeholder:text-slate-400"
                                placeholder="Concept Name"
                                autoFocus
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-primary/70">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none h-28 font-sans text-sm text-slate-600 placeholder:text-slate-400 leading-relaxed"
                                placeholder="Add a brief description..."
                            />
                        </div>

                        {/* Central Node Toggle */}
                        <div className="flex items-center justify-between group cursor-pointer" onClick={() => setIsCentral(!isCentral)}>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-700">Central Node</span>
                                <span className="text-[10px] text-slate-400 font-medium">Larger styling for key concepts</span>
                            </div>
                            <div className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isCentral ? 'bg-green-500' : 'bg-red-500'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform duration-300 ease-in-out ${isCentral ? 'translate-x-5' : ''}`}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-all text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim()}
                            className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl hover:bg-black hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                        >
                            {isEdit ? 'Save Changes' : 'Create Node'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
