"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useTextScramble(text: string, speed = 30) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const maxIterations = text.length;

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iteration) return text[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            iteration += 1 / 3;

            if (iteration >= maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
                setIsScrambling(false);
            }
        }, speed);
    }, [text, speed, isScrambling]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return { displayText, scramble, isScrambling };
}
