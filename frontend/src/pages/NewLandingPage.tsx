
import { NewNavbar } from '@/components/new-landing/NewNavbar';
import { NewHero } from '@/components/new-landing/NewHero';
import { NewPromptWidget } from '@/components/new-landing/NewPromptWidget';
import { NewGallery } from '@/components/new-landing/NewGallery';
import { NewFooter } from '@/components/new-landing/NewFooter';

export function NewLandingPage() {



    return (
        <div className="font-display text-espresso bg-background-light overflow-x-hidden">
            <NewNavbar />

            <main className="pt-24">
                <NewHero />

                {/* Atelier Input Section */}
                <section className="verdant-gradient text-espresso py-32 px-6 border-t border-gold/30 shadow-[inset_0_10px_30px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25" height="100%" width="100%">
                        <defs>
                            <pattern height="40" id="blueprintGrid" patternUnits="userSpaceOnUse" width="40">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D241E" strokeWidth="0.5"></path>
                            </pattern>
                        </defs>
                        <rect fill="url(#blueprintGrid)" height="100%" width="100%"></rect>
                        <line stroke="#2D241E" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="100%" y1="50%" y2="50%"></line>
                        <line stroke="#2D241E" strokeDasharray="5,5" strokeWidth="1" x1="50%" x2="50%" y1="0" y2="100%"></line>
                        <circle cx="50%" cy="50%" fill="none" r="280" stroke="#2D241E" strokeDasharray="4,8" strokeWidth="0.5"></circle>
                        <circle cx="50%" cy="50%" fill="none" r="350" stroke="#2D241E" strokeOpacity="0.5" strokeWidth="0.5"></circle>
                        <line stroke="#2D241E" strokeWidth="1" x1="45%" x2="45%" y1="48%" y2="52%"></line>
                        <line stroke="#2D241E" strokeWidth="1" x1="55%" x2="55%" y1="48%" y2="52%"></line>
                        <text className="text-[10px] font-mono fill-espresso font-bold" x="48.5%" y="51%">WIDTH: 1000u</text>
                        <text className="text-[10px] font-mono fill-espresso font-bold" style={{ writingMode: 'vertical-rl' }} x="95%" y="45%">ELEVATION A</text>
                    </svg>

                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="size-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-gold/40 mb-2 ring-4 ring-white/10">
                                <span className="material-symbols-outlined text-gold-dark text-xl">architecture</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-espresso text-center italic leading-tight drop-shadow-sm">
                                The Atelier Input
                            </h2>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-espresso/70 font-display">
                                WHERE WILL YOUR CURIOSITY LEAD TODAY?
                            </p>
                        </div>

                        <NewPromptWidget />
                    </div>
                </section>

                <NewGallery />
            </main>

            <NewFooter />
        </div>
    );
}
