
import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com/MohammedJabir18', ariaLabel: 'GitHub Profile' },
    { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/mohammed--jabir/', ariaLabel: 'LinkedIn Profile' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com/mohammedjabir__', ariaLabel: 'Twitter Profile' },
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/mohammedjabir__/', ariaLabel: 'Instagram Profile' },
    { icon: <Mail size={20} />, url: 'mailto:jabirahmedz111@gmail.com', ariaLabel: 'Email Contact' },
  ];

  return (
    <footer className="mt-20 border-t border-neobrutalism-purple/30 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gradient">Mohammed Jabir</h2>
            <p className="mt-2 text-white/70">Data Science Enthusiast & Developer</p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-white hover:text-neobrutalism-purple transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neobrutalism-purple/30 text-center text-white/50">
          <p>© {currentYear} Mohammed Jabir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
