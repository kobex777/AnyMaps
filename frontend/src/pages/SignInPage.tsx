import { NewNavbar } from '@/components/new-landing/NewNavbar';
import { NewFooter } from '@/components/new-landing/NewFooter';

export function SignInPage() {
    return (
        <div className="font-display text-espresso bg-background-light overflow-x-hidden min-h-screen flex flex-col">
            <NewNavbar />

            <main className="flex-1 pt-24 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold/40 bg-white/40 backdrop-blur-sm shadow-sm mb-8">
                        <span className="size-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#C5A059]"></span>
                        <span className="text-espresso text-xs font-bold uppercase tracking-[0.25em]">Public Access</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif text-espresso leading-[1.05] drop-shadow-sm mb-8">
                        Public <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold via-gold-dark to-espresso italic">Demonstration</span>
                    </h1>

                    <p className="text-2xl md:text-3xl font-light text-espresso/80 font-serif italic mb-12">
                        No sign in required.
                    </p>

                    <p className="text-espresso/60 text-lg max-w-2xl mx-auto leading-relaxed">
                        The Atelier is currently open for public preview. You may freely access all tools and features without an account.
                    </p>
                </div>
            </main>

            <NewFooter />
        </div>
    );
}
