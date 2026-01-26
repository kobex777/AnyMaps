/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#003366", // Medici Blue
                "background-light": "#FFFAF0", // Brighter Ivory
                "background-dark": "#0f1923",
                "espresso": "#2D241E", // Deep Espresso
                "espresso-light": "#3E3228", // Lighter Espresso
                "gold": "#C5A059", // Venetian Gold
                "gold-dark": "#9E7E3C",
                "parchment": "#DBCBB6", // Text color for dark backgrounds
                "verdant-start": "#dcebd5", // Light sage green
                "verdant-mid": "#8ebfab", // Muted teal
                "verdant-end": "#f3eecf", // Soft cream/yellowish
                "pearl": "#FFF5F5", // Warm white with subtle pink
                "pearl-dark": "#F5E6E6", // Slightly darker pearl for borders
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            animation: {
                'ink-bleed': 'ink-bleed 3s ease-out forwards',
                'aurora': 'aurora 15s ease infinite alternate',
            },
            keyframes: {
                'ink-bleed': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'aurora': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                }
            }
        },
    },
    plugins: [],
}
