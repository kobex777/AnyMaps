import { Link } from 'react-router-dom';

export function NewFooter() {
    return (
        <footer className="bg-espresso py-12 px-6 border-t border-gold/20 text-parchment/60 text-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30"></div>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
                        <span className="material-symbols-outlined text-gold text-sm">psychology</span>
                    </div>
                    <span className="font-serif text-parchment tracking-wide">AnyMaps by Bryan Munguia © 2026</span>
                </div>
                <div className="flex gap-8 font-medium">
                    <Link to="/privacy" className="hover:text-gold transition-colors cursor-pointer">Privacy</Link>
                    <Link to="/terms" className="hover:text-gold transition-colors cursor-pointer">Terms</Link>
                    <Link to="/documentation" className="hover:text-gold transition-colors cursor-pointer">Documentation</Link>
                    <Link to="/contact" className="hover:text-gold transition-colors cursor-pointer">Contact</Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-espresso cursor-pointer transition-all duration-300">
                        <span className="material-symbols-outlined text-sm">share</span>
                    </div>
                    <a href="mailto:bryanmunguiaramos99@gmail.com" className="size-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-espresso cursor-pointer transition-all duration-300">
                        <span className="material-symbols-outlined text-sm">mail</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
