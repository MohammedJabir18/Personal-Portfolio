"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    as?: "button" | "a";
    href?: string;
}

export default function MagneticButton({
    children,
    className,
    strength = 0.3,
    onClick,
    as = "button",
    href,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = as === "a" ? "a" : "button";

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.2 }}
            data-cursor="pointer"
        >
            <Component
                className={cn(
                    "relative px-6 py-3 text-sm font-geist tracking-wider uppercase transition-colors duration-300",
                    className
                )}
                onClick={onClick}
                href={as === "a" ? href : undefined}
            >
                {children}
            </Component>
        </motion.div>
    );
}
