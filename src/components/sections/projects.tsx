"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
    {
        title: "InvoiceFlow",
        subtitle: "Local-First Financial Engine",
        description:
            "Awwwards-tier local-first invoice management desktop app built with Rust and Tauri. Engineered for absolute privacy, sub-millisecond data sync, and real-time Revenue Pulse analytics.",
        tags: ["Rust 🦀", "Tauri", "React", "Zero-Knowledge"],
        color: "#00f0ff", // Sci-fi cyber-cyan
        gradient: "from-[#051821] via-[#0a2e3f] to-[#041116]",
        image: null,
        video: null,
        isPremium: true,
        link: "https://github.com/MohammedJabir18/InvoiceFlow",
    },
    {
        title: "BitBondit",
        subtitle: "Enterprise SaaS Platform",
        description:
            "Full-scale enterprise SaaS application with real-time data sync, complex dashboards, and 98+ Lighthouse performance score.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        color: "#3b82f6",
        gradient: "from-blue-600/20 to-purple-600/20",
        image: "/images/BitBond_hero.png",
        video: "/videos/Bitbond_website.mp4",
        link: "https://www.bitbondit.com/",
    },
    {
        title: "Vault79",
        subtitle: "Digital Solutions Platform",
        description:
            "End-to-end digital solutions platform with full-cycle development from concept to deployment, featuring modern UI/UX design.",
        tags: ["React", "Node.js", "MongoDB", "Figma"],
        color: "#8b5cf6",
        gradient: "from-purple-600/20 to-pink-600/20",
        image: "/images/Vault79_hero.png",
        video: "/videos/Vault79_website.mp4",
        link: "https://vault79.in/",
    },
    {
        title: "AI Automation Suite",
        subtitle: "Intelligent Workflow System",
        description:
            "RAG pipeline integrating n8n, Pinecone, and OpenAI for automated chatbots and intelligent document processing.",
        tags: ["n8n", "Pinecone", "OpenAI", "Python", "RAG"],
        color: "#3b82f6",
        gradient: "from-cyan-600/20 to-blue-600/20",
        image: "/images/ai_suite_hero.svg",
        video: null,
        link: null,
    },
];

// Add an optional isPremium flag to the union
type ProjectType = (typeof PROJECTS)[0] & { isPremium?: boolean };

function ProjectCard({
    project,
    index,
}: {
    project: ProjectType;
    index: number;
}) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -5, y: x * 5 }); // Reduced tilt for better media viewing
    };

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className="flex-shrink-0 w-full md:w-[600px] lg:w-[700px] group"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
            data-cursor="pointer"
        >
            <motion.div
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden border border-noir-border bg-noir-card`}
            >
                {/* 1. Background Media Layer */}
                <div className="absolute inset-0 z-0">
                    {/* Fallback Gradient or Image */}
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 700px"
                            className="object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-500"
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                    )}

                    {/* Video Overlay */}
                    {project.video && (
                        <video
                            ref={videoRef}
                            src={project.video}
                            muted
                            loop
                            playsInline
                            preload="none"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    )}

                    {/* Dark Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />

                    {/* Premium Cyber Overlay */}
                    {project.isPremium && (
                        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden mix-blend-screen opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                            {/* Animated Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] animate-[pulse_4s_ease-in-out_Infinity]" />

                            {/* Scanning Laser Line */}
                            <motion.div
                                animate={{ y: ["-10%", "110%"] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]"
                            />

                            {/* Data Streams / Particles */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.15),transparent_70%)]" />
                        </div>
                    )}
                </div>

                {/* Project Number - Moved/Styled */}
                <div className="absolute top-6 right-8 text-8xl font-clash font-bold text-white/5 z-10">
                    0{index + 1}
                </div>

                {/* Content */}
                <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 mb-4"
                    >
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-geist border border-white/20 bg-black/50 backdrop-blur-md text-white/90"
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    <p className="text-xs font-geist text-neon-blue tracking-widest uppercase mb-2">
                        {project.subtitle}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-clash font-bold text-white mb-3">
                        {project.title}
                    </h3>
                    <p className="text-sm text-white/70 font-geist max-w-md leading-relaxed mb-4">
                        {project.description}
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neon-blue hover:text-white transition-all"
                            >
                                <ExternalLink className="w-3 h-3" />
                                Visit Website
                            </a>
                        )}
                    </div>
                </div>

                {/* Bottom Line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 z-30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: project.color }}
                />
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [scrollRange, setScrollRange] = useState(0);

    useEffect(() => {
        const updateLayout = () => {
            setIsDesktop(window.innerWidth >= 768);
            if (scrollContainerRef.current) {
                const scrollWidth = scrollContainerRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                const maxScroll = scrollWidth - viewportWidth + (viewportWidth * 0.05); // Add 5vw padding gap on right
                setScrollRange(maxScroll > 0 ? -maxScroll : 0);
            }
        };

        updateLayout();
        setTimeout(updateLayout, 100);
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);

    return (
        <section
            id="work"
            className="relative md:h-[400vh]"
            ref={containerRef}
        >
            <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center py-20 md:py-0">
                <div className="section-container mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs font-geist text-neon-purple tracking-widest uppercase mb-4">
                            {/* Selected Work */}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-clash font-bold text-white">
                            Projects
                        </h2>
                    </motion.div>
                </div>

                {/* Projects Container */}
                <motion.div
                    ref={scrollContainerRef}
                    id="projects-container"
                    style={{ x: isDesktop ? x : 0 }}
                    className="flex flex-col md:flex-row gap-8 px-[5vw] md:w-max"
                >
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
