"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown } from "lucide-react";

const EXPERIENCES = [
    {
        title: "Business Executive",
        company: "Bismi Traders",
        period: "Sept 2025 – Present",
        side: "left" as const,
        color: "#3b82f6",
        details: [
            "Architected data reporting systems enabling 40% faster decision-making",
            "Engineered automated lead generation workflows achieving 35% increase in conversions",
            "Implemented business intelligence dashboards for real-time performance monitoring",
        ],
    },
    {
        title: "Amazon Selling Intern",
        company: "Tecfuge",
        period: "Aug 2025",
        side: "right" as const,
        color: "#8b5cf6",
        details: [
            "Conducted comprehensive market research and competitor analysis",
            "Optimized product listings with advanced SEO strategies",
            "Analyzed sales metrics to identify growth opportunities",
        ],
    },
    {
        title: "Python Developer Intern",
        company: "SOFTRONIICS",
        period: "May 2023",
        side: "left" as const,
        color: "#3b82f6",
        details: [
            "Built Python automation scripts streamlining repetitive workflows",
            "Developed data pipelines using Pandas and NumPy for analytics",
            "Created ETL processes for large-scale data transformation",
        ],
    },
    {
        title: "Web Design Intern",
        company: "SYSBREEZE",
        period: "May 2022",
        side: "right" as const,
        color: "#8b5cf6",
        details: [
            "Designed responsive interfaces with HTML5 and CSS3",
            "Built mobile-first layouts with cross-browser compatibility",
            "Collaborated with senior developers on client projects",
        ],
    },
];

function TimelineCard({
    experience,
    index,
}: {
    experience: (typeof EXPERIENCES)[0];
    index: number;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: experience.side === "left" ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
            className={`relative flex items-start gap-8 ${experience.side === "right" ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Timeline Node */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor: experience.color, backgroundColor: `${experience.color}33` }}
                />
            </div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block md:w-1/2" />

            {/* Card */}
            <motion.div
                className="md:w-1/2 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <div
                    className="p-6 rounded-2xl bg-noir-card border border-noir-border hover:border-opacity-50 transition-all duration-300 group"
                    style={{ "--accent": experience.color } as React.CSSProperties}
                    onClick={() => setIsExpanded(!isExpanded)}
                    data-cursor="pointer"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-clash font-semibold text-white group-hover:text-gradient transition-colors">
                                {experience.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Briefcase className="w-3 h-3 text-noir-muted" />
                                <span className="text-sm font-geist text-noir-muted">{experience.company}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-geist text-noir-muted">
                            <Calendar className="w-3 h-3" />
                            {experience.period}
                        </div>
                    </div>

                    {/* Expand indicator */}
                    <div className="flex items-center gap-1 text-xs text-noir-muted font-geist">
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-3 h-3" />
                        </motion.div>
                        <span>{isExpanded ? "Less" : "Details"}</span>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                                className="mt-4 space-y-2 overflow-hidden"
                            >
                                {experience.details.map((detail, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-2 text-sm text-noir-text/70 font-geist"
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                            style={{ backgroundColor: experience.color }}
                                        />
                                        {detail}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="py-32 relative" ref={containerRef}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs font-geist text-neon-blue tracking-widest uppercase mb-4">
            // The Journey
                    </p>
                    <h2 className="text-4xl md:text-5xl font-clash font-bold text-white">
                        Experience
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-noir-border">
                        <motion.div
                            className="w-full bg-gradient-to-b from-neon-blue to-neon-purple origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Cards */}
                    <div className="space-y-12">
                        {EXPERIENCES.map((exp, i) => (
                            <TimelineCard key={i} experience={exp} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
