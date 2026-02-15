import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateImagePaths(frameCount: number, prefix: string): string[] {
    return Array.from({ length: frameCount }, (_, i) => {
        const paddedIndex = (i + 1).toString().padStart(3, "0");
        return `${prefix}${paddedIndex}.jpg`;
    });
}
