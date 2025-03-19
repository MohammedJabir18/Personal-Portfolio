
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/#about' },
    { title: 'Projects', path: '/#projects' },
    { title: 'Skills', path: '/#skills' },
    { title: 'Contact', path: '/#contact' },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com/MohammedJabir18', ariaLabel: 'GitHub Profile' },
    { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/mohammed--jabir/', ariaLabel: 'LinkedIn Profile' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com/mohammedjabir__', ariaLabel: 'Twitter Profile' },
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/mohammedjabir__/', ariaLabel: 'Instagram Profile' },
    { icon: <Mail size={20} />, url: 'mailto:jabirahmedz111@gmail.com', ariaLabel: 'Email Contact' },
  ];

  // Variants for menu animations
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  const socialVariants = {
    closed: { opacity: 0, y: 20 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24 
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/lovable-uploads/c7d31be7-4be5-41eb-9718-89ddccf2e6db.png" alt="Mohammed Jabir" className="object-contain" />
              <AvatarFallback className="bg-neobrutalism-dark text-neobrutalism-purple">MJ</AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-neobrutalism-purple after:via-neobrutalism-blue after:to-neobrutalism-cyan after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              Mohammed Jabir
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.title} 
                  href={link.path} 
                  className="relative neo-underline text-white hover:text-neobrutalism-cyan transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <motion.button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neobrutalism-purple transition-colors p-2 z-50 relative"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-black/95 pt-20 px-4 z-40 flex flex-col justify-between h-full"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <motion.a 
                  key={link.title} 
                  href={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-white hover:text-neobrutalism-purple transition-colors transform"
                  variants={itemVariants}
                  whileHover={{ x: 10, color: "#9D4EDD" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.title}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="flex justify-center space-x-6 py-10"
              variants={socialVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-white"
                  whileHover={{ 
                    scale: 1.2, 
                    color: "#00FFFF",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 24  
                    }
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Close button with floating animation at the bottom */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-28 right-6 bg-neobrutalism-purple text-white p-3 rounded-full shadow-brutal-sm"
              whileHover={{ scale: 1.1, boxShadow: "none" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 300,
                  damping: 24  
                }
              }}
              exit={{ opacity: 0, y: 20 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                <X size={24} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
