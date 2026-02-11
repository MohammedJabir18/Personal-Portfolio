"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
    children: React.ReactNode;
    className?: string;
    reverse?: boolean;
    speed?: string;
}

export default function Marquee({
    children,
    className,
    reverse = false,
    speed = "30s",
}: MarqueeProps) {
    return (
        <div className={cn("overflow-hidden relative", className)}>
            <div
                className={cn(
                    "flex gap-8 whitespace-nowrap",
                    reverse ? "animate-marquee-reverse" : "animate-marquee"
                )}
                style={{ animationDuration: speed }}
            >
                {children}
                {children}
            </div>
        </div>
    );
}
