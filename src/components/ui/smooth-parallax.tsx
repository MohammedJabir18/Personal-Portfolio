"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

interface SmoothParallaxProps {
    children: React.ReactNode;
    offset?: number;
    damping?: number;
    stiffness?: number;
    className?: string;
}

export default function SmoothParallax({
    children,
    offset = 50,
    damping = 15,
    stiffness = 100,
    className,
}: SmoothParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const targetY = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const y = useSpring(targetY, { damping, stiffness });

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}
