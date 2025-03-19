import React from 'react';
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
  return (
    <motion.div 
      className="neo-card group h-full overflow-hidden flex flex-col transform-gpu preserve-3d"
      whileHover={{ 
        translateY: -5,
        boxShadow: "8px 8px 0px 0px #000000",
        transition: { duration: 0.2 }
      }}
      initial={{ boxShadow: "5px 5px 0px 0px #000000" }}
    >
      {/* Project Image with overlay on hover */}
      <div className="relative overflow-hidden h-48">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-neobrutalism-dark opacity-70"
          whileHover={{ opacity: 0.5 }}
        ></motion.div>
        
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-neobrutalism-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
        ></motion.div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-5 border-t-2 border-neobrutalism-purple">
        <motion.h3 
          className="text-xl font-bold mb-2 text-gradient"
          initial={{ y: 0 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          {title}
        </motion.h3>
        
        <p className="text-white/80 mb-4 flex-grow">{description}</p>
        
        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <motion.span 
                key={index} 
                className="bg-neobrutalism-dark px-2 py-1 text-xs font-semibold text-neobrutalism-cyan border border-neobrutalism-cyan/50"
                whileHover={{ 
                  backgroundColor: "rgba(0, 255, 255, 0.1)",
                  transition: { duration: 0.2 }
                }}
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Links */}
        <div className="flex space-x-4">
          {githubLink && (
            <motion.a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-neobrutalism-purple transition-colors"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              <span>Code</span>
            </motion.a>
          )}
          
          {demoLink && (
            <motion.a 
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-neobrutalism-cyan transition-colors"
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
