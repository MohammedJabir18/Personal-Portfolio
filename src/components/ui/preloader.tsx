"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateImagePaths } from "@/lib/utils";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

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
                    setIsLoading(false);
                    document.body.style.overflow = ""; // Re-enable scroll
                }, 800);
            }
        };

        imagesToPreload.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = incrementProgress;
            img.onerror = incrementProgress; // Proceed even if error
        });

        // Fallback timeout in case images hang
        const timeout = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 8000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.h1
                            className="text-6xl md:text-9xl font-clash font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {progress}%
                        </motion.h1>
                        <motion.div
                            className="w-64 h-[1px] bg-white/20 overflow-hidden relative"
                        >
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: "-100%" }}
                                animate={{ x: `${progress - 100}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </motion.div>
                        <p className="text-xs font-geist text-white/40 tracking-widest uppercase mt-4">
                            Initializing Reality
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
