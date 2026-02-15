"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect } from "react";

export type NotificationType = "success" | "error";

interface NotificationProps {
    type: NotificationType;
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

const variants: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    exit: {
        y: 100,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 }
    }
};

export default function Notification({ type, message, isVisible, onClose }: NotificationProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none px-4">
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`
                            pointer-events-auto
                            relative overflow-hidden
                            flex items-center gap-4
                            px-6 py-4 rounded-2xl
                            bg-black/80 backdrop-blur-xl
                            border border-white/10
                            shadow-2xl shadow-black/50
                            min-w-[320px] max-w-md
                        `}
                    >
                        {/* Neon Glow Background */}
                        <div className={`
                            absolute inset-0 opacity-20 pointer-events-none
                            ${type === 'success'
                                ? 'bg-gradient-to-r from-neon-blue via-transparent to-transparent'
                                : 'bg-gradient-to-r from-red-500 via-transparent to-transparent'}
                        `} />

                        {/* Status Line */}
                        <div className={`
                            absolute left-0 top-0 bottom-0 w-1
                            ${type === 'success' ? 'bg-neon-blue shadow-[0_0_10px_#3b82f6]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}
                        `} />

                        {/* Icon */}
                        <div className={`
                            shrink-0 p-2 rounded-full
                            ${type === 'success' ? 'bg-neon-blue/10 text-neon-blue' : 'bg-red-500/10 text-red-500'}
                        `}>
                            {type === 'success' ? (
                                <CheckCircle2 className="w-6 h-6" />
                            ) : (
                                <XCircle className="w-6 h-6" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className={`
                                font-clash font-medium text-sm mb-0.5
                                ${type === 'success' ? 'text-white' : 'text-red-50'}
                            `}>
                                {type === 'success' ? 'Success' : 'Error'}
                            </h4>
                            <p className="text-sm font-geist text-gray-400 truncate">
                                {message}
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="shrink-0 p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
