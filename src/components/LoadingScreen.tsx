
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const LoadingScreen = ({ finishLoading }: { finishLoading: () => void }) => {
  useEffect(() => {
    // Simulate loading time (adjust as needed)
    const timer = setTimeout(() => {
      finishLoading();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [finishLoading]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neobrutalism-dark">
      <div className="flex flex-col items-center">
        {/* Logo animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative flex items-center justify-center p-1">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neobrutalism-purple via-neobrutalism-blue to-neobrutalism-cyan animate-rotate-slow"></div>
            
            {/* Background color */}
            <div className="absolute inset-0.5 rounded-full bg-neobrutalism-dark"></div>
            
            {/* Avatar */}
            <Avatar className="relative h-24 w-24">
              <AvatarImage src="/lovable-uploads/c7d31be7-4be5-41eb-9718-89ddccf2e6db.png" alt="Mohammed Jabir" className="object-contain" />
              <AvatarFallback className="bg-neobrutalism-dark text-neobrutalism-purple text-xl font-bold">MJ</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
        
        {/* Name animation */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-gradient"
        >
          Mohammed Jabir
        </motion.h1>
        
        {/* Loading bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "250px" }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="h-1 bg-gradient-to-r from-neobrutalism-purple via-neobrutalism-blue to-neobrutalism-cyan rounded-full"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
