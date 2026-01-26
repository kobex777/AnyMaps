import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function TermsPage() {
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
                            Terms of Service
                        </h1>
                        <p className="text-lg text-parchment/70 max-w-2xl mx-auto font-light leading-relaxed">
                            The rules of engagement for the digital frontier.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-gold/10 p-8 md:p-12 shadow-2xl space-y-8">
                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-parchment/80 leading-relaxed">
                                By accessing AnyMaps, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">2. Use of License</h2>
                            <p className="text-parchment/80 leading-relaxed mb-4">
                                Permission is granted to temporarily download one copy of the materials (information or software) on AnyMaps for personal, non-commercial transitory viewing only.
                            </p>
                            <ul className="list-disc list-inside text-parchment/60 space-y-2 ml-4">
                                <li>Modify or copy the materials;</li>
                                <li>Use the materials for any commercial purpose;</li>
                                <li>Attempt to decompile or reverse engineer any software;</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">3. Disclaimer</h2>
                            <p className="text-parchment/80 leading-relaxed">
                                The materials on AnyMaps are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif text-gold mb-4">4. Limitations</h2>
                            <p className="text-parchment/80 leading-relaxed">
                                In no event shall AnyMaps or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AnyMaps.
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
