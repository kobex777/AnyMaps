import { useNavigate } from 'react-router-dom';

export function NewHero() {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col items-center justify-start pt-16 pb-20 px-6 relative overflow-hidden bg-background-light">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-gold/10 blur-[120px] rounded-full animate-ink-bleed"></div>
                <div
                    className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-gold/5 blur-[100px] rounded-full animate-ink-bleed"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>
            <div className="max-w-6xl w-full flex flex-col items-center gap-12 z-10">
                <div className="text-center max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold/40 bg-white/40 backdrop-blur-sm shadow-sm">
                        <span className="size-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#C5A059]"></span>
                        <span className="text-espresso text-xs font-bold uppercase tracking-[0.25em]">The Guild's Register</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-espresso leading-[1.05] drop-shadow-sm">
                        Chart the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold via-gold-dark to-espresso italic pr-2">Uncharted.</span>
                    </h1>
                    <p className="text-espresso/70 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                        Transform complex thoughts into interactive, masterfully crafted mental maps. A guided discovery engine for the modern polymath.
                    </p>
                </div>
                <div className="w-full relative group perspective-1000 mt-6 mb-8">
                    <div className="absolute -inset-2 bg-gradient-to-b from-gold/30 via-transparent to-transparent blur-3xl opacity-30"></div>
                    <div className="relative bg-[#FFFAF0] rounded-[2px] shadow-[0_30px_60px_-15px_rgba(45,36,30,0.15)] border-[8px] border-white ring-1 ring-gold/20 overflow-hidden transform transition-all duration-700 max-w-5xl mx-auto aspect-[16/10] md:aspect-[2/1] min-h-[450px]">
                        <div className="absolute inset-2 border border-gold/20 pointer-events-none z-10"></div>
                        <div className="drafting-grid w-full h-full relative">
                            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start opacity-70 z-20">
                                <span className="material-symbols-outlined text-espresso text-4xl">architecture</span>
                                <div className="text-[10px] text-espresso font-mono uppercase tracking-widest border border-espresso/20 px-3 py-1.5 bg-white shadow-sm">
                                    Fig. 1: Medici Power Dynamics
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-80 md:w-96">
                                <div className="bg-white p-2 shadow-[0_20px_50px_rgba(45,36,30,0.15)] border border-gray-100 transform transition-transform duration-500 hover:scale-[1.02]">
                                    <div
                                        className="h-44 bg-cover bg-center relative overflow-hidden sepia-[0.2]"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJYXCVTkLhD-EiPXIsLBoLxtmdGYMz7E4q8WxhaZF9xP1c0cA4OutJpT07ReJxWbxLrGsnGGDI1GkBcomY64-roNge4yka2_VgPfJG9GT96868Dk_9_yGbvYhVZNrXMbx_rZ6Lo5yGlUuz3mKBT537jubQYhSjRjrSExcXNw289o5Gzp5d2Fl-ilwkfnyHv_ZemsmZsjM0_qLIdGOUuZ8Ud-bI0iC7aDnLiQ7MrS8M2BI3JaIXUQy6vaDUCMSKIl6aj5f0E2luPZI')" }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-5 text-center">
                                            <h3 className="text-2xl font-bold text-white font-serif tracking-wide">The Medici Family</h3>
                                            <div className="w-12 h-[1px] bg-gold mx-auto mt-2"></div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-white text-center">
                                        <p className="text-xs text-espresso/70 font-medium leading-relaxed italic font-serif">
                                            "Banking dynasty and political powerhouse that shaped the Florentine Renaissance."
                                        </p>
                                        <div className="mt-4 flex justify-center gap-2">
                                            <span className="px-3 py-1 bg-[#F5F1E8] text-espresso/80 text-[10px] font-bold uppercase tracking-wider">1397–1494</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                                <defs>
                                    <marker id="arrowhead" markerHeight="7" markerWidth="10" orient="auto" refX="9" refY="3.5">
                                        <polygon fill="#2D241E" points="0 0, 10 3.5, 0 7"></polygon>
                                    </marker>
                                </defs>
                                <path d="M 50% 50% C 35% 50%, 25% 65%, 20% 75%" fill="none" stroke="#2D241E" strokeDasharray="2 4" strokeWidth="1"></path>
                                <path d="M 50% 50% C 65% 50%, 75% 35%, 80% 25%" fill="none" stroke="#2D241E" strokeDasharray="2 4" strokeWidth="1"></path>
                            </svg>
                            <div className="absolute bottom-[10%] left-[5%] md:left-[10%] bg-white p-1 shadow-lg border border-gray-100 w-64 transform transition hover:-translate-y-1 hover:shadow-xl group/node">
                                <div className="flex items-start gap-4 p-3 bg-[#FFFAF0]/50 border border-gold/10">
                                    <div
                                        className="size-12 bg-slate-100 bg-cover shrink-0 grayscale group-hover/node:grayscale-0 transition-all duration-500"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqfdWSuk_yAta7H0D97DH6CrtIR_b9pukEvc8XFQfqgb9IRHBOd3Qg_oVhyi7eEWX74MNrctFXPfpJVHXHr3tuZYwZqiXT28XQUCPD4Gkl7biuhaQtAhnoUadZaAZFSvK_xyBBqOJHoNdeOvRYRx1fwgm_VO9cOIFickbl3rCKTkzJH7aHdbUL6ODCCZ-16QgBCigcaYWeYI2XCvXuniRFXUQTprGtYRII0ARxkxF-uKY4gDpmgHhn2g1tWybhEf-DdVfW7dsGe48')" }}
                                    ></div>
                                    <div>
                                        <h4 className="font-bold text-espresso text-xs font-serif uppercase tracking-tight">Political Influence</h4>
                                        <p className="text-[10px] text-espresso/60 leading-snug mt-1 italic">Control over the Signoria.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-[15%] right-[5%] md:right-[10%] bg-white p-1 shadow-lg border border-gray-100 w-56 text-right transform transition hover:-translate-y-1 hover:shadow-xl group/node">
                                <div className="p-3 bg-[#FFFAF0]/50 border border-gold/10">
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                        <h4 className="font-bold text-espresso text-xs font-serif uppercase tracking-tight">Banking Network</h4>
                                        <span className="material-symbols-outlined text-gold text-sm">account_balance</span>
                                    </div>
                                    <p className="text-[10px] text-espresso/60 leading-snug italic">Branches in Geneva & London.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-2 flex justify-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="relative group flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-pearl text-espresso-light border border-gold/30 shadow-[6px_6px_16px_rgba(62,50,40,0.08),-6px_-6px_16px_rgba(255,255,255,0.8)] hover:shadow-[inset_4px_4px_10px_rgba(62,50,40,0.05),inset_-4px_-4px_10px_rgba(255,255,255,0.9),inset_0_0_20px_rgba(197,160,89,0.1)] active:shadow-[inset_4px_4px_12px_rgba(62,50,40,0.08),inset_-4px_-4px_12px_rgba(255,255,255,0.9)] transition-all duration-300 ease-out transform hover:scale-[0.99] overflow-hidden"
                    >
                        <span className="material-symbols-outlined text-gold text-lg transition-transform group-hover:rotate-12 duration-300">ink_pen</span>
                        <span className="font-display text-sm font-bold uppercase tracking-widest text-espresso-light group-hover:text-espresso transition-colors">
                            Get started for free
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}
