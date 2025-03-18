
import React from 'react';
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
  // Size mapping for different avatar sizes
  const sizeClasses = {
    sm: 'h-20 w-20',
    md: 'h-32 w-32',
    lg: 'h-40 w-40',
    xl: 'h-56 w-56'
  };

  return (
    <div className="relative flex items-center justify-center p-1 mb-6">
      {/* Animated gradient border */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-neobrutalism-purple via-neobrutalism-blue to-neobrutalism-cyan animate-rotate-slow`}></div>
      
      {/* Background color layer using website theme color */}
      <div className="absolute inset-0.5 rounded-full bg-neobrutalism-dark"></div>
      
      {/* Avatar component */}
      <Avatar className={`relative ${sizeClasses[size]}`}>
        <AvatarImage src={src} alt={alt} className="object-contain" />
        <AvatarFallback className="bg-neobrutalism-dark text-neobrutalism-purple text-4xl font-bold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarProfile;
