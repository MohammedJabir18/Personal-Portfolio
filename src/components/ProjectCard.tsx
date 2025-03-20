
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  category?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  githubLink,
  demoLink
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div 
      className="project-card-3d h-full relative perspective-1000 transform-gpu"
      initial={{ opacity: 0.9, scale: 0.98 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Main card */}
      <motion.div 
        className="w-full h-full rounded-xl overflow-hidden relative flex flex-col"
        animate={{ 
          boxShadow: hovered 
            ? "rgba(0, 0, 0, 0.3) 0px 60px 40px -7px" 
            : "rgba(0, 0, 0, 0.2) 0px 20px 30px -10px",
          borderColor: hovered ? "rgba(0, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3 }}
        style={{
          border: "1px solid",
          backgroundColor: "#0A1128",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Layer effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-neobrutalism-dark to-black z-0 opacity-80"></div>
        
        {/* Project image with subtle float animation on hover */}
        <div className="relative h-48 overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: hovered ? 0.5 : 0,
              background: "linear-gradient(45deg, rgba(158, 87, 217, 0.4) 0%, rgba(58, 134, 255, 0.4) 100%)"
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            animate={{ 
              y: hovered ? -5 : 0,
              filter: hovered ? "brightness(1.1)" : "brightness(1)"
            }}
            transition={{ 
              y: { duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              filter: { duration: 0.3 }
            }}
          />
          
          {/* Glowing edge effect */}
          <motion.div 
            className="absolute inset-0 rounded-t-xl pointer-events-none"
            style={{ 
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
              zIndex: 2
            }}
            animate={{ 
              boxShadow: hovered 
                ? "inset 0 0 0 1px rgba(0,255,255,0.3), 0 0 30px rgba(0,255,255,0.15)" 
                : "inset 0 0 0 1px rgba(255,255,255,0.1)"
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Content with reveal animation */}
        <div className="flex flex-col flex-grow p-5 relative z-10">
          <motion.h3 
            className="text-xl font-bold mb-2 text-white"
            animate={{ 
              color: hovered ? "#00FFFF" : "#FFFFFF"
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-white/70 mb-4 flex-grow"
            animate={{ 
              opacity: hovered ? 1 : 0.7
            }}
            transition={{ duration: 0.4 }}
          >
            {description}
          </motion.p>
          
          {/* Technologies with staggered reveal */}
          <motion.div 
            className="mb-4"
          >
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span 
                  key={index} 
                  className="tech-badge"
                  style={{ 
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    color: "#00FFFF"
                  }}
                  animate={{ 
                    y: hovered ? 0 : 5,
                    opacity: hovered ? 1 : 0.7,
                    scale: hovered ? 1.05 : 1
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: hovered ? 0.1 + (index * 0.05) : 0,
                    y: { type: "spring", stiffness: 300 }
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          {/* Links with slide-up reveal */}
          <motion.div 
            className="flex space-x-4"
            initial={{ y: 5, opacity: 0.7 }}
            animate={{ 
              y: hovered ? 0 : 5,
              opacity: hovered ? 1 : 0.7
            }}
            transition={{ 
              duration: 0.4, 
              delay: 0.2,
              type: "spring",
              stiffness: 300
            }}
          >
            {githubLink && (
              <motion.a 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="p-2 rounded-full bg-black/30 border border-neobrutalism-purple/30 group-hover:border-neobrutalism-purple/80"
                  whileHover={{ 
                    boxShadow: "0 0 15px 2px rgba(157, 78, 221, 0.4)",
                  }}
                >
                  <Github size={16} className="text-neobrutalism-purple" />
                </motion.div>
                <span className="group-hover:text-neobrutalism-purple transition-colors">Code</span>
              </motion.a>
            )}
            
            {demoLink && (
              <motion.a 
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="p-2 rounded-full bg-black/30 border border-neobrutalism-cyan/30 group-hover:border-neobrutalism-cyan/80"
                  whileHover={{ 
                    boxShadow: "0 0 15px 2px rgba(0, 255, 255, 0.4)",
                  }}
                >
                  <ExternalLink size={16} className="text-neobrutalism-cyan" />
                </motion.div>
                <span className="group-hover:text-neobrutalism-cyan transition-colors">Live Demo</span>
              </motion.a>
            )}
          </motion.div>
        </div>
        
        {/* Reflective glow effect */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-neobrutalism-cyan/20 to-transparent"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Holographic light effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent mix-blend-overlay pointer-events-none"
          animate={{ 
            opacity: hovered ? 1 : 0,
            background: hovered ? 
              "linear-gradient(135deg, rgba(157, 78, 221, 0.1) 0%, rgba(58, 134, 255, 0.1) 50%, rgba(0, 255, 255, 0.15) 100%)" : 
              "none"
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      
      {/* Card shadow */}
      <motion.div 
        className="absolute -bottom-3 inset-x-5 h-8 rounded-b-xl bg-black/30 blur-md"
        animate={{ 
          opacity: hovered ? 0.6 : 0.3,
          scale: hovered ? 0.9 : 1
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
