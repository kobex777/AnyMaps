import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
    variant?: 'landing' | 'dashboard';
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 w-full h-20 bg-espresso border-b border-[#4A3B32] z-50 px-6 md:px-12 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="size-10 bg-gold rounded-full flex items-center justify-center text-espresso shadow-lg">
                    <span className="material-symbols-outlined">psychology</span>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-white text-xl font-bold tracking-wide font-serif">AnyMaps</h1>
                    <span className="text-[10px] text-gold uppercase tracking-widest opacity-80">
                        {variant === 'landing' ? 'The Digital Atelier' : 'Atelier'}
                    </span>
                </div>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-parchment text-sm font-medium">
                <Link to="/showcase" className="hover:text-gold transition-colors cursor-pointer">Showcase</Link>
                <Link to="/pricing" className="hover:text-gold transition-colors cursor-pointer">Pricing</Link>
                <button
                    onClick={() => navigate('/signin')}
                    className="bg-gold text-espresso px-5 py-2 rounded-lg font-bold hover:bg-white transition-all"
                >
                    Sign In
                </button>
            </div>
        </nav>
    );
}
