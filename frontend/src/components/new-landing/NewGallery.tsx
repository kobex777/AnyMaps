import { useState, useRef, useEffect } from 'react';
import { GALLERY_ITEMS } from '@/data/gallery';

export function NewGallery() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 0 }); // Start with 0 width until measured
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const filters = ['All', 'History', 'Science', 'Philosophy', 'Art'];

    useEffect(() => {
        const activeIndex = filters.indexOf(activeFilter);
        const activeTab = tabsRef.current[activeIndex];

        if (activeTab) {
            setIndicatorStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth
            });
        }
    }, [activeFilter]);

    // Filter items based on the active category
    const filteredItems = activeFilter === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.categories.includes(activeFilter));

    return (
        <section className="py-32 bg-pearl text-espresso px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-gold/20 pb-8">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-serif text-espresso mb-3">The Gallery of Thought</h3>
                        <p className="text-espresso/60 font-display font-light text-lg">Masterpieces of cognitive architecture.</p>
                    </div>
                    <button className="text-espresso font-bold font-display text-sm uppercase tracking-widest flex items-center gap-2 hover:text-gold-dark transition-colors group border-b border-transparent hover:border-gold pb-1">
                        View Full Gallery
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                    </button>
                </div>
                <div className="flex justify-center md:justify-start mb-24">
                    <div className="relative flex items-center gap-2 bg-pearl/60 backdrop-blur-md p-1 rounded-full border border-pearl-dark shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-espresso/50 px-3 font-display relative z-10">Filter By:</span>

                        {/* Sliding Indicator */}
                        <div
                            className="absolute top-1 bottom-1 bg-pearl rounded-full shadow-[0_2px_8px_rgba(45,36,30,0.05)] border border-gold/20 transition-all duration-300 ease-in-out z-0"
                            style={{
                                left: indicatorStyle.left,
                                width: indicatorStyle.width
                            }}
                        />

                        {filters.map((filter, idx) => (
                            <button
                                key={filter}
                                ref={el => { tabsRef.current[idx] = el }}
                                onClick={() => setActiveFilter(filter)}
                                className={`
                                    relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide font-display transition-colors duration-300
                                    ${activeFilter === filter ? 'text-espresso' : 'text-espresso/60 hover:text-espresso'}
                                `}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {filteredItems.map((item) => (
                        <div key={item.id} className={`group relative h-[550px] w-full bg-espresso rounded-lg overflow-hidden shadow-2xl ${item.className}`}>
                            <img
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                src={item.image}
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-white/10 backdrop-blur-lg border-t border-white/20 p-6 transition-all duration-700 ease-in-out translate-y-0 group-hover:translate-y-full">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gold mb-1">{item.label}</span>
                                    <h4 className="font-display font-semibold text-xl text-white tracking-wide">{item.title}</h4>
                                    <p className="font-display text-sm text-white/80 font-light leading-relaxed mt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredItems.length === 0 && (
                        <div className="col-span-3 flex justify-center items-center h-64 text-espresso/40 italic font-serif">
                            No articles found for this category.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
