"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
    label?: string;
}

export default function AnimatedCounter({
    target,
    suffix = "",
    prefix = "",
    duration = 2,
    className,
    label,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, target, duration]);

    return (
        <div ref={ref} className={cn("text-center", className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <span className="text-4xl md:text-5xl font-clash font-bold text-gradient">
                    {prefix}
                    {count}
                    {suffix}
                </span>
                {label && (
                    <p className="mt-2 text-sm text-noir-muted font-geist tracking-wider uppercase">
                        {label}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
