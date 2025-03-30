import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const InnovationTimeline = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const milestones = [
    {
      year: "2010",
      title: "Company Founding",
      description: "Established with a vision to transform precision manufacturing through digital innovation and AI-driven processes."
    },
    {
      year: "2015",
      title: "ISO 9001 Certification",
      description: "Achieved quality management certification and expanded manufacturing capabilities with state-of-the-art CNC equipment."
    },
    {
      year: "2020",
      title: "Digital Twin Implementation",
      description: "Pioneered the use of digital twin technology for virtual component development and testing, reducing physical prototyping by 60%.",
      featured: true
    },
    {
      year: "2023",
      title: "AI-Optimization System",
      description: "Launched our proprietary AI process optimization system that continuously improves manufacturing precision and efficiency."
    },
    {
      year: "2025",
      title: "Advanced Materials Division",
      description: "Established dedicated research team focused on next-generation materials engineering for extreme environments."
    }
  ];
  
  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-dark">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/revamp_products/Background Texture-Pattern for Section Dividers.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: "scaleX(-1)"
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Section title removed as requested */}
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-accent">Technology</span> Evolution
          </h2>
          
          <p className="text-xl text-gray-300">
            Charting our journey of continuous innovation and technological advancement
            that has established us as leaders in precision manufacturing.
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
          
          <div className="relative z-10 space-y-24">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {milestone.featured ? (
                  <FeaturedMilestone milestone={milestone} index={index} isInView={isInView} />
                ) : (
                  <StandardMilestone milestone={milestone} index={index} isInView={isInView} isLeft={index % 2 === 0} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StandardMilestone = ({ milestone, index, isInView, isLeft }) => {
  return (
    <div className={`flex items-center ${isLeft ? 'flex-row-reverse' : ''}`}>
      <motion.div 
        className={`w-5/12 ${isLeft ? 'text-right pr-12' : 'pl-12'}`}
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 50 : -50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className="bg-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-accent/30 transition-all duration-300">
          <div className="text-accent font-mono font-bold mb-2">{milestone.year}</div>
          <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
          <p className="text-gray-300 text-sm">{milestone.description}</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="w-2/12 flex justify-center relative"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
      >
        <div className="h-8 w-8 bg-dark-gray rounded-full border-4 border-accent flex items-center justify-center z-10">
          <div className="h-2 w-2 bg-accent rounded-full"></div>
        </div>
      </motion.div>
      
      <div className="w-5/12"></div>
    </div>
  );
};

const FeaturedMilestone = ({ milestone, index, isInView }) => {
  return (
    <motion.div
      className="mx-auto max-w-4xl bg-dark-gray/30 backdrop-blur-sm rounded-xl overflow-hidden border border-accent/30"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image side */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent mix-blend-overlay"></div>
          <img 
            src="/images/revamp_products/Digital Twin Technology - 2020 Milestone.png" 
            alt="Digital Twin Technology" 
            className="w-full h-full object-cover"
          />
          
          {/* Year badge */}
          <div className="absolute top-4 left-4 bg-dark-gray/80 backdrop-blur-sm px-4 py-2 rounded-md border border-accent/50">
            <div className="text-accent font-mono font-bold text-2xl">{milestone.year}</div>
          </div>
          
          {/* Animated scanner line */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
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
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 text-accent">{milestone.title}</h3>
          <p className="text-gray-300 mb-6">{milestone.description}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark/50 rounded-lg p-4 border border-gray-800">
              <div className="text-xs text-gray-400 mb-1">EFFICIENCY GAIN</div>
              <div className="text-2xl text-accent font-mono">60%</div>
            </div>
            <div className="bg-dark/50 rounded-lg p-4 border border-gray-800">
              <div className="text-xs text-gray-400 mb-1">PRECISION</div>
              <div className="text-2xl text-accent font-mono">±0.002mm</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InnovationTimeline;