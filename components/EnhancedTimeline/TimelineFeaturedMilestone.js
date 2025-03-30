import { motion } from 'framer-motion';

const TimelineFeaturedMilestone = ({ milestone, index, isInView }) => {
  return (
    <motion.div
      className="mx-auto max-w-5xl relative z-30"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1, delay: 0.1 + (index * 0.1) }}
    >
      {/* Connection to timeline - vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 -top-16 bg-accent/50"></div>
      
      {/* Connection to timeline - horizontal line for desktop */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 hidden md:block">
        <div className="relative -top-px">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-accent/50"></div>
        </div>
      </div>
      
      {/* Featured milestone card */}
      <div className="bg-dark-gray/30 backdrop-blur-sm rounded-xl overflow-hidden border border-accent/30 hover:border-accent/50 transition-all duration-500 shadow-lg shadow-accent/5 hover:shadow-accent/15 group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="relative overflow-hidden">
            {/* Image and overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent mix-blend-overlay z-10"></div>
            <div className="aspect-video md:h-full relative overflow-hidden">
              <motion.img 
                src={milestone.image} 
                alt={milestone.title} 
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
            </div>
            
            {/* Year badge */}
            <div className="absolute top-4 left-4 bg-dark-gray/80 backdrop-blur-sm px-4 py-2 rounded-md border border-accent/50 z-20">
              <div className="text-accent font-mono font-bold text-2xl">{milestone.year}</div>
            </div>
            
            {/* Data visualization overlay */}
            <div className="absolute top-4 right-4 bg-dark-gray/70 backdrop-blur-sm px-3 py-1 rounded-md border border-accent/30 z-20 text-xs font-mono text-accent/80">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span>MILESTONE.DATA</span>
              </div>
            </div>
            
            {/* Animated scanner line */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div 
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" 
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ 
                  duration: 3, 
                  ease: "linear", 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>
          </div>
          
          {/* Content side */}
          <div className="p-8 flex flex-col justify-center relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute -right-20 top-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
            
            {/* Icon and title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <i className={`fas ${milestone.icon} text-lg`}></i>
              </div>
              <h3 className="text-2xl font-bold text-accent">{milestone.title}</h3>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 mb-6 relative z-10">{milestone.description}</p>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {milestone.stats.map((stat, idx) => (
                <div key={idx} className="bg-dark/50 rounded-lg p-4 border border-gray-800 group-hover:border-accent/30 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`fas ${stat.icon} text-accent text-sm`}></i>
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                  <div className="text-2xl text-accent font-mono">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Connection to timeline - vertical line for next item */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 -bottom-16 bg-accent/50"></div>
    </motion.div>
  );
};

export default TimelineFeaturedMilestone;