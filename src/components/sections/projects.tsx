"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
    {
        title: "BitBondit",
        subtitle: "Enterprise SaaS Platform",
        description:
            "Full-scale enterprise SaaS application with real-time data sync, complex dashboards, and 98+ Lighthouse performance score.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        color: "#3b82f6",
        gradient: "from-blue-600/20 to-purple-600/20",
    },
    {
        title: "Vault79",
        subtitle: "Digital Solutions Platform",
        description:
            "End-to-end digital solutions platform with full-cycle development from concept to deployment, featuring modern UI/UX design.",
        tags: ["React", "Node.js", "MongoDB", "Figma"],
        color: "#8b5cf6",
        gradient: "from-purple-600/20 to-pink-600/20",
    },
    {
        title: "AI Automation Suite",
        subtitle: "Intelligent Workflow System",
        description:
            "RAG pipeline integrating n8n, Pinecone, and OpenAI for automated chatbots and intelligent document processing.",
        tags: ["n8n", "Pinecone", "OpenAI", "Python", "RAG"],
        color: "#3b82f6",
        gradient: "from-cyan-600/20 to-blue-600/20",
    },
];

function ProjectCard({
    project,
    index,
}: {
    project: (typeof PROJECTS)[0];
    index: number;
}) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -10, y: x * 10 });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <motion.div
            ref={cardRef}
            className="flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] group"
            onMouseMove={handleMouseMove}
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
                className={`relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden border border-noir-border bg-gradient-to-br ${project.gradient} bg-noir-card`}
            >
                {/* Project Number */}
                <div className="absolute top-6 left-8 text-8xl font-clash font-bold text-white/5">
                    0{index + 1}
                </div>

                {/* Glow Effect */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${project.color}15, transparent 70%)`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    {/* Tags - fade in on hover */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-geist border border-white/10 bg-white/5 text-white/80"
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    <p className="text-xs font-geist text-noir-muted tracking-widest uppercase mb-2">
                        {project.subtitle}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-clash font-bold text-white mb-3">
                        {project.title}
                    </h3>
                    <p className="text-sm text-noir-text/70 font-geist max-w-md leading-relaxed">
                        {project.description}
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="flex items-center gap-2 text-xs font-geist text-neon-blue hover:text-white transition-colors">
                            <ExternalLink className="w-3 h-3" />
                            View Project
                        </button>
                        <button className="flex items-center gap-2 text-xs font-geist text-noir-muted hover:text-white transition-colors">
                            <Github className="w-3 h-3" />
                            Source
                        </button>
                    </div>
                </div>

                {/* Bottom gradient line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["2%", "-65%"]);

    return (
        <section id="work" className="relative" ref={containerRef} style={{ height: "250vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                <div className="section-container mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs font-geist text-neon-purple tracking-widest uppercase mb-4">
                // Selected Work
                        </p>
                        <h2 className="text-4xl md:text-5xl font-clash font-bold text-white">
                            Projects
                        </h2>
                    </motion.div>
                </div>

                {/* Horizontal Scroll Gallery */}
                <motion.div style={{ x }} className="flex gap-8 pl-[5vw]">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
