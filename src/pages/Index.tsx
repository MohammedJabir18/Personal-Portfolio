
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import TimelineItem from '../components/TimelineItem';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import AvatarProfile from '../components/AvatarProfile';
import LoadingScreen from '../components/LoadingScreen';
import Skills3DGrid from '../components/Skills3DGrid';
import ProjectCategories from '../components/ProjectCategories';
import { ChevronDown, Download } from 'lucide-react';
import { Project } from '../components/ProjectCategories';

const Index: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Data Science Enthusiast & Developer';
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Typing animation for hero section
    let i = 0;
    const typeText = () => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeText, 100);
      }
    };

    if (!loading) {
      setTimeout(() => {
        setIsLoaded(true);
        setTimeout(typeText, 1000);
      }, 500);
    }
  }, [loading]);

  // Project data with categories
  const projects: Project[] = [
    // Latest/Featured Projects (will show in Latest tab)
    {
      title: 'Brewmoon Cafe',
      description: 'A modern cafe website featuring menu, gallery, and contact information, built with Next.js.',
      image: '/Images/brewmoon.png', // <-- Replace with actual image path
      technologies: ['React', 'Next.js', 'TypeScript', 'Framer Motion'],
      githubLink: 'https://github.com/MohammedJabir18/brewmoon-cafe.git',
      demoLink: 'https://brewmoon-cafe.vercel.app',
      category: 'web'
    },
    {
      title: 'Machine Learning Classifier',
      description: 'A classification model for predicting customer behavior with feature engineering and model evaluation.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
      technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'data-science'
    },
    {
      title: 'Time Series Forecasting',
      description: 'Time series analysis and forecasting for financial data using ARIMA, LSTM, and Prophet models.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
      technologies: ['Python', 'TensorFlow', 'Prophet', 'Matplotlib'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#',
      category: 'analytics'
    },
    // Additional projects to have 6 in the "Latest" tab
    {
      title: 'Natural Language Processing Tool',
      description: 'Text analysis tool that processes and categorizes large volumes of text data using advanced NLP algorithms.',
      image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&q=80',
      technologies: ['Python', 'NLTK', 'spaCy', 'Transformers'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#',
      category: 'python'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React and Tailwind CSS featuring 3D animations and interactions.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#',
      category: 'web'
    },
    {
      title: 'Recommender System',
      description: 'Content-based and collaborative filtering recommender system for e-commerce product suggestions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      technologies: ['Python', 'scikit-learn', 'Surprise', 'FastAPI'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'data-science'
    },

    // Python Projects (some overlap with Latest)
    {
      title: 'Data Cleaning Utility',
      description: 'Python utility for automated data cleaning, handling missing values, outliers, and standardization.',
      image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&q=80',
      technologies: ['Python', 'pandas', 'NumPy', 'Jupyter'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'python'
    },
    {
      title: 'Web Scraper',
      description: 'Robust web scraping tool that extracts and structures data from websites with rate limiting and proxy rotation.',
      image: 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&q=80',
      technologies: ['Python', 'BeautifulSoup', 'Scrapy', 'Selenium'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'python'
    },

    // Web Development Projects (some overlap with Latest)
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce platform with product catalog, user authentication, and payment processing.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#',
      category: 'web'
    },
    {
      title: 'Real-time Chat Application',
      description: 'WebSocket-based chat application supporting private conversations, group chats, and file sharing.',
      image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80',
      technologies: ['React', 'Socket.io', 'Express', 'Firebase'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'web'
    },

    // Analytics & Visualization Projects
    {
      title: 'Interactive Data Explorer',
      description: 'Web-based interactive data exploration tool with customizable visualizations and statistical analysis.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80',
      technologies: ['D3.js', 'React', 'Python', 'Flask'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#',
      category: 'analytics'
    },
    {
      title: 'COVID-19 Trend Visualizer',
      description: 'Dashboard for visualizing COVID-19 data trends across countries with time-series analysis.',
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80',
      technologies: ['Python', 'Plotly', 'Dash', 'pandas'],
      githubLink: 'https://github.com/MohammedJabir18',
      demoLink: '#',
      category: 'analytics'
    },

    // Data Science Projects
    {
      title: 'Customer Segmentation',
      description: 'Machine learning model for customer segmentation using clustering techniques and demographic data.',
      image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80',
      technologies: ['Python', 'scikit-learn', 'K-means', 'Matplotlib'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'data-science'
    },
    {
      title: 'Predictive Maintenance',
      description: 'Predictive maintenance system for industrial equipment using IoT sensor data and machine learning.',
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80',
      technologies: ['Python', 'TensorFlow', 'Time Series', 'IoT'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'data-science'
    },

    // Experimental Projects
    {
      title: 'AR Data Visualization',
      description: 'Experimental augmented reality application for visualizing complex data in 3D space.',
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80',
      technologies: ['Unity', 'ARKit', 'C#', '3D Visualization'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'experimental'
    },
    {
      title: 'Blockchain Analytics',
      description: 'Experimental tool for blockchain data analysis and transaction pattern visualization.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80',
      technologies: ['Python', 'Web3.py', 'Ethereum', 'D3.js'],
      githubLink: 'https://github.com/MohammedJabir18',
      category: 'experimental'
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
      title: "Bachelor's Degree",
      subtitle: 'Computer Science',
      description: 'Studied computer science with a focus on algorithms, data structures, and fundamentals of artificial intelligence.'
    }
  ];

  return (
    <>
      {loading ? (
        <LoadingScreen finishLoading={() => setLoading(false)} />
      ) : (
        <div className={`min-h-screen bg-neobrutalism-dark text-white overflow-x-hidden ${isLoaded ? 'animate-in' : 'opacity-0'}`}>
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

              <div className="grid grid-cols-1 gap-12 items-center">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar with animated border */}
                  <AvatarProfile
                    src="/lovable-uploads/c7d31be7-4be5-41eb-9718-89ddccf2e6db.png"
                    alt="Mohammed Jabir"
                    size="xl"
                  />

                  <h3 className="text-2xl font-bold mb-4">Mohammed Jabir</h3>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                    I'm a self-taught data scientist passionate about uncovering insights from data.
                    With expertise in machine learning, data analysis, and visualization, I transform complex
                    datasets into actionable intelligence that drives decision-making.
                  </p>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto">
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

              {/* New categorized projects component */}
              <ProjectCategories projects={projects} />
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
                <Skills3DGrid
                  title="Programming Languages"
                  skills={programmingSkills}
                />
                <Skills3DGrid
                  title="Data Science & ML"
                  skills={dataSkills}
                />
                <Skills3DGrid
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
      )}
    </>
  );
};

export default Index;
