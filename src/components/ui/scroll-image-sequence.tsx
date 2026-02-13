"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollImageSequenceProps {
    images: string[];
    containerRef: React.RefObject<HTMLElement>;
}

export default function ScrollImageSequence({
    images,
    containerRef,
}: ScrollImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loadedImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(images.length).fill(null));
    const [ready, setReady] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, images.length - 1]
    );

    // Progressive image loading — first frame loads immediately, rest in batches
    useEffect(() => {
        let cancelled = false;
        const loaded = loadedImagesRef.current;

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                if (loaded[index]) { resolve(); return; }
                const img = new Image();
                img.src = images[index];
                img.onload = () => {
                    if (!cancelled) loaded[index] = img;
                    resolve();
                };
                img.onerror = () => resolve();
            });
        };

        // Load first frame immediately for instant render
        loadImage(0).then(() => {
            if (cancelled) return;
            setReady(true);
        });

        // Then load rest in parallel batches of 10
        const loadRest = async () => {
            const BATCH_SIZE = 10;
            for (let i = 1; i < images.length; i += BATCH_SIZE) {
                if (cancelled) return;
                const batch = Array.from(
                    { length: Math.min(BATCH_SIZE, images.length - i) },
                    (_, j) => loadImage(i + j)
                );
                await Promise.all(batch);
            }
        };
        loadRest();

        return () => { cancelled = true; };
    }, [images]);

    const render = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = loadedImagesRef.current[index];

        if (!canvas || !ctx || !img) return;

        // Set canvas dimensions to match window
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Calculate aspect ratio to cover the screen (object-fit: cover)
        const renderWidth = Math.max(canvas.width, (canvas.height / img.height) * img.width);
        const renderHeight = Math.max(canvas.height, (canvas.width / img.width) * img.height);

        const x = (canvas.width - renderWidth) / 2;
        const y = (canvas.height - renderHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, renderWidth, renderHeight);
    }, []);

    // Initial render when first frame is ready
    useEffect(() => {
        if (ready) render(0);
    }, [ready, render]);

    // Update on scroll
    useMotionValueEvent(currentIndex, "change", (latest) => {
        const index = Math.round(latest);
        if (index >= 0 && index < images.length && loadedImagesRef.current[index]) {
            render(index);
        }
    });

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const current = Math.round(currentIndex.get());
            if (current >= 0 && current < images.length && loadedImagesRef.current[current]) {
                render(current);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex, render, images.length]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
    );
}
