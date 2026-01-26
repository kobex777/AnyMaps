import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-[#1A1512] py-12 px-6 border-t border-[#4A3B32] text-parchment/40 text-sm">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-gold">psychology</span>
                    <span className="font-serif text-white/60">AnyMaps by Bryan Munguia © 2026</span>
                </Link>
                <div className="flex gap-8">
                    <Link to="/privacy" className="hover:text-gold transition-colors cursor-pointer">Privacy</Link>
                    <Link to="/terms" className="hover:text-gold transition-colors cursor-pointer">Terms</Link>
                    <Link to="/documentation" className="hover:text-gold transition-colors cursor-pointer">Documentation</Link>
                    <Link to="/contact" className="hover:text-gold transition-colors cursor-pointer">Contact</Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="size-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
                        <span className="material-symbols-outlined text-sm">share</span>
                    </div>
                    <a href="mailto:bryanmunguiaramos99@gmail.com" className="size-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer">
                        <span className="material-symbols-outlined text-sm">mail</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
