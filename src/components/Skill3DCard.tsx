
import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  value: number;
  color: string;
}

interface Skill3DCardProps {
  skill: Skill;
}

const Skill3DCard: React.FC<Skill3DCardProps> = ({ skill }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-lg overflow-hidden shadow-brutal bg-black/30 border-2 border-t-0 border-l-0 border-r-2 border-b-2 border-black relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 pointer-events-none" />
      
      <div className="p-6 h-full flex flex-col">
        <div 
          className="w-20 h-20 mb-4 rounded-full flex items-center justify-center text-2xl font-bold"
          style={{ background: `${skill.color}20`, color: skill.color }}
        >
          {skill.value}%
        </div>
        
        <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
        
        <div className="mt-auto">
          <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${skill.value}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full"
              style={{ background: skill.color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skill3DCard;
