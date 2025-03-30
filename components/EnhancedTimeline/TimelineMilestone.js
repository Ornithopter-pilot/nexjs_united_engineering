import { motion } from 'framer-motion';

const TimelineMilestone = ({ milestone, index, isInView, isLeft }) => {
  return (
    <div className={`flex items-center ${isLeft ? 'flex-row-reverse' : ''}`}>
      <motion.div 
        className={`w-5/12 ${isLeft ? 'text-right pr-16' : 'pl-16'}`}
        initial={{ opacity: 0, x: isLeft ? 80 : -80 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 80 : -80 }}
        transition={{ duration: 0.8, delay: 0.1 + (index * 0.1) }}
      >
        <div className="bg-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-500 group relative overflow-hidden">
          {/* Gradient background that reveals on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Year badge */}
          <div className="mb-3 inline-block bg-accent/10 px-4 py-1 rounded-md">
            <span className="text-accent font-mono font-bold text-xl">{milestone.year}</span>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <i className={`fas ${milestone.icon} text-accent text-lg`}></i>
              <h3 className="text-xl font-bold group-hover:text-accent transition-colors duration-300">{milestone.title}</h3>
            </div>
            
            <p className="text-gray-300">{milestone.description}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Timeline node */}
      <motion.div 
        className="w-2/12 flex justify-center relative"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
      >
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute -inset-4 rounded-full bg-accent/10 blur-md opacity-70"></div>
          
          {/* Main node */}
          <div className="h-10 w-10 bg-dark-gray rounded-full border-4 border-accent flex items-center justify-center z-10 relative">
            <div className="h-3 w-3 bg-accent rounded-full animate-pulse"></div>
          </div>
          
          {/* Animated ping effect */}
          <span className="absolute flex h-10 w-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-20"></span>
          </span>
        </div>
      </motion.div>
      
      <div className="w-5/12"></div>
    </div>
  );
};

export default TimelineMilestone;