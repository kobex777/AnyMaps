import { usePromptSubmission } from '@/hooks/usePromptSubmission';

interface PromptInputProps {
    onSubmit?: (prompt: string) => void;
    placeholder?: string;
    variant?: 'landing' | 'dashboard';
    value?: string;
    onChange?: (value: string) => void;
}

export function PromptInput({
    onSubmit,
    placeholder = "e.g., Map the industrial revolution's impact on romantic literature...",
    variant = 'landing',
    value: controlledValue,
    onChange: controlledOnChange,
}: PromptInputProps) {
    const { value, handleChange, handleSubmit } = usePromptSubmission({
        onSubmit,
        value: controlledValue,
        onChange: controlledOnChange,
    });

    if (variant === 'dashboard') {
        return (
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 to-primary/30 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                <div className="relative flex items-center bg-espresso-light rounded-lg border border-gold/30 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-gold/20 transition-all">
                    <input
                        className="w-full px-4 py-4 text-sm text-parchment placeholder:text-parchment/30 focus:outline-none border-none bg-transparent"
                        placeholder="Describe your concept or modify the map..."
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                        onClick={handleSubmit}
                        className="p-3 mr-1 text-gold hover:text-white transition-colors"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                        >
                            ink_pen
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group max-w-3xl mx-auto">
            {/* Outer Frame/Container - Pinkish tone with border */}
            <div className="relative p-3 bg-[#FFF0EE] rounded-2xl shadow-[0_4px_30px_rgb(0,0,0,0.03)] transition-all duration-300">

                {/* Inner White Input Area */}
                <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-sm pl-4 pr-2 py-2">

                    {/* Icon */}
                    <div className="flex items-center justify-center text-[#B0A69D] mr-3">
                        <span className="material-symbols-outlined text-[24px]">architecture</span>
                    </div>

                    {/* Input Field */}
                    <div className="flex-1 w-full relative">
                        <input
                            className="w-full py-3 text-lg text-[#5C4F45] placeholder:text-[#A89F95] focus:outline-none border-none bg-transparent font-serif italic tracking-wide"
                            placeholder="Start your schematic: e.g. 'Structure of Gothic Architecture'..."
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        {/* Divider Line */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-[-16px] w-[1px] h-6 bg-[#E0D8D0] hidden md:block"></div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full md:w-auto ml-2 px-6 py-3 bg-[#2E2825] text-[#F0EBE5] font-semibold text-sm tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 hover:bg-[#3E3430] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                        <span>Construct</span>
                        <span className="material-symbols-outlined text-sm">nordic_walking</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
