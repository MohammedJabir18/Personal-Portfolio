
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
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
    <div className="neo-card group h-full overflow-hidden flex flex-col">
      {/* Project Image with overlay on hover */}
      <div className="relative overflow-hidden h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neobrutalism-dark opacity-70"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-neobrutalism-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-5 border-t-2 border-neobrutalism-purple">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 mb-4 flex-grow">{description}</p>
        
        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span key={index} className="bg-neobrutalism-dark px-2 py-1 text-xs font-semibold text-neobrutalism-cyan border border-neobrutalism-cyan/50">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Links */}
        <div className="flex space-x-4">
          {githubLink && (
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-neobrutalism-purple transition-colors"
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          )}
          
          {demoLink && (
            <a 
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:text-neobrutalism-cyan transition-colors"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
