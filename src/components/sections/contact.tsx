"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Globe, Copy, Check, Send } from "lucide-react";

// Simple confetti explosion
function createConfetti(container: HTMLDivElement) {
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];
    const particles = 40;

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      pointer-events: none;
      left: 50%;
      top: 50%;
      z-index: 100;
    `;

        container.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particles;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 100;

        particle.animate(
            [
                { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
                {
                    transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy + 200}px)) scale(0) rotate(${Math.random() * 720}deg)`,
                    opacity: 0,
                },
            ],
            { duration: 1000 + Math.random() * 500, easing: "cubic-bezier(0, 0.9, 0.57, 1)" }
        ).onfinish = () => particle.remove();
    }
}

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleCopyEmail = useCallback(() => {
        navigator.clipboard.writeText("jabirahmedz111@gmail.com");
        setCopied(true);
        if (buttonRef.current) createConfetti(buttonRef.current);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        // Simulate send
        await new Promise((r) => setTimeout(r, 1000));
        setIsSending(false);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="py-32 relative grainy-gradient">
            <div className="section-container relative z-10">
                {/* Massive Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs font-geist text-neon-blue tracking-widest uppercase mb-6">
            // Get in Touch
                    </p>
                    <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-clash font-bold text-white tracking-tight">
                        LET&apos;S{" "}
                        <span className="text-gradient">TALK</span>
                        <span className="text-neon-blue">.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <p className="text-noir-text/70 text-base font-geist leading-relaxed">
                            Have a project in mind or want to collaborate? I&apos;m always open to
                            discussing new opportunities, creative ideas, or ways to help you build
                            something amazing.
                        </p>

                        <div className="space-y-4">
                            <a
                                href="mailto:jabirahmedz111@gmail.com"
                                className="flex items-center gap-4 text-noir-text hover:text-neon-blue transition-colors group"
                                data-cursor="pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-noir-surface border border-noir-border flex items-center justify-center group-hover:border-neon-blue/30 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="font-geist text-sm">jabirahmedz111@gmail.com</span>
                            </a>
                            <a
                                href="tel:+919061613233"
                                className="flex items-center gap-4 text-noir-text hover:text-neon-blue transition-colors group"
                                data-cursor="pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-noir-surface border border-noir-border flex items-center justify-center group-hover:border-neon-blue/30 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="font-geist text-sm">+91 9061613233</span>
                            </a>
                            <a
                                href="https://mohammedjabir.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-noir-text hover:text-neon-blue transition-colors group"
                                data-cursor="pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-noir-surface border border-noir-border flex items-center justify-center group-hover:border-neon-blue/30 transition-colors">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <span className="font-geist text-sm">mohammedjabir.me</span>
                            </a>
                        </div>

                        {/* Copy Email Button with Confetti */}
                        <div ref={buttonRef} className="relative inline-block">
                            <button
                                onClick={handleCopyEmail}
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-neon text-white rounded-full font-geist text-sm tracking-wider uppercase hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300"
                                data-cursor="pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy Email
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-noir-border px-0 py-4 text-white font-geist text-sm placeholder:text-noir-muted focus:outline-none focus:border-neon-blue transition-colors duration-300"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-noir-border px-0 py-4 text-white font-geist text-sm placeholder:text-noir-muted focus:outline-none focus:border-neon-blue transition-colors duration-300"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <textarea
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full bg-transparent border-b border-noir-border px-0 py-4 text-white font-geist text-sm placeholder:text-noir-muted focus:outline-none focus:border-neon-blue transition-colors duration-300 resize-none"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full font-geist text-sm tracking-wider uppercase hover:border-neon-blue/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 disabled:opacity-50"
                            data-cursor="pointer"
                        >
                            <Send className="w-4 h-4" />
                            {isSending ? "Sending..." : "Send Message"}
                        </button>
                    </motion.form>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-8 border-t border-noir-border flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-xs font-geist text-noir-muted">
                        © 2026 Mohammed Jabir M. All rights reserved.
                    </p>
                    <p className="text-xs font-geist text-noir-muted">
                        Designed & Built with
                        <span className="text-neon-blue mx-1">♥</span>
                        using Next.js & Framer Motion
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
