import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                noir: {
                    bg: "#030303",
                    card: "#0a0a0a",
                    surface: "#111111",
                    border: "#1a1a1a",
                    muted: "#666666",
                    text: "#e0e0e0",
                },
                neon: {
                    blue: "#3b82f6",
                    purple: "#8b5cf6",
                },
            },
            fontFamily: {
                clash: ["Clash Display", "sans-serif"],
                geist: ["Geist Mono", "monospace"],
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "marquee": "marquee 30s linear infinite",
                "marquee-reverse": "marquee-reverse 30s linear infinite",
                "text-reveal": "text-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
                "cursor-blink": "cursor-blink 1s step-end infinite",
                "noise": "noise 0.5s steps(10) infinite",
                "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "fade-in": "fade-in 0.8s ease forwards",
                "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
                "gradient-shift": "gradient-shift 8s ease infinite",
                "line-grow": "line-grow 1s ease forwards",
            },
            keyframes: {
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "glow-pulse": {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "1" },
                },
                "marquee": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                "text-reveal": {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0%)", opacity: "1" },
                },
                "cursor-blink": {
                    "50%": { opacity: "0" },
                },
                "noise": {
                    "0%": { transform: "translate(0, 0)" },
                    "10%": { transform: "translate(-5%, -10%)" },
                    "20%": { transform: "translate(-15%, 5%)" },
                    "30%": { transform: "translate(7%, -25%)" },
                    "40%": { transform: "translate(-5%, 25%)" },
                    "50%": { transform: "translate(-15%, 10%)" },
                    "60%": { transform: "translate(15%, 0%)" },
                    "70%": { transform: "translate(0, 15%)" },
                    "80%": { transform: "translate(3%, 35%)" },
                    "90%": { transform: "translate(-10%, 10%)" },
                    "100%": { transform: "translate(0, 0)" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(40px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "bounce-gentle": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                "gradient-shift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                "line-grow": {
                    "0%": { scaleY: "0" },
                    "100%": { scaleY: "1" },
                },
            },
            backgroundImage: {
                "gradient-neon": "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                "gradient-neon-r": "linear-gradient(135deg, #8b5cf6, #3b82f6)",
            },
        },
    },
    plugins: [],
};

export default config;
