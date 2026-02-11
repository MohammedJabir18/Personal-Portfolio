"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import AnimatedCounter from "@/components/ui/animated-counter";
import Marquee from "@/components/ui/marquee";

const SKILLS = [
    "Next.js", "React", "TypeScript", "Python", "n8n",
    "Tailwind CSS", "Figma", "RAG Pipelines", "Pinecone",
    "OpenAI", "Pandas", "NumPy", "Node.js", "Git",
    "Amazon Seller Central", "HTML5", "CSS3",
];

const TECH_ICONS = [
    { name: "Next.js", icon: "⚡" },
    { name: "React", icon: "⚛️" },
    { name: "Python", icon: "🐍" },
    { name: "n8n", icon: "🔄" },
    { name: "TypeScript", icon: "📘" },
    { name: "Tailwind", icon: "🎨" },
    { name: "Figma", icon: "🖌️" },
    { name: "OpenAI", icon: "🤖" },
    { name: "Pinecone", icon: "🌲" },
    { name: "Node.js", icon: "🟢" },
];

const TITLE_TEXT = "AI & AUTOMATION SPECIALIST";

const letterVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
        scale: 0.8,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.6,
            delay: i * 0.035,
            ease: [0.215, 0.61, 0.355, 1],
        },
    }),
};

function BioCard() {
    return (
        <SpotlightCard className="md:col-span-2 md:row-span-2">
            <div className="p-8 h-full flex flex-col justify-between">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs font-geist text-neon-blue tracking-widest uppercase mb-4">
              // About Me
                        </p>
                        <h2 className="text-3xl md:text-4xl font-clash font-bold mb-6 min-h-[4rem] md:min-h-[5rem] flex items-center flex-wrap">
                            {TITLE_TEXT.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.8 }}
                                    className={
                                        char === " "
                                            ? "inline-block w-[0.3em]"
                                            : "inline-block bg-gradient-to-b from-white via-white/90 to-neon-blue/70 bg-clip-text text-transparent"
                                    }
                                    style={{ willChange: "transform, opacity, filter" }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </h2>
                        <p className="text-noir-text/80 text-sm md:text-base leading-relaxed font-geist">
                            Results-driven specialist building intelligent systems and data-driven solutions.
                            I leverage <span className="text-neon-blue">Next.js</span>,{" "}
                            <span className="text-neon-purple">n8n</span>, and{" "}
                            <span className="text-neon-blue">AI tools</span> to deliver business outcomes
                            that make a real impact.
                        </p>
                    </motion.div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center text-white font-clash font-bold text-lg">
                        J
                    </div>
                    <div>
                        <p className="text-white font-clash font-semibold">Mohammed Jabir M</p>
                        <p className="text-noir-muted text-xs font-geist">Full-Stack Developer</p>
                    </div>
                </div>
            </div>
        </SpotlightCard>
    );
}

function TechStackCard() {
    return (
        <SpotlightCard className="md:col-span-2" spotlightColor="rgba(139, 92, 246, 0.15)">
            <div className="p-6 h-full flex flex-col justify-between">
                <p className="text-xs font-geist text-neon-purple tracking-widest uppercase mb-4">
          // Tech Stack
                </p>
                <div className="space-y-3">
                    <Marquee speed="25s">
                        {TECH_ICONS.map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-noir-border bg-noir-surface text-sm text-noir-text font-geist whitespace-nowrap"
                            >
                                <span>{tech.icon}</span>
                                {tech.name}
                            </span>
                        ))}
                    </Marquee>
                    <Marquee speed="20s" reverse>
                        {TECH_ICONS.slice().reverse().map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-noir-border bg-noir-surface text-sm text-noir-text font-geist whitespace-nowrap"
                            >
                                <span>{tech.icon}</span>
                                {tech.name}
                            </span>
                        ))}
                    </Marquee>
                </div>
            </div>
        </SpotlightCard>
    );
}

function StatsCard() {
    return (
        <SpotlightCard className="md:col-span-2">
            <div className="p-6 h-full">
                <p className="text-xs font-geist text-neon-blue tracking-widest uppercase mb-6">
          // Impact
                </p>
                <div className="grid grid-cols-3 gap-4">
                    <AnimatedCounter target={40} suffix="%" label="Faster Decisions" />
                    <AnimatedCounter target={35} suffix="%" label="Lead Increase" />
                    <AnimatedCounter target={98} suffix="+" label="Lighthouse" />
                </div>
            </div>
        </SpotlightCard>
    );
}

function SkillsTagCloud() {
    return (
        <SpotlightCard className="md:col-span-2" spotlightColor="rgba(139, 92, 246, 0.15)">
            <div className="p-6 h-full">
                <p className="text-xs font-geist text-neon-purple tracking-widest uppercase mb-4">
          // Skills
                </p>
                <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03, duration: 0.3 }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: "rgba(59, 130, 246, 0.15)",
                                borderColor: "rgba(59, 130, 246, 0.5)",
                            }}
                            className="px-3 py-1.5 rounded-lg border border-noir-border bg-noir-surface text-xs font-geist text-noir-text transition-colors"
                            data-cursor="pointer"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </SpotlightCard>
    );
}

export default function AboutBento() {
    return (
        <section id="about" className="py-32 relative grainy-gradient">
            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                    <BioCard />
                    <TechStackCard />
                    <StatsCard />
                    <SkillsTagCloud />
                </motion.div>
            </div>
        </section>
    );
}
