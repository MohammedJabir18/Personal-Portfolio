import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";
import CustomCursor from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
    title: "Mohammed Jabir | AI & Automation Specialist",
    description: "Portfolio of a Full-Stack Developer and AI Specialist.",
    keywords: [
        "Mohammed Jabir",
        "Full-Stack Developer",
        "AI Automation",
        "Next.js",
        "React",
        "Python",
        "n8n",
        "Portfolio",
    ],
    openGraph: {
        title: "Mohammed Jabir | AI & Automation Specialist",
        description: "Portfolio of a Full-Stack Developer and AI Specialist.",
        url: "https://mohammedjabir.me",
        siteName: "Mohammed Jabir M",
        type: "website",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Mohammed Jabir - AI & Automation Specialist",
            },
        ],
    },
};

import Preloader from "@/components/ui/preloader";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Preloader />
                <SmoothScrollProvider>
                    <CustomCursor />
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
