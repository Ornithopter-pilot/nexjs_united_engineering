import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TechnicalExcellence = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  
  const specs = [
    {
      label: "Precision Tolerance",
      value: "±0.001mm",
      icon: "fa-bullseye",
      description: "Ultra-precision machining capability with exceptional dimensional accuracy"
    },
    {
      label: "Surface Finish",
      value: "<0.1Ra",
      icon: "fa-vector-square",
      description: "Superior surface quality through advanced finishing processes"
    },
    {
      label: "Quality Standard",
      value: "ISO 9001/13485",
      icon: "fa-certificate",
      description: "Certified processes ensuring consistent quality throughout manufacturing"
    },
    {
      label: "Advanced Metrology Systems",
      value: "0.1μm Accuracy",
      icon: "fa-ruler-combined",
      description: "Multi-axis laser interferometry and coordinate measuring systems with digital documentation for complete component traceability"
    }
  ];

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="py-16 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="bg-dark-gray/10 backdrop-blur-sm rounded-xl px-8 py-10 border border-gray-800/50 relative overflow-hidden">
          {/* Background particle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full bg-accent"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.1 + Math.random() * 0.2,
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
                  animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            {/* Title Section */}
            <div className="mb-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-6"
              >
                Technical Excellence
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-300 mb-6 max-w-3xl"
              >
                Our engineering team combines decades of experience with cutting-edge technology to push the boundaries of what's possible in precision manufacturing.
              </motion.p>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: "60px" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-accent rounded-full"
              />
            </div>
            
            {/* Technical specs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-dark/20 backdrop-blur-sm rounded-lg p-6 border border-gray-800/40 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-400 mb-2">{spec.label}</div>
                    
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <i className={`fas ${spec.icon} text-accent text-xl`}></i>
                      </div>
                      <div className="font-mono text-2xl text-accent">{spec.value}</div>
                    </div>
                    
                    <div className="text-sm text-gray-300">{spec.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechnicalExcellence;