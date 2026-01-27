import { useNavigate } from 'react-router-dom';
import mindMapGif from '../../assets/gifs/Second gif.gif';
import aiLayoutGif from '../../assets/gifs/Ai Layout gif.gif';
import { GifHoverPlayer } from '../GifHoverPlayer';


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
                <div className="w-full relative mt-6 mb-8 max-w-6xl mx-auto">
                    <div className="absolute -inset-2 bg-gradient-to-b from-gold/30 via-transparent to-transparent blur-3xl opacity-30"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-start">
                        {/* Left Card */}
                        <div className="flex flex-col gap-6 group/card">
                            <div className="flex items-center gap-3">
                                <span className="bg-gold/10 p-2 rounded-lg text-gold">
                                    <span className="material-symbols-outlined text-xl">psychology</span>
                                </span>
                                <h3 className="text-2xl font-serif text-espresso">Mind Map AI</h3>
                            </div>

                            <div
                                onClick={() => navigate('/dashboard')}
                                className="relative group perspective-1000 cursor-pointer"
                            >
                                <div className="relative bg-[#FFFAF0] rounded-[2px] shadow-[0_30px_60px_-15px_rgba(45,36,30,0.15)] border-[8px] border-white ring-1 ring-gold/20 overflow-hidden transform transition-all duration-700 aspect-[4/5] md:aspect-[3/4] lg:aspect-square w-full h-full min-h-[350px]">
                                    <div className="absolute inset-2 border border-gold/20 pointer-events-none z-10"></div>
                                    <GifHoverPlayer
                                        src={mindMapGif}
                                        alt="Mind Map Demo Left"
                                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-espresso/70 font-light leading-relaxed">
                                    Brainstorm new ideas and summarize information with AI-powered assistance.
                                </p>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-sm group-hover/card:translate-x-1 transition-transform"
                                >
                                    Explore Feature <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="flex flex-col gap-6 group/card">
                            <div className="flex items-center gap-3">
                                <span className="bg-gold/10 p-2 rounded-lg text-gold">
                                    <span className="material-symbols-outlined text-xl">auto_fix</span>
                                </span>
                                <h3 className="text-2xl font-serif text-espresso">Auto-Layout</h3>
                            </div>

                            <div
                                onClick={() => navigate('/dashboard')}
                                className="relative group perspective-1000 cursor-pointer"
                            >
                                <div className="relative bg-[#FFFAF0] rounded-[2px] shadow-[0_30px_60px_-15px_rgba(45,36,30,0.15)] border-[8px] border-white ring-1 ring-gold/20 overflow-hidden transform transition-all duration-700 aspect-[4/5] md:aspect-[3/4] lg:aspect-square w-full h-full min-h-[350px]">
                                    <div className="absolute inset-2 border border-gold/20 pointer-events-none z-10"></div>
                                    <GifHoverPlayer
                                        src={aiLayoutGif}
                                        alt="Auto-Layout Demo"
                                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-espresso/70 font-light leading-relaxed">
                                    Automatically organize complex nodes into clear, logical structures.
                                </p>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-sm group-hover/card:translate-x-1 transition-transform"
                                >
                                    Explore Feature <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
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
