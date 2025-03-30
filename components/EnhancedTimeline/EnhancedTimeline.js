import { useRef, useEffect } from 'react';
import { createPlaceholder2011Image, createPlaceholder2025Image } from '../utils/placeholder';
import TechnicalExcellence from '../TechnicalExcellence';
import { motion, useInView, useAnimation } from 'framer-motion';
import TimelineMilestone from './TimelineMilestone';
import TimelineFeaturedMilestone from './TimelineFeaturedMilestone';

const EnhancedTimeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const contentRef = useRef(null);
  
  // Animation controls
  const sectionControls = useAnimation();
  const timelineControls = useAnimation();
  
  // Check when elements are in view
  const sectionInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const timelineInView = useInView(timelineRef, { once: true, threshold: 0.15 });
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (sectionInView) {
      sectionControls.start('visible');
    }
    if (timelineInView) {
      timelineControls.start('visible');
    }
  }, [sectionInView, timelineInView, sectionControls, timelineControls]);
  
  // Combined milestone data with richer content
  const milestones = [
    {
      year: "2005",
      title: "Foundation",
      description: "Established United Engineering Services in Bangalore with a modest workshop and a small team specializing in precision components for local manufacturing industries.",
      icon: "fa-building"
    },
    {
      year: "2008",
      title: "Market Expansion",
      description: "Expanded service offerings beyond local markets and secured our first major contracts with automotive and industrial machinery manufacturers in South India.",
      icon: "fa-chart-line"
    },
    {
      year: "2011",
      title: "Advanced Manufacturing",
      description: "Relocated to a larger facility and invested in our first advanced CNC machinery to enhance precision capabilities and production capacity.",
      icon: "fa-industry",
      featured: true,
      image: createPlaceholder2011Image(),
      stats: [
        { label: "PRECISION", value: "±0.005mm", icon: "fa-bullseye" },
        { label: "PERFORMANCE", value: "Enhanced", icon: "fa-chart-line" }
      ]
    },
    {
      year: "2014",
      title: "Quality Certification",
      description: "Achieved ISO 9001 certification and began serving aerospace and medical device industries with components requiring exceptional precision and quality assurance.",
      icon: "fa-certificate"
    },
    {
      year: "2017",
      title: "Facility Expansion",
      description: "Expanded to our current manufacturing facility and implemented multi-axis CNC machinery to enhance production capabilities and precision.",
      icon: "fa-expand-alt"
    },
    {
      year: "2020",
      title: "Digital Twin Implementation",
      description: "Pioneered the use of digital twin technology for virtual component development and testing, reducing physical prototyping by 60% and launching our international operations.",
      icon: "fa-cubes",
      featured: true,
      image: "/images/revamp_products/Digital Twin Technology - 2020 Milestone.png",
      stats: [
        { label: "EFFICIENCY", value: "Advanced", icon: "fa-tachometer-alt" },
        { label: "PRECISION", value: "±0.002mm", icon: "fa-bullseye" }
      ]
    },
    {
      year: "2023",
      title: "AI Process Optimization",
      description: "Launched our proprietary AI process optimization system that continuously improves manufacturing precision while achieving ISO 14001 environmental management certification.",
      icon: "fa-brain"
    },
    {
      year: "2025",
      title: "Digital Transformation",
      description: "Established our internal technology wing focused on digital transformation of processes, implementing advanced systems for workflow automation, inventory management, and enhanced customer relationship management.",
      icon: "fa-digital-tachograph",
      featured: true,
      image: createPlaceholder2025Image(),
      stats: [
        { label: "AUTOMATION", value: "Advanced", icon: "fa-robot" },
        { label: "DATA INSIGHTS", value: "Real-time", icon: "fa-database" }
      ]
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section id="evolution" ref={sectionRef} className="min-h-screen text-white relative overflow-hidden py-24">
      {/* Background with tech-inspired pattern and gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20 bg-blend-overlay"
          style={{
            backgroundImage: "url('/images/revamp_products/Background Texture-Pattern for Section Dividers.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/80 via-dark to-dark-gray/80"></div>
      </div>
      
      {/* Futuristic grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-accent"
              style={{
                height: '1px',
                width: '100%',
                top: `${(i + 1) * 8}%`,
                left: 0,
                transform: `rotate(${i % 2 === 0 ? '-0.5' : '0.5'}deg)`,
                opacity: 0.3,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)'
              }}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i + 'v'}
              className="absolute bg-accent"
              style={{
                width: '1px',
                height: '100%',
                left: `${(i + 1) * 15}%`,
                top: 0,
                opacity: 0.2,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-accent"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          animate={sectionControls}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Evolution</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-300">
            From our founding in 2005 to our current position as an industry leader, our journey 
            reflects continuous innovation, technological advancement, and unwavering commitment to precision excellence.
          </motion.p>
        </motion.div>
        
        {/* Timeline visualization */}
        <div ref={timelineRef} className="relative">
          {/* Timeline central line with glowing effect */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-accent/70 to-transparent z-10"
            initial={{ height: 0, opacity: 0 }}
            animate={timelineInView ? { height: "100%", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
          
          {/* Pulsing glow effect along timeline */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-6 bg-accent/10 blur-md h-full z-0"
            initial={{ height: 0, opacity: 0 }}
            animate={timelineInView ? { height: "100%", opacity: 0.7 } : { height: 0, opacity: 0 }}
            transition={{ duration: 1.7, ease: "easeOut", delay: 0.2 }}
          ></motion.div>
          
          {/* Timeline content */}
          <div className="relative z-20 py-10 space-y-40">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                {milestone.featured ? (
                  <TimelineFeaturedMilestone 
                    milestone={milestone} 
                    index={index} 
                    isInView={timelineInView} 
                  />
                ) : (
                  <TimelineMilestone 
                    milestone={milestone} 
                    index={index} 
                    isInView={timelineInView} 
                    isLeft={index % 2 === 0} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Technical Excellence Section */}
        <TechnicalExcellence />
      </div>
    </section>
  );
};

export default EnhancedTimeline;