
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">MJ</Link>

          {/* Desktop Navigation */}
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
            
            <div className="flex items-center space-x-4 ml-4">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-neobrutalism-purple transition-colors"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 pt-20 px-4 z-40 flex flex-col justify-between h-full">
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-white hover:text-neobrutalism-purple transition-colors"
              >
                {link.title}
              </a>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 py-10">
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
      )}
    </nav>
  );
};

export default Navbar;
