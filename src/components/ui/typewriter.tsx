"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
    strings: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    loop?: boolean;
    cursor?: string;
}

export default function Typewriter({
    strings,
    className,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 2000,
    loop = true,
    cursor = "|",
}: TypewriterProps) {
    const [currentStringIndex, setCurrentStringIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const tick = useCallback(() => {
        const fullText = strings[currentStringIndex];

        if (!isDeleting) {
            setCurrentText(fullText.substring(0, currentText.length + 1));

            if (currentText === fullText) {
                setTimeout(() => setIsDeleting(true), pauseDuration);
                return;
            }
        } else {
            setCurrentText(fullText.substring(0, currentText.length - 1));

            if (currentText === "") {
                setIsDeleting(false);
                setCurrentStringIndex((prev) => (prev + 1) % strings.length);
                return;
            }
        }
    }, [currentText, isDeleting, currentStringIndex, strings, pauseDuration]);

    useEffect(() => {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting, deletingSpeed, typingSpeed]);

    return (
        <span className={cn("font-geist", className)}>
            {currentText}
            <span className="animate-cursor-blink text-neon-blue">{cursor}</span>
        </span>
    );
}
