import { useNavigate } from 'react-router-dom';

// Using placeholder images - these should be replaced with local assets
const MEDICI_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJYXCVTkLhD-EiPXIsLBoLxtmdGYMz7E4q8WxhaZF9xP1c0cA4OutJpT07ReJxWbxLrGsnGGDI1GkBcomY64-roNge4yka2_VgPfJG9GT96868Dk_9_yGbvYhVZNrXMbx_rZ6Lo5yGlUuz3mKBT537jubQYhSjRjrSExcXNw289o5Gzp5d2Fl-ilwkfnyHv_ZemsmZsjM0_qLIdGOUuZ8Ud-bI0iC7aDnLiQ7MrS8M2BI3JaIXUQy6vaDUCMSKIl6aj5f0E2luPZI';
const POLITICAL_POWER_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqfdWSuk_yAta7H0D97DH6CrtIR_b9pukEvc8XFQfqgb9IRHBOd3Qg_oVhyi7eEWX74MNrctFXPfpJVHXHr3tuZYwZqiXT28XQUCPD4Gkl7biuhaQtAhnoUadZaAZFSvK_xyBBqOJHoNdeOvRYRx1fwgm_VO9cOIFickbl3rCKTkzJH7aHdbUL6ODCCZ-16QgBCigcaYWeYI2XCvXuniRFXUQTprGtYRII0ARxkxF-uKY4gDpmgHhn2g1tWybhEf-DdVfW7dsGe48';

export function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="hero-pattern min-h-[85vh] flex flex-col items-center justify-center relative px-6 py-12">
            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Interactive Map Preview */}
                <div className="order-2 lg:order-1 relative group">
                    <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition duration-700"></div>
                    <div className="relative bg-white p-2 rounded-xl shadow-2xl border border-gold/30 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                        <div className="drafting-grid rounded-lg p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
                            {/* Central Node Card */}
                            <div className="bg-white p-1 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-primary/20 w-72 z-10">
                                <div
                                    className="h-24 rounded-lg bg-cover bg-center relative overflow-hidden"
                                    style={{ backgroundImage: `url('${MEDICI_IMAGE}')` }}
                                >
                                    <div className="absolute inset-0 bg-primary/10"></div>
                                </div>
                                <div className="p-3">
                                    <h3 className="text-base font-bold text-espresso leading-tight font-serif mb-1">
                                        The Medici Family
                                    </h3>
                                    <p className="text-[10px] text-slate-600 line-clamp-2">
                                        Banking dynasty that shaped the Florentine Renaissance.
                                    </p>
                                </div>
                            </div>

                            {/* Banking Network Node */}
                            <div className="absolute top-12 right-8 bg-white p-3 rounded-lg shadow-lg border-l-4 border-gold w-48 scale-90 opacity-80">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-primary text-sm">account_balance</span>
                                    <h4 className="font-bold text-espresso text-[11px] font-serif uppercase tracking-tight">
                                        Banking Network
                                    </h4>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded"></div>
                            </div>

                            {/* Political Power Node */}
                            <div className="absolute bottom-16 left-8 bg-white p-3 rounded-lg shadow-lg border border-slate-200 w-48 flex items-center gap-3 scale-90 opacity-80">
                                <div
                                    className="size-8 bg-slate-100 rounded-md bg-cover bg-center"
                                    style={{ backgroundImage: `url('${POLITICAL_POWER_IMAGE}')` }}
                                ></div>
                                <h4 className="font-bold text-espresso text-[11px] font-serif uppercase tracking-tight">
                                    Political Power
                                </h4>
                            </div>

                            {/* Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                                <line stroke="#003366" strokeDasharray="4" strokeWidth="2" x1="50%" x2="80%" y1="50%" y2="30%" />
                                <line stroke="#003366" strokeDasharray="4" strokeWidth="2" x1="50%" x2="25%" y1="50%" y2="75%" />
                            </svg>

                            <div className="absolute bottom-4 right-4 text-[10px] text-primary/40 font-bold uppercase tracking-widest italic">
                                Sample: "The Rise of Florence"
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Text Content */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                    <span className="inline-block py-1 px-3 bg-gold/20 text-gold rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        Renaissance Meets Intelligence
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
                        Chart the Uncharted <br />
                        <span className="text-gold italic">Territories of Mind.</span>
                    </h2>
                    <p className="text-parchment text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                        Transform complex thoughts, dense literature, or vast datasets into interactive, masterfully
                        crafted mental maps. Guided by AI, built for scholars and visionaries.
                    </p>
                    <div className="flex flex-col items-center lg:items-start gap-6">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group relative px-8 py-4 bg-gold text-espresso font-bold text-lg rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Start Your Map
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </span>
                        </button>
                        <p className="text-parchment/40 text-xs uppercase tracking-widest">
                            Free to start • No credit card required
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
