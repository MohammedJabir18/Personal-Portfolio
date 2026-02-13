"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Direct position for the dot (no lag)
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // Spring position for the ring (smooth trailing)
    const ringX = useSpring(dotX, { damping: 30, stiffness: 200, mass: 0.5 });
    const ringY = useSpring(dotY, { damping: 30, stiffness: 200, mass: 0.5 });

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            dotX.set(e.clientX);
            dotY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            const clickable =
                target.closest(
                    "a, button, [data-cursor='pointer'], input, textarea, select, [role='button']"
                ) !== null;
            setIsPointer(clickable);
        },
        [dotX, dotY, isVisible]
    );

    useEffect(() => {
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
        };
    }, [handleMouseMove]);

    return (
        <>
            {/* Dot — sticks to cursor exactly */}
            <motion.div
                className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
                style={{ x: dotX, y: dotY }}
            >
                <motion.div
                    className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        width: isPointer ? 0 : 8,
                        height: isPointer ? 0 : 8,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>

            {/* Ring — trails behind with spring physics */}
            <motion.div
                className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
                style={{ x: ringX, y: ringY }}
            >
                <motion.div
                    className="rounded-full border -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        width: isPointer ? 50 : 24,
                        height: isPointer ? 50 : 24,
                        borderColor: isPointer
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(255,255,255,0.5)",
                        backgroundColor: isPointer
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>

            {/* Hide native cursor on non-touch devices */}
            <style jsx global>{`
                @media (hover: hover) and (pointer: fine) {
                    * { cursor: none !important; }
                }
            `}</style>
        </>
    );
}
