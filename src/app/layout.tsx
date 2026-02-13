import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";
import CustomCursor from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
    title: "Mohammed Jabir M — AI & Automation Specialist | Full-Stack Developer",
    description:
        "Results-driven specialist building intelligent systems and data-driven solutions. Leveraging Next.js, n8n, and AI tools to deliver business outcomes.",
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
        title: "Mohammed Jabir M — Portfolio",
        description:
            "AI & Automation Specialist | Full-Stack Developer | Business Intelligence Analyst",
        url: "https://mohammedjabir.me",
        siteName: "Mohammed Jabir M",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>

                <SmoothScrollProvider>
                    <CustomCursor />
                    {children}
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
