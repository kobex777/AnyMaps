import { useEffect, useRef } from 'react';
import { usePromptSubmission } from '@/hooks/usePromptSubmission';

interface NewPromptWidgetProps {
    onSubmit?: (prompt: string) => void;
    placeholder?: string;
}

export function NewPromptWidget({
    onSubmit,
    placeholder = "Start your schematic: e.g. 'Structure of Gothic Architecture'...",
}: NewPromptWidgetProps) {
    const { value, handleChange, handleSubmit } = usePromptSubmission({ onSubmit });

    const typingIntervalRef = useRef<number | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        };
    }, []);

    const simulateTyping = (text: string) => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
        }

        if (!text) {
            handleChange('');
            return;
        }

        // Start immediately with the first character so placeholder doesn't flash
        let currentText = text.charAt(0);
        handleChange(currentText);

        let index = 1;
        typingIntervalRef.current = window.setInterval(() => {
            if (index < text.length) {
                currentText += text.charAt(index);
                handleChange(currentText);
                index++;
            } else {
                if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                typingIntervalRef.current = null;
            }
        }, 30); // Fast typing speed
    };

    return (
        <div className="w-full relative group max-w-3xl mt-6">
            <div className="relative p-[4px] rounded-xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.1)] bg-[linear-gradient(145deg,#F5E6E6_0%,#FFF5F5_45%,#F5E6E6_100%)]">
                <div className="bg-pearl p-2.5 rounded-[9px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>
                    <div className="bg-[#FFFBF2] rounded-md shadow-inner flex items-center gap-3 p-1.5 relative z-10">
                        <div className="pl-3 hidden md:flex items-center justify-center border-r border-espresso/10 pr-3">
                            <span className="material-symbols-outlined text-espresso/50 text-2xl">history_edu</span>
                        </div>
                        <input
                            className="flex-1 bg-transparent border-none text-espresso placeholder-espresso/40 text-lg md:text-xl focus:ring-0 focus:outline-none h-14 w-full font-serif italic"
                            placeholder={placeholder}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-espresso hover:bg-espresso-light text-gold font-bold py-3 px-6 rounded-md transition-all flex items-center gap-2 shadow-lg shrink-0 border border-gold/20 group/btn overflow-hidden relative"
                        >
                            <span className="relative z-10">Construct</span>
                            <span className="material-symbols-outlined text-sm font-bold relative z-10 group-hover/btn:rotate-90 transition-transform">architecture</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-8">
                {[
                    { icon: 'history_edu', label: 'History' },
                    { icon: 'architecture', label: 'Architecture' },
                    { icon: 'psychology', label: 'Philosophy' },
                    { icon: 'science', label: 'Science' }
                ].map((cat) => (
                    <button
                        key={cat.label}
                        onClick={() => simulateTyping(cat.label)}
                        className="relative group flex flex-col items-center justify-center h-32 md:h-40 rounded-2xl bg-white border-2 border-white shadow-[0_0_30px_-5px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.6)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,1),0_0_80px_rgba(255,255,255,0.8)] hover:scale-[1.02] transition-all duration-500 ease-out z-10"
                    >
                        <span className="material-symbols-outlined text-gold-dark text-4xl mb-3 font-[100] group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{cat.icon}</span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-espresso/80 font-display group-hover:text-espresso transition-colors">{cat.label}</span>
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/10 pointer-events-none transition-colors duration-300"></div>
                    </button>
                ))}
            </div>
        </div>
    );
}
