import { useState } from 'react';

export interface ShowcaseItemData {
    id: string;
    title: string;
    description: string;
    type: 'youtube'; // Can be extended to 'local-video' | 'image' later
    src: string; // YouTube URL or ID
    thumbnail?: string;
    duration?: string;
    tags?: string[];
}

interface ShowcaseItemProps {
    item: ShowcaseItemData;
}

export function ShowcaseItem({ item }: ShowcaseItemProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Extract video ID from URL or use as is
    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url;
    };

    const videoId = getYoutubeId(item.src);
    const thumbnailUrl = item.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div className="relative w-full aspect-video bg-black/40 rounded-2xl border border-[#4A3B32] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group mb-16">
            {/* Shimmer effect on border */}
            <div className="absolute inset-0 rounded-2xl border border-gold/10 pointer-events-none z-20"></div>

            {isPlaying ? (
                <iframe
                    className="absolute inset-0 w-full h-full z-10"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <>
                    {/* Thumbnail */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${thumbnailUrl}')` }}
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                    </div>

                    {/* Play Button Area */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="w-24 h-24 bg-gold/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-espresso hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(235,230,210,0.1)] group-hover:shadow-[0_0_60px_rgba(235,230,210,0.3)]"
                        >
                            <span className="material-symbols-outlined text-5xl ml-2">play_arrow</span>
                        </button>
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 flex justify-between items-end">
                        <div>
                            <h3 className="text-white font-bold text-xl mb-1 font-serif">{item.title}</h3>
                            <p className="text-parchment/80 text-sm max-w-xl line-clamp-2 mb-1">{item.description}</p>
                            {item.duration && (
                                <p className="text-parchment/60 text-xs font-mono">Duration: {item.duration}</p>
                            )}
                        </div>

                        {item.tags && (
                            <div className="hidden md:flex gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-black/50 rounded text-xs text-white/70 border border-white/10 uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
