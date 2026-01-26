import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
    return (
        <div className="min-h-screen bg-espresso text-parchment font-display overflow-x-hidden flex flex-col">
            <Navbar variant="landing" />

            <main className="flex-1 pt-32 pb-20 px-6 relative">
                {/* Background ambient effects */}
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#2a211c] to-espresso z-0"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-4 border border-gold/20">
                            Legal
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6 leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-parchment/70 max-w-2xl mx-auto font-light leading-relaxed">
                            Your thoughts are your own. We build the maps, but you own the territory.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-gold/10 p-8 md:p-12 shadow-2xl space-y-8">
                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">1. Data Collection</h2>
                            <p className="text-parchment/80 leading-relaxed mb-4">
                                At AnyMaps, we believe in the sanctity of your intellectual property. We collect only what is strictly necessary to render your maps and improve the cartography engine.
                            </p>
                            <ul className="list-disc list-inside text-parchment/60 space-y-2 ml-4">
                                <li>Account information (email, preferences)</li>
                                <li>Map data strictly for rendering and persistence</li>
                                <li>Usage metrics to improve system performance</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">2. AI Processing</h2>
                            <p className="text-parchment/80 leading-relaxed">
                                Our AI cartographer processes your prompts to generate structures. This data is transmitted securely and is not used to train public models without your explicit consent. We treat your inputs as confidential blueprints.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">3. Data Retention</h2>
                            <p className="text-parchment/80 leading-relaxed">
                                You have the right to burn your maps. When you delete a project, it is erased from our servers. We do not maintain shadow copies of deleted intellectual work.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">4. Cookies & Local Storage</h2>
                            <p className="text-parchment/80 leading-relaxed">
                                We use local storage to maintain your session and preferences. No third-party tracking cookies are used to follow you across the digital seas.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-white/10 text-center">
                            <p className="text-parchment/40 text-sm">
                                Last Updated: January 2026
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
