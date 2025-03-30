import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CoreTechnologies = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  
  const technologies = [
    {
      title: "Micro-Precision Manufacturing",
      description: "Ultra-precise machining capabilities down to ±0.001mm tolerances with advanced surface finishing for exceptional component quality.",
      icon: "fa-microchip"
    },
    {
      title: "Digital Twin Modeling",
      description: "Virtual component simulation and testing using advanced computational models to validate designs before physical manufacturing.",
      icon: "fa-cubes"
    },
    {
      title: "AI-Driven Process Optimization",
      description: "Machine learning algorithms that continuously optimize machining parameters to enhance precision, efficiency, and material properties.",
      icon: "fa-brain"
    },
    {
      title: "Advanced Material Science",
      description: "Specialized heat treatments and material formulations that enhance component performance in extreme operational environments.",
      icon: "fa-atom"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-dark-gray/70">
        <div 
          className="absolute inset-0 opacity-20 bg-blend-overlay"
          style={{
            backgroundImage: "url('/images/revamp_products/Background Texture-Pattern for Section Dividers.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay"
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
            The <span className="text-accent">Science</span> Behind Our Precision
          </h2>
          
          <p className="text-xl text-gray-300">
            Our advanced manufacturing capabilities are built on four core technological pillars 
            that enable us to achieve exceptional precision and performance.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Core Technologies Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border border-accent/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-transparent opacity-60 mix-blend-overlay"></div>
              <img 
                src="/images/revamp_products/Core Technologies Section Visualizations.png" 
                alt="Core Technologies Visualization" 
                className="w-full h-auto"
              />
              
              {/* Tech Scanning Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent" 
                initial={{ y: -500 }}
                animate={{ y: 500 }}
                transition={{ 
                  duration: 3, 
                  ease: "linear", 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              
              {/* Tech details overlay - top right */}
              <div className="absolute top-3 right-3 bg-dark-gray/80 backdrop-blur-sm border border-accent/30 rounded-md p-3 text-xs font-mono">
                <div className="text-accent mb-1">MEASUREMENT</div>
                <div className="text-white">±0.001mm precision</div>
              </div>
              
              {/* Tech details overlay - bottom left */}
              <div className="absolute bottom-3 left-3 bg-dark-gray/80 backdrop-blur-sm border border-accent/30 rounded-md p-3 text-xs font-mono">
                <div className="text-accent mb-1">SYSTEM</div>
                <div className="flex justify-between gap-4">
                  <span>CAPACITY:</span>
                  <span>98.3%</span>
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-accent/20 rounded-xl blur-md -z-10"></div>
          </motion.div>
          
          {/* Technologies List */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all duration-300">
                    <i className={`fas ${tech.icon} text-accent text-xl`}></i>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">{tech.title}</h3>
                    <p className="text-gray-300">{tech.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnologies;