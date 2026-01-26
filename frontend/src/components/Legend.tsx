export function Legend() {
    return (
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur border border-gold/30 p-4 rounded-lg shadow-lg max-w-xs">
            <h5 className="text-xs font-bold text-espresso uppercase tracking-wider mb-2 border-b border-gold/20 pb-1 font-display">
                Legend
            </h5>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs text-slate-600 font-display">Primary Concepts</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-gold bg-white"></div>
                    <span className="text-xs text-slate-600 font-display">Secondary Entities</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-px bg-primary/40 border-t border-dashed border-primary"></div>
                    <span className="text-xs text-slate-600 font-display">Inferential Link</span>
                </div>
            </div>
        </div>
    );
}
