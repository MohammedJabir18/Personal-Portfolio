
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface Skill {
  name: string;
  value: number;
  color: string;
}

interface SkillChartProps {
  title: string;
  skills: Skill[];
}

const SkillChart: React.FC<SkillChartProps> = ({ title, skills }) => {
  return (
    <div className="neo-card p-6 h-full flex flex-col">
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      <div className="flex-grow w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={skills}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {skills.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillChart;
