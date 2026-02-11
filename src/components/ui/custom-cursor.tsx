"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
    const cursorY = useSpring(0, { damping: 25, stiffness: 300 });

    useEffect(() => {
        const isTouchDevice = "ontouchstart" in window;
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);

            const target = e.target as HTMLElement;
            const isClickable =
                target.closest("a, button, [data-cursor='pointer'], input, textarea, select") !== null ||
                window.getComputedStyle(target).cursor === "pointer";
            setIsPointer(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
                style={{ x: cursorX, y: cursorY }}
                animate={{
                    scale: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                    style={{
                        width: isPointer ? 48 : 8,
                        height: isPointer ? 48 : 8,
                        opacity: isPointer ? 0.3 : 1,
                    }}
                />
            </motion.div>

            {/* Ring */}
            <motion.div
                className="fixed top-0 left-0 z-[10000] pointer-events-none"
                style={{ x: cursorX, y: cursorY }}
                animate={{
                    scale: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="rounded-full border border-white/30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                        width: isPointer ? 60 : 32,
                        height: isPointer ? 60 : 32,
                    }}
                />
            </motion.div>

            {/* Hide default cursor */}
            <style jsx global>{`
        @media (hover: hover) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
        </>
    );
}
