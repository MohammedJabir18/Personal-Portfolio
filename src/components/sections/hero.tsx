"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import Typewriter from "@/components/ui/typewriter";
import { ChevronDown, ArrowRight, ScanFace } from "lucide-react";
import ScrollImageSequence from "@/components/ui/scroll-image-sequence";

// Generate image paths
const frameCount = 75;
const images = Array.from({ length: frameCount }, (_, i) => {
    const paddedIndex = (i + 1).toString().padStart(3, "0");
    return `/scroll-sequence/ezgif-frame-${paddedIndex}.jpg`;
});

// Subtle floating particles for depth (kept from previous design, reduced count)
function FloatingParticles() {
    return (
        <div className="absolute inset-0 z-20 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/30 blur-[1px]"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: Math.random() * 0.5 + 0.2,
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 3 + 1 + "px",
                        height: Math.random() * 3 + 1 + "px",
                    }}
                />
            ))}
        </div>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- CORNER REVEAL ANIMATIONS (0% -> 10% scroll) ---
    // Slide IN from corners as user starts scrolling.

    // Top-Left (Name)
    const tlX = useTransform(scrollYProgress, [0, 0.1], [-200, 0]);
    const tlOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // Top-Right (Status)
    const trX = useTransform(scrollYProgress, [0, 0.1], [200, 0]);
    const trOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // Bottom-Left (Role)
    const blY = useTransform(scrollYProgress, [0, 0.1], [100, 0]);
    const blOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // Bottom-Right (CTA)
    const brY = useTransform(scrollYProgress, [0, 0.1], [100, 0]);
    const brOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // Cinematic Vignette - Clearer in center
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 0.2]); // Fades out a bit but stays for contrast

    return (
        <section ref={containerRef} className="relative h-[350vh]">
            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* 1. IMAGE SEQUENCE BACKGROUND */}
                <div className="absolute inset-0 z-0">
                    <ScrollImageSequence images={images} containerRef={containerRef} />
                </div>

                {/* 2. OVERLAYS */}
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-[5] noise-overlay mix-blend-overlay" />

                {/* Vignette - dynamic */}
                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="absolute inset-0 bg-radial-gradient from-transparent via-noir-bg/30 to-noir-bg/90 z-[1] pointer-events-none"
                />

                {/* Particles */}
                <FloatingParticles />

                {/* 3. CORNER UI ELEMENTS */}
                <div className="relative z-50 h-full w-full p-6 md:p-12 lg:p-16 flex flex-col justify-between pointer-events-none">

                    {/* TOP ROW */}
                    <div className="flex justify-between items-start">
                        {/* TOP-LEFT: Brand / Name */}
                        <motion.div
                            style={{ x: tlX, opacity: tlOpacity }}
                            className="pointer-events-auto mix-blend-difference"
                        >
                            <h1 className="font-clash font-bold text-4xl md:text-6xl tracking-tighter text-white leading-[0.9]">
                                MOHAMMED<br />
                                <span className="text-white/50">JABIR.</span>
                            </h1>
                        </motion.div>

                        {/* TOP-RIGHT: Status Badge */}
                        <motion.div
                            style={{ x: trX, opacity: trOpacity }}
                            className="pointer-events-auto"
                        >
                            <div className="flex flex-col items-end gap-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-[10px] font-geist tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                                    System Online
                                </div>
                                <span className="text-[10px] text-white/40 font-geist tracking-widest uppercase text-right leading-tight hidden md:block">
                                    Loc: Kerala, IN<br />
                                    Lat: 10.8505° N
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* BOTTOM ROW */}
                    <div className="flex justify-between items-end">
                        {/* BOTTOM-LEFT: Role / Typewriter */}
                        <motion.div
                            style={{ y: blY, opacity: blOpacity }}
                            className="pointer-events-auto mix-blend-difference max-w-[300px] md:max-w-md"
                        >
                            <div className="text-white/80 text-sm md:text-lg font-geist tracking-wide">
                                <Typewriter
                                    strings={[
                                        "Architecting Digital Reality",
                                        "Engineering The Impossible",
                                        "AI & Automation Specialist",
                                    ]}
                                    loop={true}
                                    cursor="_"
                                    typingSpeed={50}
                                />
                            </div>
                        </motion.div>

                        {/* BOTTOM-RIGHT: CTA */}
                        <motion.div
                            style={{ y: brY, opacity: brOpacity }}
                            className="pointer-events-auto"
                        >
                            <button
                                onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                                className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-geist text-xs md:text-sm font-semibold tracking-widest uppercase overflow-hidden hover:scale-105 transition-transform duration-500 flex items-center gap-2"
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Sequence</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            </button>
                        </motion.div>
                    </div>

                </div>

                {/* SCROLL PROMPT (Center Bottom - Fades out immediately) */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-white/50 mix-blend-difference"
                >
                    <span className="text-[10px] font-geist tracking-[0.3em] uppercase">Initialize</span>
                    <ScanFace className="w-4 h-4 animate-pulse opacity-50" />
                </motion.div>
            </div>
        </section>
    );
}
