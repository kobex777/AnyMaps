import { useAppStore } from '@/store/useAppStore';
import { MessageBubble, type Message } from './MessageBubble';
import { PromptInput } from './PromptInput';
import { cn } from '../lib/utils';

interface ChatPanelProps {
    messages: Message[];
    onSendMessage?: (message: string) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function ChatPanel({ messages, onSendMessage, isOpen, onToggle }: ChatPanelProps) {
    const chatInputValue = useAppStore((state) => state.chatInputValue);
    const setChatInputValue = useAppStore((state) => state.setChatInputValue);

    const handleSuggestionClick = (suggestion: string) => {
        setChatInputValue(suggestion);
    };

    return (
        <section className={cn(
            "absolute top-0 bottom-0 left-0 w-[400px] flex flex-col border-r border-[#4A3B32] bg-espresso z-30 shadow-lg hidden lg:flex transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            {/* Close Toggle Button - Attached to right side of chat */}
            <button
                onClick={onToggle}
                className="absolute -right-5 top-1/2 -translate-y-1/2 h-24 w-5 bg-espresso border border-l-0 border-[#4A3B32] text-gold rounded-r-lg shadow-lg flex items-center justify-center hover:bg-[#4A3B32] hover:text-white transition-all z-50 cursor-pointer"
                title="Close Atelier"
            >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>

            {/* Header */}
            <div className="h-16 border-b border-[#4A3B32] flex items-center px-6 justify-between bg-espresso/90 backdrop-blur-sm">
                <h2 className="text-parchment font-bold text-lg tracking-tight">The Atelier</h2>
                <button className="text-gold hover:text-white transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-dark bg-espresso/50">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        userInitials="IV"
                        onSuggestionClick={handleSuggestionClick}
                    />
                ))}
            </div>

            {/* Input */}
            <div className="p-6 pt-2 bg-gradient-to-t from-espresso via-espresso to-transparent">
                <PromptInput
                    variant="dashboard"
                    onSubmit={onSendMessage}
                    value={chatInputValue}
                    onChange={setChatInputValue}
                    placeholder="Describe your concept or modify the map..."
                />
                <p className="text-center text-[10px] text-parchment/40 mt-2 tracking-wide uppercase">
                    AI-Assisted Cartography
                </p>
            </div>
        </section>
    );
}
