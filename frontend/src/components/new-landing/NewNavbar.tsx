import { useNavigate } from 'react-router-dom';

export function NewNavbar() {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 w-full h-24 bg-background-light/95 backdrop-blur-md border-b border-gold/30 z-50 px-6 md:px-12 flex items-center justify-between transition-all duration-300 shadow-sm">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                <div className="size-12 bg-espresso rounded-full flex items-center justify-center text-gold shadow-lg border border-gold/50">
                    <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-espresso text-2xl font-bold tracking-wide font-serif">AnyMaps</h1>
                    <span className="text-[10px] text-gold-dark uppercase tracking-[0.2em] font-medium">The Digital Atelier</span>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-10 text-espresso text-sm font-medium">
                <a onClick={() => navigate('/showcase')} className="flex items-center gap-2 hover:text-gold-dark transition-colors group cursor-pointer">
                    <span className="material-symbols-outlined text-gold group-hover:scale-110 transition-transform text-lg">explore</span>
                    <span>Showcase</span>
                </a>

                <a onClick={() => navigate('/pricing')} className="flex items-center gap-2 hover:text-gold-dark transition-colors group cursor-pointer">
                    <span className="material-symbols-outlined text-gold group-hover:scale-110 transition-transform text-lg">diamond</span>
                    <span>Pricing</span>
                </a>
                <button
                    onClick={() => navigate('/signin')}
                    className="bg-espresso text-gold px-6 py-2.5 rounded-lg font-bold font-serif tracking-wide hover:bg-espresso-light transition-all shadow-[0_4px_15px_rgba(45,36,30,0.3)] border border-gold/30"
                >
                    Sign In
                </button>
            </div>
        </nav>
    );
}
