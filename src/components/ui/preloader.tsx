"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateImagePaths } from "@/lib/utils";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Disable scroll
        document.body.style.overflow = "hidden";

        // Generate critical images to preload (first 50 frames)
        const frameCount = 50; // Preload enough for initial scroll
        const imagesToPreload = generateImagePaths(frameCount, "/new-sequence/ezgif-frame-");

        let loadedCount = 0;
        const totalImages = imagesToPreload.length;

        const incrementProgress = () => {
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalImages) * 100);
            setProgress(newProgress);

            if (loadedCount === totalImages) {
                // Add a small delay for "100%" to be seen
                setTimeout(() => {
                    setShowButton(true);
                }, 500);
            }
        };

        imagesToPreload.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = incrementProgress;
            img.onerror = incrementProgress; // Proceed even if error
        });

    }, []);

    const handleEnter = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
        }
        setIsLoading(false);
        document.body.style.overflow = ""; // Re-enable scroll
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    {/* Audio Element */}
                    <audio ref={audioRef} src="/music/Intro_audio.mp3" preload="auto" />

                    <div className="flex flex-col items-center gap-4">
                        <motion.h1
                            className="text-6xl md:text-9xl font-clash font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {progress}%
                        </motion.h1>

                        <div className="h-12 flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                {!showButton ? (
                                    <motion.div
                                        key="loader"
                                        className="w-64 h-[1px] bg-white/20 overflow-hidden relative"
                                        exit={{ opacity: 0, y: 20 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-white"
                                            initial={{ x: "-100%" }}
                                            animate={{ x: `${progress - 100}%` }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key="button"
                                        onClick={handleEnter}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
                                        className="text-xl md:text-2xl font-geist tracking-widest uppercase text-white hover:text-white/80 transition-all"
                                    >
                                        Enter Experience
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        <p className="text-xs font-geist text-white/40 tracking-widest uppercase mt-4">
                            {showButton ? "Click to Start" : "Initializing Reality"}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
