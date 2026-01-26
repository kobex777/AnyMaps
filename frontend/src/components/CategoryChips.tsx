interface CategoryChip {
    icon: string;
    label: string;
}

const CATEGORIES: CategoryChip[] = [
    { icon: 'history_edu', label: 'History' },
    { icon: 'architecture', label: 'Architecture' },
    { icon: 'psychology', label: 'Philosophy' },
    { icon: 'science', label: 'Complexity' },
];

interface CategoryChipsProps {
    onSelect?: (category: string) => void;
}

export function CategoryChips({ onSelect }: CategoryChipsProps) {
    return (
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {CATEGORIES.map((category) => (
                <div
                    key={category.label}
                    onClick={() => onSelect?.(category.label)}
                    className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.9)] hover:shadow-[0_0_80px_rgba(255,255,255,1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <span className="material-symbols-outlined text-gold mb-4 text-3xl group-hover:scale-110 transition-transform duration-300 relative z-10">{category.icon}</span>
                    <p className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-[0.2em] relative z-10">{category.label}</p>
                </div>
            ))}
        </div>
    );
}
