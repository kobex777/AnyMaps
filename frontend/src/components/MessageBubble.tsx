export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    suggestions?: string[];
}

interface MessageBubbleProps {
    message: Message;
    userInitials?: string;
    onSuggestionClick?: (suggestion: string) => void;
}

export function MessageBubble({ message, userInitials = 'U', onSuggestionClick }: MessageBubbleProps) {
    const isUser = message.role === 'user';

    if (isUser) {
        return (
            <div className="flex gap-4 flex-row-reverse">
                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md border border-white/10">
                    <span className="text-xs font-bold">{userInitials}</span>
                </div>
                <div className="flex flex-col gap-1 items-end max-w-[85%]">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">You</span>
                    <div className="p-4 bg-primary text-white rounded-2xl rounded-tr-none shadow-md text-sm leading-relaxed border border-white/5">
                        {message.content}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-4">
            <div className="size-8 rounded-full bg-[#4A3B32] text-gold flex items-center justify-center shrink-0 shadow-md border border-gold/10">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
            </div>
            <div className="flex flex-col gap-1 max-w-[85%]">
                <span className="text-xs font-bold text-gold uppercase tracking-wider">AnyMaps AI</span>
                <div
                    className="p-4 bg-espresso-light border border-[#4A3B32] rounded-2xl rounded-tl-none shadow-sm text-sm text-parchment leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                />
                {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex gap-2 mt-1 flex-wrap">
                        {message.suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => onSuggestionClick?.(suggestion)}
                                className="px-3 py-1.5 bg-[#4A3B32] border border-gold/30 text-gold text-xs rounded-full hover:bg-gold/10 transition cursor-pointer"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
