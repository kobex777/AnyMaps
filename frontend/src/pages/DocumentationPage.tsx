import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function DocumentationPage() {
    return (
        <div className="min-h-screen bg-espresso text-parchment font-display overflow-x-hidden flex flex-col">
            <Navbar variant="landing" />

            <main className="flex-1 pt-32 pb-20 px-6 relative">
                {/* Background ambient effects */}
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#2a211c] to-espresso z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-4 border border-gold/20">
                            Knowledge Base
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6 leading-tight">
                            Documentation
                        </h1>
                        <p className="text-lg text-parchment/70 max-w-2xl mx-auto font-light leading-relaxed">
                            A cartographer's guide to navigating the latent space.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-gold/10 p-8 md:p-12 shadow-2xl space-y-12">
                        {/* Getting Started */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif text-gold flex items-center gap-3">
                                <span className="material-symbols-outlined text-3xl opacity-80">play_circle</span>
                                Getting Started
                            </h2>
                            <p className="text-parchment/80 leading-relaxed">
                                Welcome to AnyMaps. To begin, simply enter a topic or concept into the Atelier input. Our AI will decompose your thought into its constituent parts, creating a visual map of nodes and connections.
                            </p>
                            <div className="bg-black/30 p-4 rounded-lg border border-white/5 font-mono text-sm text-gold/80">
                                Try prompt: "The evolution of jazz music from 1920 to 1960"
                            </div>
                        </section>

                        <hr className="border-white/5" />

                        {/* Formatting */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif text-gold flex items-center gap-3">
                                <span className="material-symbols-outlined text-3xl opacity-80">format_paint</span>
                                Node Formatting
                            </h2>
                            <p className="text-parchment/80 leading-relaxed">
                                You can customize nodes using standard Markdown syntax in the chat panel.
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="bg-white/5 p-4 rounded border border-white/5">
                                    <strong className="text-white block mb-1">Bold Text</strong>
                                    <code className="bg-black/20 px-1 rounded text-gold/60">**text**</code>
                                </li>
                                <li className="bg-white/5 p-4 rounded border border-white/5">
                                    <strong className="text-white block mb-1">Italic Text</strong>
                                    <code className="bg-black/20 px-1 rounded text-gold/60">*text*</code>
                                </li>
                            </ul>
                        </section>

                        <hr className="border-white/5" />

                        {/* Exporting */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif text-gold flex items-center gap-3">
                                <span className="material-symbols-outlined text-3xl opacity-80">download</span>
                                Exporting Your Maps
                            </h2>
                            <p className="text-parchment/80 leading-relaxed">
                                Once your map is complete, use the export tools in the top right corner of the dashboard to save your work as a high-resolution image or JSON data structure.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-white/10 text-center">
                            <p className="text-parchment/40 text-sm">
                                Need more help? <a href="mailto:support@anymaps.com" className="text-gold hover:underline">Contact Support</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
