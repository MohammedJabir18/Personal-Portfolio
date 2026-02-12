"use client";

import { useEffect, useRef, useState } from "react";
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
    const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, images.length - 1]
    );

    useEffect(() => {
        const loadImages = async () => {
            setLoading(true);
            const promises = images.map((src) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            });

            try {
                const loaded = await Promise.all(promises);
                setLoadedImages(loaded);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load images", error);
                setLoading(false);
            }
        };

        loadImages();
    }, [images]);

    const render = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = loadedImages[index];

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
    };

    // Initial render when images are loaded
    useEffect(() => {
        if (!loading && loadedImages.length > 0) {
            render(0);
        }
    }, [loading, loadedImages]);

    // Update on scroll
    useMotionValueEvent(currentIndex, "change", (latest) => {
        const index = Math.round(latest);
        if (loadedImages.length > 0 && index >= 0 && index < loadedImages.length) {
            render(index);
        }
    });

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const current = Math.round(currentIndex.get());
            if (loadedImages.length > 0 && current >= 0 && current < loadedImages.length) {
                render(current);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [loadedImages, currentIndex]);


    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
    );
}
