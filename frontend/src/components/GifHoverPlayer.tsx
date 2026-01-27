import { useState, useEffect } from 'react';

interface GifHoverPlayerProps {
    src: string;
    alt: string;
    className?: string;
}

export function GifHoverPlayer({ src, alt, className }: GifHoverPlayerProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [staticSrc, setStaticSrc] = useState<string | null>(null);


    useEffect(() => {
        // Generate static frame
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Draw the image to canvas to capture a frame
                ctx.drawImage(img, 0, 0);
                try {
                    const dataUrl = canvas.toDataURL('image/png');
                    setStaticSrc(dataUrl);
                } catch (e) {
                    console.warn("Could not generate static preview for GIF", e);
                    // Fallback to original src if canvas fails (e.g. CORS)
                    setStaticSrc(src);
                }
            }
        };
    }, [src]);

    return (
        <div
            className={`relative overflow-hidden ${className || ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={isHovered ? src : (staticSrc || src)}
                alt={alt}
                className="w-full h-full object-cover"
                style={{
                    // Ensure transition is smooth if needed, though swapping src usually snaps
                    opacity: 1
                }}
            />
            {/* Optional visual cue that it's playable */}
            {!isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                    {/* You could add a play icon here if requested, but for now keeping it clean */}
                </div>
            )}
        </div>
    );
}
