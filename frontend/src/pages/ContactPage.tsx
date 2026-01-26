import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function ContactPage() {
    return (
        <div className="min-h-screen bg-espresso text-parchment font-display overflow-x-hidden flex flex-col">
            <Navbar variant="landing" />

            <main className="flex-1 pt-32 pb-20 px-6 relative">
                {/* Background ambient effects */}
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#2a211c] to-espresso z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-4 border border-gold/20">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6 leading-tight">
                            Contact Us
                        </h1>
                        <p className="text-lg text-parchment/70 max-w-2xl mx-auto font-light leading-relaxed">
                            Have a question or proposal? Reach out to the architect behind the maps.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-gold/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">

                        <div className="flex-1 space-y-8">
                            <div>
                                <h2 className="text-2xl font-serif text-gold mb-2">Bryan Munguia</h2>
                                <p className="text-parchment/60 uppercase tracking-widest text-xs font-bold">Founder & Lead Developer</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Email</h3>
                                        <a href="mailto:bryanmunguiaramos99@gmail.com" className="text-gold hover:underline break-all">
                                            bryanmunguiaramos99@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="size-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Location</h3>
                                        <p className="text-parchment/80">
                                            Digital Native / Global
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Ornament */}
                        <div className="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-gold/30 to-transparent"></div>

                        <div className="flex-1 space-y-6">
                            <h3 className="text-xl font-serif text-white mb-4">Connect on Social</h3>
                            <div className="flex flex-col gap-4">
                                {/* Placeholders for social links if needed later */}
                                <a href="https://github.com/kobex777" target="_blank" rel="noopener noreferrer" className="w-full bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg flex items-center gap-4 group border border-white/5">
                                    <span className="material-symbols-outlined text-parchment/60 group-hover:text-gold transition-colors">code</span>
                                    <span className="text-parchment/80 group-hover:text-white transition-colors">GitHub</span>
                                </a>
                                <button className="w-full bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg flex items-center gap-4 group border border-white/5">
                                    <span className="material-symbols-outlined text-parchment/60 group-hover:text-gold transition-colors">work</span>
                                    <span className="text-parchment/80 group-hover:text-white transition-colors">LinkedIn</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
