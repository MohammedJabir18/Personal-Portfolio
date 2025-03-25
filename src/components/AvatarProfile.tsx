import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarProfileProps {
  src: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AvatarProfile: React.FC<AvatarProfileProps> = ({ 
  src, 
  alt, 
  fallback = "MJ", 
  size = 'lg' 
}) => {
  const sizeClasses = {
    sm: 'h-20 w-20',
    md: 'h-32 w-32',
    lg: 'h-40 w-40',
    xl: 'h-56 w-56'
  };

  return (
    <motion.div
      className="group relative flex items-center justify-center p-1 mb-6"
      style={{ transformPerspective: 1000 }} // Enables 3D effect
      whileHover={{
        scale: 1.05,        // Slight zoom
        // rotateX: 5,         // Tilt up/down
        // rotateY: 5          // Tilt left/right
      }}
      transition={{type: "tween", duration: 0.5, ease: "easeOut"}} // Smooth spring animation
    >
      {/* Animated gradient border */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-neobrutalism-purple via-neobrutalism-blue to-neobrutalism-cyan animate-rotate-slow group-hover:animate-rotate-fast`}
      ></div>
      
      {/* Background color layer */}
      <div className="absolute inset-0.5 rounded-full bg-neobrutalism-dark"></div>
      
      {/* Avatar component */}
      <Avatar className={`relative ${sizeClasses[size]}`}>
        <AvatarImage src={src} alt={alt} className="object-contain" />
        <AvatarFallback className="bg-neobrutalism-dark text-neobrutalism-purple text-4xl font-bold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
};

export default AvatarProfile;