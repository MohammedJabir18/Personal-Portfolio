
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import ProjectCard from '../components/ProjectCard';
import SkillChart from '../components/SkillChart';
import TimelineItem from '../components/TimelineItem';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';

const Index: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Data Science Enthusiast & Developer';
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    // Typing animation for hero section
    let i = 0;
    const typeText = () => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeText, 100);
      }
    };
    
    setTimeout(typeText, 1000);
  }, []);
  
  // Project data
  const projects = [
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for visualizing complex datasets with customizable filters and real-time updates.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
      technologies: ['Python', 'React', 'D3.js', 'Flask'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#'
    },
    {
      title: 'Machine Learning Classifier',
      description: 'A classification model for predicting customer behavior with feature engineering and model evaluation.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
      technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas'],
      githubLink: 'https://github.com/MohammedJabir18'
    },
    {
      title: 'Time Series Forecasting',
      description: 'Time series analysis and forecasting for financial data using ARIMA, LSTM, and Prophet models.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
      technologies: ['Python', 'TensorFlow', 'Prophet', 'Matplotlib'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#'
    }
  ];
  
  // Skill data
  const programmingSkills = [
    { name: 'Python', value: 85, color: '#3A86FF' },
    { name: 'JavaScript', value: 70, color: '#9D4EDD' },
    { name: 'SQL', value: 75, color: '#00FFFF' },
    { name: 'R', value: 60, color: '#FF8600' }
  ];
  
  const dataSkills = [
    { name: 'pandas', value: 80, color: '#3A86FF' },
    { name: 'scikit-learn', value: 75, color: '#9D4EDD' },
    { name: 'TensorFlow', value: 65, color: '#00FFFF' },
    { name: 'Tableau', value: 60, color: '#FF8600' },
    { name: 'PowerBI', value: 70, color: '#FB5607' }
  ];
  
  const webSkills = [
    { name: 'HTML/CSS', value: 85, color: '#3A86FF' },
    { name: 'React', value: 70, color: '#9D4EDD' },
    { name: 'Node.js', value: 60, color: '#00FFFF' },
    { name: 'Flask', value: 65, color: '#FF8600' }
  ];
  
  // Timeline data
  const timelineItems = [
    {
      year: '2023 - Present',
      title: 'Data Science Freelancer',
      subtitle: 'Self-employed',
      description: 'Working on various data science projects for clients, focusing on machine learning models and data visualization solutions.'
    },
    {
      year: '2021 - 2023',
      title: 'Data Science Certification',
      subtitle: 'Online Learning Platforms',
      description: 'Completed multiple certifications in data science, machine learning, and data visualization through platforms like Coursera and DataCamp.'
    },
    {
      year: '2018 - 2021',
      title: 'Bachelor\'s Degree',
      subtitle: 'Computer Science',
      description: 'Studied computer science with a focus on algorithms, data structures, and fundamentals of artificial intelligence.'
    }
  ];

  return (
    <div className={`min-h-screen bg-neobrutalism-dark text-white ${isLoaded ? 'animate-in' : 'opacity-0'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        <ParticleBackground />
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient">Mohammed Jabir</span>
            </h1>
            <div className="h-8 md:h-10">
              <p className="text-xl md:text-2xl text-white/80">{typedText}</p>
            </div>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="#projects" className="neo-button">View My Work</a>
              <a href="#contact" className="neo-button-outline">Get In Touch</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-white/80 hover:text-white">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="text-gradient">Me</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="neo-card overflow-hidden">
              <img 
                src="/lovable-uploads/c7d31be7-4be5-41eb-9718-89ddccf2e6db.png" 
                alt="Mohammed Jabir" 
                className="w-full h-auto transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Mohammed Jabir</h3>
              <p className="text-white/80 mb-6">
                I'm a self-taught data scientist passionate about uncovering insights from data. 
                With expertise in machine learning, data analysis, and visualization, I transform complex 
                datasets into actionable intelligence that drives decision-making.
              </p>
              <p className="text-white/80 mb-6">
                My journey in data science began with a curiosity about patterns and predictions. 
                Through continuous learning and hands-on projects, I've developed skills in Python, 
                machine learning algorithms, and data visualization techniques.
              </p>
              
              <a 
                href="#" 
                className="neo-button inline-flex items-center gap-2"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
          
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-center">My Journey</h3>
            <div className="max-w-3xl mx-auto">
              {timelineItems.map((item, index) => (
                <TimelineItem 
                  key={index}
                  year={item.year}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/20 grid-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/80 text-center max-w-2xl mx-auto mb-12">
            Here are some of my recent data science and development projects. 
            Each demonstrates different aspects of my technical skills and problem-solving approach.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                githubLink={project.githubLink}
                demoLink={project.demoLink}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://github.com/MohammedJabir18"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-button-outline inline-flex items-center gap-2"
            >
              <span>View More on GitHub</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-white/80 text-center max-w-2xl mx-auto mb-12">
            I've developed expertise across various technologies and domains, with a focus on data science and software development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillChart 
              title="Programming Languages" 
              skills={programmingSkills} 
            />
            <SkillChart 
              title="Data Science & ML" 
              skills={dataSkills} 
            />
            <SkillChart 
              title="Web Development" 
              skills={webSkills} 
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20 grid-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-white/80 text-center max-w-2xl mx-auto mb-12">
            Have a project in mind or want to discuss a collaboration? Feel free to reach out!
          </p>
          
          <ContactForm />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
