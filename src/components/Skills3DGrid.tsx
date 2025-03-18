
import React from 'react';
import { motion } from 'framer-motion';
import Skill3DCard from './Skill3DCard';

interface Skill {
  name: string;
  value: number;
  color: string;
}

interface Skills3DGridProps {
  title: string;
  skills: Skill[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Skills3DGrid: React.FC<Skills3DGridProps> = ({ title, skills }) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-bold mb-6 text-center">{title}</h3>
      
      <motion.div 
        className="grid grid-cols-2 gap-4 flex-grow"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((skill, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Skill3DCard skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills3DGrid;
