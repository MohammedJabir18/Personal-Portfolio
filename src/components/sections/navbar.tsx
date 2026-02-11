"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            setIsHidden(currentScrollY > lastScrollY && currentScrollY > 200);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const scrollTo = (href: string) => {
        setIsMobileOpen(false);
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled ? "bg-black/10 backdrop-blur-lg border-b border-white/5" : ""
                    }`}
                animate={{ y: isHidden ? -100 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="section-container flex items-center justify-between h-20">
                    {/* Logo */}
                    <MagneticButton
                        className="text-white font-clash font-bold text-xl tracking-tight !px-0 !py-0"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <span className="text-gradient">JM</span>
                    </MagneticButton>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-2">
                        {NAV_LINKS.map((link) => (
                            <MagneticButton
                                key={link.href}
                                className="text-noir-muted hover:text-white transition-colors text-xs"
                                onClick={() => scrollTo(link.href)}
                            >
                                {link.label}
                            </MagneticButton>
                        ))}
                        <MagneticButton
                            className="ml-4 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 rounded-full text-xs"
                            onClick={() => scrollTo("#contact")}
                        >
                            Let&apos;s Talk
                        </MagneticButton>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[999] bg-noir-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        {NAV_LINKS.map((link, i) => (
                            <motion.button
                                key={link.href}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="text-3xl font-clash font-semibold text-white hover:text-gradient transition-all"
                                onClick={() => scrollTo(link.href)}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
