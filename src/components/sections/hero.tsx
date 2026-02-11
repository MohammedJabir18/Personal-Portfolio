"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import TextReveal from "@/components/ui/text-reveal";
import Typewriter from "@/components/ui/typewriter";
import { ChevronDown } from "lucide-react";

// Particle system for hero background
function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
        }> = [];

        const PARTICLE_COUNT = 80;
        const CONNECTION_DISTANCE = 150;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        let animId: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                // Mouse repulsion
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    p.vx += dx / dist * 0.02;
                    p.vy += dy / dist * 0.02;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Dampen velocity
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const cdx = p.x - other.x;
                    const cdy = p.y - other.y;
                    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

                    if (cdist < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(other.x, other.y);
                        const lineOpacity = (1 - cdist / CONNECTION_DISTANCE) * 0.15;
                        ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const cleanup = animate();
        return cleanup;
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            style={{ width: "100%", height: "100%" }}
        />
    );
}

function HeroTitle({ text }: { text: string }) {
    return (
        <motion.h1
            className="text-[12vw] leading-[0.9] font-clash font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 relative select-none"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            {text}
        </motion.h1>
    );
}

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Particle Background */}
            <ParticleCanvas />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-noir-bg z-[1]" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px] z-[1]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[120px] z-[1]" />

            {/* Content */}
            <div className="relative z-10 text-center section-container">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-geist tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-neon-blue animate-glow-pulse" />
                        Available for Projects
                    </span>
                </motion.div>

                {/* Name - Massive Glitch Reveal */}
                <div className="relative z-20 mix-blend-difference">
                    <HeroTitle text="MOHAMMED JABIR" />
                </div>

                {/* Typewriter Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-8"
                >
                    <p className="text-noir-muted text-sm md:text-base font-geist tracking-wider">
                        <Typewriter
                            strings={[
                                "Building Intelligent Systems",
                                "Automating the Future",
                                "Full-Stack Architecture",
                                "AI & Business Intelligence",
                            ]}
                        />
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="mt-12 flex items-center justify-center gap-6"
                >
                    <button
                        onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-8 py-4 bg-gradient-neon text-white rounded-full font-geist text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-shadow duration-300"
                        data-cursor="pointer"
                    >
                        View Projects
                    </button>
                    <button
                        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-8 py-4 border border-white/20 text-white rounded-full font-geist text-sm tracking-wider uppercase hover:border-white/40 transition-colors duration-300"
                        data-cursor="pointer"
                    >
                        Get in Touch
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-noir-muted font-geist tracking-widest uppercase">
                    Scroll
                </span>
                <ChevronDown className="w-4 h-4 text-noir-muted animate-bounce-gentle" />
            </motion.div>
        </section>
    );
}
