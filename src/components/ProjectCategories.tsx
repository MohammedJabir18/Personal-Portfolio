import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from './ProjectCard';
import { Skeleton } from './ui/skeleton';
import { Code, Globe, BarChart3, Database, Beaker, ChevronLeft, ChevronRight } from 'lucide-react';

// Define the project data structure
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
  const [activeTab, setActiveTab] = useState("latest");
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Reference for the scrollable container

  // Simulate loading delay
React.useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => {
    setLoading(false);
  }, 100); // fast loading delay (100ms)
  return () => clearTimeout(timer);
}, [activeTab]);

  // Get the latest 6 projects for the "Latest Projects" tab
  const latestProjects = projects.slice(0, 6);
  
  // Filter projects based on active category
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

  // Count projects in each category for badges
  const projectCounts = {
    latest: 6,
    python: projects.filter(p => p.category === 'python').length,
    web: projects.filter(p => p.category === 'web').length,
    analytics: projects.filter(p => p.category === 'analytics').length,
    'data-science': projects.filter(p => p.category === 'data-science').length,
    experimental: projects.filter(p => p.category === 'experimental').length
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, rotateY: -90, transition: { duration: 0.4, ease: "easeIn" } }
  };

  // Scroll functions
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

  return (
    <div className="w-full relative">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-neobrutalism-purple/20 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neobrutalism-blue/20 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
      
      <Tabs 
        defaultValue="latest" 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="relative mb-12 overflow-visible">
          {/* Gradient line below tabs */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-neobrutalism-purple via-neobrutalism-blue to-neobrutalism-cyan"></div>
          
          {/* Flex container with stylish buttons and tabs */}
          <div className="flex items-center justify-center gap-4">
            {/* Left Button (Start of Categories) */}
            <motion.button
              aria-label="Scroll categories left"
              className="hidden md:block p-2 rounded-full bg-neobrutalism-dark text-neobrutalism-cyan border border-neobrutalism-cyan/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, x: 2, y: 2 }}
              style={{ boxShadow: "4px 4px 0px 0px #000" }}
              onClick={scrollLeft}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ChevronLeft size={16} />
              </motion.span>
            </motion.button>

            {/* TabsList with scrollable wrapper */}
            <div 
              ref={scrollContainerRef} // Attach ref to the scrollable div
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

            {/* Right Button (End of Categories) */}
            <motion.button
              aria-label="Scroll categories right"
              className="hidden md:block p-2 rounded-full bg-neobrutalism-dark text-neobrutalism-cyan border border-neobrutalism-cyan/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, x: 2, y: 2 }}
              style={{ boxShadow: "4px 4px 0px 0px #000" }}
              onClick={scrollRight}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ChevronRight size={16} />
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Tab content with animations */}
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="perspective-1000"
          >
            {loading ? (
              // Loading skeleton with 3D effect
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div 
                    key={i} 
                    className="neo-card h-[380px] overflow-hidden"
                    initial={{ opacity: 0, y: 20, rotateX: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0,
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
                    <div className="p-5">
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
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <motion.div 
                      key={project.title} 
                      variants={itemVariants} 
                      className="perspective-1000 transform-gpu"
                      whileHover={{ 
                        z: 10, 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
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