"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useVelocity, AnimatePresence } from "framer-motion";
import Typewriter from "@/components/ui/typewriter";
import { ChevronDown, ArrowRight, ScanFace, Volume2, VolumeX } from "lucide-react";
import ScrollImageSequence from "@/components/ui/scroll-image-sequence";

import { generateImagePaths } from "@/lib/utils";

// Generate image paths
const frameCount = 160;
const images = generateImagePaths(frameCount, "/new-sequence/ezgif-frame-");

// Pre-computed particle positions (avoids Math.random() in render / hydration mismatch)
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    x: `${(i * 7 + 13) % 100}%`,
    y: `${(i * 11 + 7) % 100}%`,
    scale: 0.5 + ((i * 3) % 5) / 10,
    opacity: 0.2 + ((i * 7) % 5) / 10,
    yEnd: -((i * 13) % 100),
    duration: 20 + ((i * 7) % 10),
    width: `${1 + ((i * 3) % 3)}px`,
    height: `${1 + ((i * 5) % 3)}px`,
}));

function FloatingParticles() {
    return (
        <div className="absolute inset-0 z-20 pointer-events-none">
            {PARTICLES.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/30 blur-[1px]"
                    initial={{
                        x: p.x,
                        y: p.y,
                        scale: p.scale,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [null, p.yEnd],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: p.width,
                        height: p.height,
                    }}
                />
            ))}
        </div>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- AUDIO HANDLING ---
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            // Attempt auto-play
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Auto-play started
                        setIsMuted(false);
                    })
                    .catch(() => {
                        // Auto-play was prevented
                        setIsMuted(true);
                    });
            }
        }
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.play().catch((e) => console.log("Playback failed", e));
                setIsMuted(false);
            } else {
                audioRef.current.pause();
                setIsMuted(true);
            }
        }
    };

    // --- VELOCITY & SKEW EFFECT ---
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Skew and Rotate based on velocity for "Warp Speed" feel
    const skewX = useTransform(smoothVelocity, [-1000, 1000], [-20, 20]);
    const rotate = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);


    // --- PARALLAX TEXT MOVEMENT ---
    // Move slightly LEFT/UP as we scroll to clear the center completely
    // Since it's on the Left, moving Left (negative x) will move it off-screen, away from center.
    const xLine1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const xLine2 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]); // Moves faster to separate


    // --- OPACITY & BLUR ---
    // Fade out as we scroll down
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.3], ["0px", "20px"]);

    // Cinematic Vignette
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0.8]);

    // --- SCROLL-END QUOTE REVEAL ---
    // --- SCROLL-END QUOTE REVEAL ---
    // Start VERY early (0.6) and finish by 0.9 to guarantee visibility
    const quoteOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
    const quoteY = useTransform(scrollYProgress, [0.6, 0.9], ["20px", "0px"]);
    const quoteScale = useTransform(scrollYProgress, [0.6, 0.9], [0.9, 1]);

    return (
        <section id="hero" ref={containerRef} className="relative h-[640vh] bg-black">
            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

                {/* 1. BACKGROUND LAYERS */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <ScrollImageSequence images={images} containerRef={containerRef} />
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
                    <motion.div
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-radial-gradient from-transparent to-black z-[1]"
                    />
                    {/* Noise Texture */}

                    <FloatingParticles />
                </div>

                {/* 2. HERO TEXT - VELOCITY PARALLAX - TOP LEFT */}
                {/* Changed items-end -> items-start, pr-6 -> pl-6, text-right -> text-left */}
                <div className="relative z-10 w-full h-full flex flex-row gap-3 items-end justify-center pb-32 md:flex-col md:gap-0 md:pb-0 md:items-start md:justify-start md:pt-32 md:pl-12 lg:pl-16 mix-blend-difference overflow-hidden perspective-[1000px]">

                    {/* MOHAMMED */}
                    <motion.h1
                        style={{ x: xLine1, skewX, rotate, opacity, filter: useMotionTemplate`blur(${blur})` }}
                        className="text-3xl md:text-[3rem] font-clash font-bold text-white leading-[0.9] tracking-tighter whitespace-nowrap origin-center md:origin-left text-center md:text-left w-fit"
                    >
                        MOHAMMED
                    </motion.h1>

                    {/* JABIR */}
                    <motion.h1
                        style={{ x: xLine2, skewX, rotate, opacity, filter: useMotionTemplate`blur(${blur})` }}
                        className="text-3xl md:text-[3rem] font-clash font-bold text-white/60 leading-[0.9] tracking-tighter whitespace-nowrap origin-center md:origin-left text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 w-fit"
                    >
                        JABIR
                    </motion.h1>

                </div>

                {/* 2.5 SCROLL-END QUOTE - CENTERED BOTTOM */}
                <motion.div
                    style={{ opacity: quoteOpacity, y: quoteY, scale: quoteScale }}
                    className="absolute inset-0 z-[100] flex flex-col items-center justify-end pb-32 md:pb-48 pointer-events-none"
                >
                    <span className="text-xs md:text-sm font-geist tracking-[0.5em] text-white/80 mb-2 uppercase">Crafting</span>
                    <h2 className="text-4xl md:text-6xl font-clash font-bold text-white/20 [-webkit-text-stroke:1px_white] leading-[0.9] tracking-tighter text-center">
                        DIGITAL
                    </h2>
                    <h2 className="text-4xl md:text-6xl font-clash font-bold text-white leading-[0.9] tracking-tighter text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                        PERFECTION
                    </h2>
                </motion.div>

                {/* 3. CORNER UI ELEMENTS (Static/Fade) */}
                <div className="absolute inset-0 z-50 p-6 md:p-12 lg:p-16 flex flex-col justify-between pointer-events-none mix-blend-difference">
                    {/* TOP ROW */}
                    <div className="flex justify-between items-start w-full">
                        {/* LEFT - Empty */}
                        <div />

                        {/* RIGHT - Location (Moved here) */}
                        <div className="flex flex-col gap-1 items-end text-right mt-12 md:mt-20">
                            <span className="text-[10px] font-geist tracking-[0.2em] text-white/60 uppercase">Location</span>
                            <p className="text-xs font-geist text-white tracking-widest uppercase">Kerala, IN</p>
                        </div>
                    </div>

                    {/* BOTTOM ROW */}
                    <div className="flex justify-between items-end">
                        {/* ROLE TYPEWRITER */}
                        <div id="hero-cta" data-testid="view-projects" className="max-w-md pointer-events-auto flex flex-col gap-6">

                            {/* AUDIO TOGGLE (MOVED HERE) */}
                            <div className="pointer-events-auto">
                                <button
                                    onClick={toggleMute}
                                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                                >
                                    <div className="p-2 border border-white/20 rounded-full group-hover:border-white/60 transition-colors">
                                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                    </div>
                                    <span className="text-[10px] font-geist tracking-[0.2em] uppercase hidden md:block">
                                        {isMuted ? "Sound Off" : "Sound On"}
                                    </span>
                                </button>
                                <audio ref={audioRef} src="/music/Intro_audio.mp3" loop />
                            </div>

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
                        </div>

                        {/* SCROLL INDICATOR */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-geist tracking-[0.3em] text-white/40 uppercase">Scroll</span>
                            <motion.div
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronDown className="w-4 h-4 text-white/40" />
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
