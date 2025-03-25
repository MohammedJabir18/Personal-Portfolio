import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from './ProjectCard';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import { Code, Globe, BarChart3, Database, Beaker, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  category: 'python' | 'web' | 'analytics' | 'data-science' | 'experimental';
}

interface ProjectCategoriesProps {
  projects: Project[];
}

const ProjectCategories: React.FC<ProjectCategoriesProps> = ({ projects }) => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("latest");
  const [animationComplete, setAnimationComplete] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const checkScrollPosition = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScrollPosition();
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  // Initial loading animation when component mounts
  useEffect(() => {
    // Start with loading animation on initial mount
    if (initialLoad) {
      setLoading(true);
      setLoadingProgress(0);
      setAnimationComplete(false);
      
      // Simulate incremental loading
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      // Complete loading after animation
      const timer = setTimeout(() => {
        setLoading(false);
        setInitialLoad(false);
      }, 1100);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [initialLoad]);

  // Reset loading state and animation status when tab changes
  useEffect(() => {
    if (!initialLoad) {
      setLoading(true);
      setLoadingProgress(0);
      setAnimationComplete(false);
      
      // Simulate incremental loading
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      // Complete loading after animation
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1100); // Slightly longer than the progress animation

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [activeTab, initialLoad]);

  // Get only 4 projects for mobile view in Latest tab
  const getLatestProjects = () => {
    return isMobile ? projects.slice(0, 4) : projects.slice(0, 6);
  };

  const latestProjects = getLatestProjects();

  const getFilteredProjects = () => {
    switch (activeTab) {
      case 'latest':
        return latestProjects;
      case 'python':
        return projects.filter(project => project.category === 'python');
      case 'web':
        return projects.filter(project => project.category === 'web');
      case 'analytics':
        return projects.filter(project => project.category === 'analytics');
      case 'data-science':
        return projects.filter(project => project.category === 'data-science');
      case 'experimental':
        return projects.filter(project => project.category === 'experimental');
      default:
        return latestProjects;
    }
  };

  const filteredProjects = getFilteredProjects();

  const projectCounts = {
    latest: isMobile ? 4 : 6,
    python: projects.filter(p => p.category === 'python').length,
    web: projects.filter(p => p.category === 'web').length,
    analytics: projects.filter(p => p.category === 'analytics').length,
    'data-science': projects.filter(p => p.category === 'data-science').length,
    experimental: projects.filter(p => p.category === 'experimental').length
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Handle animation completion
  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div className="w-full relative">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-neobrutalism-purple/20 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neobrutalism-blue/20 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
      
      <Tabs 
        defaultValue="latest" 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="relative mb-12 overflow-visible">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-neobrutalism-purple via-neobrutalism-blue to-neobrutalism-cyan"></div>
          
          <div className="flex items-center justify-center gap-4">
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  aria-label="Scroll categories left"
                  className="hidden md:block p-2 rounded-full bg-neobrutalism-dark text-neobrutalism-cyan border border-neobrutalism-cyan/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, x: 2, y: 2 }}
                  style={{ boxShadow: "4px 4px 0px 0px #000" }}
                  onClick={scrollLeft}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ChevronLeft size={16} />
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>

            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto no-scrollbar pb-2"
            >
              <TabsList className="w-full flex justify-start md:justify-center bg-transparent gap-2 md:gap-4 min-w-max">
                <TabsTrigger 
                  value="latest" 
                  className="group relative data-[state=active]:text-white transition-all duration-300 text-sm md:text-base px-3 py-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neobrutalism-purple to-neobrutalism-blue opacity-0 group-hover:opacity-10 data-[state=active]:opacity-20 rounded-lg transition-opacity duration-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="hidden md:block rotate-0 group-hover:rotate-12 transition-transform duration-500">⭐</span>
                    <span>Latest Projects</span>
                    <span className="inline-flex items-center justify-center bg-neobrutalism-purple/20 text-neobrutalism-purple px-1.5 py-0.5 rounded-full text-xs">
                      {projectCounts.latest}
                    </span>
                  </div>
                  <motion.div 
                    className="absolute bottom-[-9px] left-0 w-full h-1 bg-gradient-to-r from-neobrutalism-purple to-neobrutalism-blue rounded-t-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTab === 'latest' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="python" 
                  className="group relative data-[state=active]:text-white transition-all duration-300 text-sm md:text-base px-3 py-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neobrutalism-blue to-neobrutalism-purple opacity-0 group-hover:opacity-10 data-[state=active]:opacity-20 rounded-lg transition-opacity duration-300"></div>
                  <div className="flex items-center gap-2">
                    <Code className="hidden md:block w-4 h-4 text-neobrutalism-cyan group-hover:scale-125 transition-transform duration-500" />
                    <span>Python Projects</span>
                    <span className="inline-flex items-center justify-center bg-neobrutalism-blue/20 text-neobrutalism-blue px-1.5 py-0.5 rounded-full text-xs">
                      {projectCounts.python}
                    </span>
                  </div>
                  <motion.div 
                    className="absolute bottom-[-9px] left-0 w-full h-1 bg-gradient-to-r from-neobrutalism-blue to-neobrutalism-purple rounded-t-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTab === 'python' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="web" 
                  className="group relative data-[state=active]:text-white transition-all duration-300 text-sm md:text-base px-3 py-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neobrutalism-cyan to-neobrutalism-blue opacity-0 group-hover:opacity-10 data-[state=active]:opacity-20 rounded-lg transition-opacity duration-300"></div>
                  <div className="flex items-center gap-2">
                    <Globe className="hidden md:block w-4 h-4 text-neobrutalism-cyan group-hover:scale-125 transition-transform duration-500" />
                    <span>Web Development</span>
                    <span className="inline-flex items-center justify-center bg-neobrutalism-cyan/20 text-neobrutalism-cyan px-1.5 py-0.5 rounded-full text-xs">
                      {projectCounts.web}
                    </span>
                  </div>
                  <motion.div 
                    className="absolute bottom-[-9px] left-0 w-full h-1 bg-gradient-to-r from-neobrutalism-cyan to-neobrutalism-blue rounded-t-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTab === 'web' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="analytics" 
                  className="group relative data-[state=active]:text-white transition-all duration-300 text-sm md:text-base px-3 py-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neobrutalism-blue to-neobrutalism-cyan opacity-0 group-hover:opacity-10 data-[state=active]:opacity-20 rounded-lg transition-opacity duration-300"></div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="hidden md:block w-4 h-4 text-neobrutalism-cyan group-hover:scale-125 transition-transform duration-500" />
                    <span>Analytics & Visualization</span>
                    <span className="inline-flex items-center justify-center bg-neobrutalism-blue/20 text-neobrutalism-blue px-1.5 py-0.5 rounded-full text-xs">
                      {projectCounts.analytics}
                    </span>
                  </div>
                  <motion.div 
                    className="absolute bottom-[-9px] left-0 w-full h-1 bg-gradient-to-r from-neobrutalism-blue to-neobrutalism-cyan rounded-t-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTab === 'analytics' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="data-science" 
                  className="group relative data-[state=active]:text-white transition-all duration-300 text-sm md:text-base px-3 py-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neobrutalism-purple to-neobrutalism-cyan opacity-0 group-hover:opacity-10 data-[state=active]:opacity-20 rounded-lg transition-opacity duration-300"></div>
                  <div className="flex items-center gap-2">
                    <Database className="hidden md:block w-4 h-4 text-neobrutalism-purple group-hover:scale-125 transition-transform duration-500" />
                    <span>Data Science</span>
                    <span className="inline-flex items-center justify-center bg-neobrutalism-purple/20 text-neobrutalism-purple px-1.5 py-0.5 rounded-full text-xs">
                      {projectCounts['data-science']}
                    </span>
                  </div>
                  <motion.div 
                    className="absolute bottom-[-9px] left-0 w-full h-1 bg-gradient-to-r from-neobrutalism-purple to-neobrutalism-cyan rounded-t-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTab === 'data-science' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="experimental" 
                  className="group relative data-[state=active]:text-white transition-all duration-300 text-sm md:text-base px-3 py-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neobrutalism-cyan to-neobrutalism-purple opacity-0 group-hover:opacity-10 data-[state=active]:opacity-20 rounded-lg transition-opacity duration-300"></div>
                  <div className="flex items-center gap-2">
                    <Beaker className="hidden md:block w-4 h-4 text-neobrutalism-cyan group-hover:scale-125 transition-transform duration-500" />
                    <span>Experimental</span>
                    <span className="inline-flex items-center justify-center bg-neobrutalism-cyan/20 text-neobrutalism-cyan px-1.5 py-0.5 rounded-full text-xs">
                      {projectCounts.experimental}
                    </span>
                  </div>
                  <motion.div 
                    className="absolute bottom-[-9px] left-0 w-full h-1 bg-gradient-to-r from-neobrutalism-cyan to-neobrutalism-purple rounded-t-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeTab === 'experimental' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  aria-label="Scroll categories right"
                  className="hidden md:block p-2 rounded-full bg-neobrutalism-dark text-neobrutalism-cyan border border-neobrutalism-cyan/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, x: 2, y: 2 }}
                  style={{ boxShadow: "4px 4px 0px 0px #000" }}
                  onClick={scrollRight}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ChevronRight size={16} />
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="perspective-1000 w-full"
          >
            {loading ? (
              <div className="space-y-8">
                <motion.div 
                  className="max-w-sm mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-center text-neobrutalism-cyan mb-2 font-medium">Loading projects...</p>
                  <Progress value={loadingProgress} className="h-2 bg-neobrutalism-dark/50" />
                  <motion.div 
                    className="h-0.5 w-full mt-1 bg-gradient-to-r from-neobrutalism-purple via-neobrutalism-blue to-neobrutalism-cyan rounded-full opacity-70"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div 
                      key={i} 
                      className="neo-card h-[380px] overflow-hidden rounded-xl relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: i * 0.1,
                          duration: 0.5,
                          type: "spring"
                        }
                      }}
                    >
                      <div className="h-48 w-full relative overflow-hidden">
                        <Skeleton className="h-full w-full absolute inset-0" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="p-5 bg-neobrutalism-dark">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-20 w-full mb-4" />
                        <div className="flex flex-wrap gap-2 mb-4">
                          {[1, 2, 3].map((j) => (
                            <Skeleton key={j} className="h-6 w-16" />
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                      
                      {/* Shimmer overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={handleAnimationComplete}
              >
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <motion.div 
                      key={`${activeTab}-${project.title}`} 
                      variants={itemVariants} 
                      className="perspective-1000 h-full"
                      custom={index}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="col-span-3 text-center py-16 neo-card-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-neobrutalism-purple mb-2">Coming Soon!</h3>
                    <p className="text-white/80">Projects in this category are being developed. Check back later!</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default ProjectCategories;