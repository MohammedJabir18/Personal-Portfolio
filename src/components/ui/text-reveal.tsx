"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    staggerDelay?: number;
}

export default function TextReveal({
    text,
    className,
    delay = 0,
    as: Component = "h1",
    staggerDelay = 0.03,
}: TextRevealProps) {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
            opacity: 1,
            transition: { staggerChildren: staggerDelay, delayChildren: delay + i * 0.1 },
        }),
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <Component className={cn("flex flex-wrap", className)}>
            <motion.span
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap"
                style={{ perspective: "1000px" }}
            >
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} className="mr-[0.25em] inline-flex overflow-hidden">
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                key={charIndex}
                                variants={child}
                                className="inline-block"
                                style={{ transformOrigin: "bottom" }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Component>
    );
}
