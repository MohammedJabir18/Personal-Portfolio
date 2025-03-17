
import React from 'react';

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  year,
  title,
  subtitle,
  description
}) => {
  return (
    <div className="flex relative pb-12">
      {/* Timeline line */}
      <div className="absolute inset-0 flex items-center justify-center w-6 h-full">
        <div className="h-full w-0.5 bg-neobrutalism-purple pointer-events-none"></div>
      </div>
      
      {/* Timeline dot */}
      <div className="relative z-10 flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-neobrutalism-dark border-2 border-neobrutalism-purple shadow-brutal-sm"></div>
      
      {/* Content */}
      <div className="flex-grow pl-6">
        <div className="mb-1 flex items-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-neobrutalism-blue/30 border border-neobrutalism-blue/50 text-white mr-3">
            {year}
          </span>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="mb-2 text-neobrutalism-cyan">{subtitle}</div>
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
