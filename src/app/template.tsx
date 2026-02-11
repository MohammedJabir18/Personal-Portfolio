"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* Curtain wipe overlay */}
                <motion.div
                    className="fixed inset-0 z-[9998] bg-noir-bg"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    style={{ transformOrigin: "top" }}
                />
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
