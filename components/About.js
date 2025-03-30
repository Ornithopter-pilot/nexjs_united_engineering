import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const About = () => {
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const timelineRef = useRef(null);
  const industriesRef = useRef(null);
  const standardsRef = useRef(null);
  
  const storyControls = useAnimation();
  const missionControls = useAnimation();
  const timelineControls = useAnimation();
  const industriesControls = useAnimation();
  const standardsControls = useAnimation();
  
  const storyInView = useInView(storyRef, { once: true, threshold: 0.2 });
  const missionInView = useInView(missionRef, { once: true, threshold: 0.2 });
  const timelineInView = useInView(timelineRef, { once: true, threshold: 0.2 });
  const industriesInView = useInView(industriesRef, { once: true, threshold: 0.2 });
  const standardsInView = useInView(standardsRef, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (storyInView) {
      storyControls.start('visible');
    }
    if (missionInView) {
      missionControls.start('visible');
    }
    if (timelineInView) {
      timelineControls.start('visible');
    }
    if (industriesInView) {
      industriesControls.start('visible');
    }
    if (standardsInView) {
      standardsControls.start('visible');
    }
  }, [storyInView, missionInView, timelineInView, industriesInView, standardsInView, storyControls, missionControls, timelineControls, industriesControls, standardsControls]);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariant = {
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
  
  const cardHover = {
    hover: { 
      y: -10, 
      boxShadow: "0 25px 50px -12px rgba(0, 229, 255, 0.25)",
      background: "linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(30,30,30,1) 100%)",
      borderColor: "rgba(0, 229, 255, 0.5)",
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  };
  
  const timelineItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5, 
        ease: "easeInOut" 
      }
    })
  };
  
  return (
    <section id="evolution" className="min-h-screen bg-dark text-white overflow-hidden">
      {/* Futuristic lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                transform: `rotate(${i % 2 === 0 ? '-1' : '1'}deg)`,
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      
      {/* Title Section with Advanced Animation */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="text-accent font-medium tracking-wider">OUR EVOLUTION</span>
          </motion.div>
          
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Engineering <span className="text-accent">Legacy</span> & Innovation
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Where cutting-edge technology meets precision engineering. We've been crafting the future through uncompromising quality and innovation, delivering exceptional solutions across diverse industries.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Our Story Section */}
      <div ref={storyRef} className="py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-b from-transparent via-dark-gray/30 to-transparent"></div>
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={storyControls}
            className="flex flex-col md:flex-row items-center gap-16"
          >
            <motion.div 
              variants={itemVariant} 
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-video rounded-md relative overflow-hidden group">
                <div className="absolute inset-0 border border-accent/20 rounded-md z-10 group-hover:border-accent/50 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-[1]"></div>
                <img 
                  src="/images/dramatic_lighting.png" 
                  alt="United Engineering Facility" 
                  className="w-full h-full object-cover rounded-md transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/70 rounded-tl-md z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/70 rounded-tr-md z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/70 rounded-bl-md z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/70 rounded-br-md z-10"></div>
              </div>
              
              <div className="absolute -top-3 -right-3 bg-dark-gray/80 backdrop-blur-sm px-4 py-2 rounded-md border-2 border-accent/30 text-accent font-mono text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent/80 animate-ping mr-2"></div>
                  <span>FACILITY.VIEW</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariant} className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <span className="text-white">Our</span>
                <span className="text-accent ml-3">Story</span>
              </h3>
              
              <div className="space-y-4 text-gray-300">
                <p>Founded in 2005 in Bangalore, United Engineering began with a vision to become a leader in precision machining. Starting with a small team of skilled engineers and a modest workshop, we focused on delivering exceptional quality in every component we produced.</p>
                
                <p>Today, we've grown into an established medium-sized precision machining company with state-of-the-art facilities. Our reputation has been built on technical expertise, consistent quality, and responsiveness to customer needs across diverse industries.</p>
                
                <p>Throughout our growth, we've maintained our core focus on precision while embracing innovations in manufacturing processes. In recent years, we've invested significantly in advanced technologies to enhance our operational efficiency, maintain exceptional quality, and deliver greater value to our customers.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <motion.div 
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-dark-gray/50 rounded-md p-4 border border-gray-800 backdrop-blur-sm"
                >
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-accent text-lg"></i>
                    </span>
                    <h4 className="font-semibold">Technical Excellence</h4>
                  </div>
                  <p className="text-sm text-gray-300">Unmatched precision in every component we manufacture</p>
                </motion.div>
                
                <motion.div 
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-dark-gray/50 rounded-md p-4 border border-gray-800 backdrop-blur-sm"
                >
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-accent text-lg"></i>
                    </span>
                    <h4 className="font-semibold">Quality Commitment</h4>
                  </div>
                  <p className="text-sm text-gray-300">ISO certified processes ensuring consistent quality</p>
                </motion.div>
                
                <motion.div 
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-dark-gray/50 rounded-md p-4 border border-gray-800 backdrop-blur-sm"
                >
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-accent text-lg"></i>
                    </span>
                    <h4 className="font-semibold">Innovation Focus</h4>
                  </div>
                  <p className="text-sm text-gray-300">Continuously embracing advanced manufacturing solutions</p>
                </motion.div>
                
                <motion.div 
                  whileHover="hover"
                  variants={cardHover}
                  className="bg-dark-gray/50 rounded-md p-4 border border-gray-800 backdrop-blur-sm"
                >
                  <div className="flex items-center mb-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-accent text-lg"></i>
                    </span>
                    <h4 className="font-semibold">Customer-Centric</h4>
                  </div>
                  <p className="text-sm text-gray-300">Responsive approach with tailored solutions for clients</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Mission & Vision */}
      <div ref={missionRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={missionControls}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={itemVariant} className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
              <span className="text-accent font-medium tracking-wider">OUR PURPOSE</span>
            </motion.div>
            
            <motion.h3 variants={itemVariant} className="text-4xl font-bold mb-6">
              Guided by <span className="text-accent">Vision</span> & <span className="text-accent">Purpose</span>
            </motion.h3>
            
            <motion.p variants={itemVariant} className="text-xl text-gray-300">
              We strive to deliver excellence in everything we do, driven by our clear mission and ambitious vision for the future of precision engineering.
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              variants={itemVariant}
              className="bg-dark-gray/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800 relative group overflow-hidden"
            >
              {/* Mission card content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-accent">Our Mission</h4>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-white group-hover:text-white font-medium">
                    To advance precision engineering through AI-optimized design, digital manufacturing, and ultra-precise components that exceed industry benchmarks and drive innovation in critical sectors.
                  </p>
                  <p className="text-lg leading-relaxed text-white group-hover:text-white font-medium">
                    We strive to be the technological cornerstone for our partners, enabling breakthroughs in aerospace, medical, defense, energy, automotive, and robotics through cutting-edge precision solutions and collaborative innovation.
                  </p>
                </div>
              </div>
              
              {/* Custom hover effect with gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(84, 114, 211, 0.15) 100%)',
                     boxShadow: 'inset 0 0 30px rgba(0, 229, 255, 0.15)'
                   }}>
              </div>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-700 ease-in-out" 
                   style={{ 
                     background: 'linear-gradient(90deg, #00e5ff, #5472d3) border-box',
                     mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)'
                   }}>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariant}
              className="bg-dark-gray/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800 relative group overflow-hidden"
            >
              {/* Vision card content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-accent">Our Vision</h4>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-white group-hover:text-white font-medium">
                    To be the global leader in ultra-precision manufacturing, recognized for pushing the boundaries of what's possible through advanced technologies, material science, and manufacturing intelligence.
                  </p>
                  <p className="text-lg leading-relaxed text-white group-hover:text-white font-medium">
                    We envision a future where our precision components enable the next generation of technological breakthroughs across industries, from deep space exploration to life-saving medical innovations and sustainable energy solutions.
                  </p>
                </div>
              </div>
              
              {/* Custom hover effect with gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(84, 114, 211, 0.15) 100%)',
                     boxShadow: 'inset 0 0 30px rgba(0, 229, 255, 0.15)'
                   }}>
              </div>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-700 ease-in-out" 
                   style={{ 
                     background: 'linear-gradient(90deg, #00e5ff, #5472d3) border-box',
                     mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)'
                   }}>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Industry-specific Content */}
      <div ref={industriesRef} className="py-24 relative overflow-hidden bg-dark-gray/30">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={industriesControls}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={itemVariant} className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
              <span className="text-accent font-medium tracking-wider">INDUSTRIES</span>
            </motion.div>
            
            <motion.h3 variants={itemVariant} className="text-4xl font-bold mb-6">
              Industries We <span className="text-accent">Serve</span>
            </motion.h3>
            
            <motion.p variants={itemVariant} className="text-xl text-gray-300">
              We provide precision components to diverse industries, each with unique requirements and challenges. Our expertise allows us to deliver specialized solutions that meet the exacting standards of these sectors.
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={itemVariant}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Manufacturing",
                icon: "fas fa-industry",
                description: "Critical components for industrial equipment and machinery that enhance operational reliability and performance in demanding environments."
              },
              {
                title: "Automotive",
                icon: "fas fa-car",
                description: "Precision parts for automotive systems with tight tolerances, excellent surface finish, and strict quality control for optimal performance."
              },
              {
                title: "Machinery",
                icon: "fas fa-cogs",
                description: "Custom components for industrial machinery, including power transmission, motion control, and specialized applications requiring exact specifications."
              },
              {
                title: "Aerospace",
                icon: "fas fa-plane",
                description: "High-precision components manufactured to meet stringent aerospace standards, ensuring safety, reliability, and performance in critical applications."
              },
              {
                title: "Medical",
                icon: "fas fa-medkit",
                description: "Specialized components for medical devices and equipment where precision, reliability, and biocompatibility are essential for patient safety."
              },
              {
                title: "Energy",
                icon: "fas fa-bolt",
                description: "Durable, high-performance components for energy production systems including renewable energy, power generation, and distribution equipment."
              }
            ].map((industry, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-dark-gray/50 backdrop-blur-sm rounded-md p-6 border border-gray-800 group hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                    <i className={`${industry.icon} text-accent text-2xl`}></i>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-3 group-hover:text-accent transition-all duration-300">{industry.title}</h4>
                  
                  <p className="text-gray-300">{industry.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Timeline */}
      <div ref={timelineRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={timelineControls}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={itemVariant} className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
              <span className="text-accent font-medium tracking-wider">JOURNEY</span>
            </motion.div>
            
            <motion.h3 variants={itemVariant} className="text-4xl font-bold mb-6">
              Our <span className="text-accent">Evolution</span>
            </motion.h3>
            
            <motion.p variants={itemVariant} className="text-xl text-gray-300">
              Since our founding in 2005, United Engineering has evolved through strategic growth, technology adoption, and continuous improvement. Our journey reflects our commitment to excellence and adaptation to industry advancements.
            </motion.p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-accent/50 to-transparent"></div>
            
            <div className="relative z-10">
              {[
                { year: "2005", description: "Established United Engineering Services in Bangalore with a modest workshop and a small team specializing in precision components for local manufacturing industries." },
                { year: "2008", description: "Expanded service offerings beyond local markets and secured our first major contracts with automotive and industrial machinery manufacturers in South India." },
                { year: "2011", description: "Relocated to a larger facility and invested in our first advanced CNC machinery to enhance precision capabilities and production capacity." },
                { year: "2014", description: "Achieved ISO 9001 certification and began serving aerospace and medical device industries with components requiring exceptional precision and quality assurance." },
                { year: "2017", description: "Expanded to our current manufacturing facility and implemented multi-axis CNC machinery to enhance production capabilities and precision." },
                { year: "2020", description: "Began international exports and expanded our client base to include companies across Asia-Pacific and European markets, establishing UES as a global provider of precision components." },
                { year: "2023", description: "Achieved ISO 14001 environmental management certification and expanded our capabilities in multi-material component manufacturing for specialized applications." },
                { year: "2025", description: "Established our internal technology wing focused on digital transformation of processes, implementing advanced systems for workflow automation, inventory management, and enhanced customer relationship management." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={timelineItemVariants}
                  initial="hidden"
                  animate={timelineInView ? "visible" : "hidden"}
                  className={`flex mb-16 items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                    <div className={`bg-dark-gray/50 backdrop-blur-sm rounded-md p-6 border border-gray-800 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]`}>
                      <div className="mb-2 inline-block bg-accent/10 px-4 py-1 rounded-md">
                        <span className="text-accent font-mono font-bold">{item.year}</span>
                      </div>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-2/12 flex justify-center relative">
                    <div className="h-10 w-10 bg-dark-gray rounded-full border-4 border-accent flex items-center justify-center z-10">
                      <div className="h-3 w-3 bg-accent rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Standards Section */}
      <div ref={standardsRef} className="py-24 relative overflow-hidden bg-dark-gray/30">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={standardsControls}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={itemVariant} className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
              <span className="text-accent font-medium tracking-wider">STANDARDS</span>
            </motion.div>
            
            <motion.h3 variants={itemVariant} className="text-4xl font-bold mb-6">
              Quality <span className="text-accent">&</span> Industry Standards
            </motion.h3>
            
            <motion.p variants={itemVariant} className="text-xl text-gray-300">
              We maintain rigorous quality standards and certifications that ensure our manufacturing processes and products meet the highest industry benchmarks. Our commitment to these standards is fundamental to our promise of excellence.
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={itemVariant}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {[
              {
                title: "ISO 9001:2015",
                icon: "fas fa-certificate",
                description: "Our certified quality management system ensures consistent quality through documented processes, continuous improvement protocols, and rigorous quality control at every stage."
              },
              {
                title: "Environmental Management",
                icon: "fas fa-leaf",
                description: "We follow ISO 14001 guidelines, implementing responsible practices and waste reduction initiatives to minimize environmental impact throughout our manufacturing operations."
              },
              {
                title: "Occupational Health & Safety",
                icon: "fas fa-hard-hat",
                description: "Safety is paramount in our operations, with strict protocols aligned with ISO 45001 standards to protect our employees and visitors in our manufacturing environment."
              },
              {
                title: "Industry-Specific Compliance",
                icon: "fas fa-check-double",
                description: "We adhere to specialized industry requirements including IATF 16949 for automotive, AS9100 for aerospace, and other sector-specific standards ensuring components meet specialized requirements."
              }
            ].map((standard, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-dark-gray/50 backdrop-blur-sm rounded-md p-6 border border-gray-800 group hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                    <i className={`${standard.icon} text-accent text-2xl`}></i>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-3 group-hover:text-accent transition-all duration-300">{standard.title}</h4>
                  
                  <p className="text-gray-300">{standard.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-dark-gray/80 to-black/80 backdrop-blur-sm rounded-xl p-12 border border-gray-800 relative overflow-hidden group"
          >
            {/* Animated accent border */}
            <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-1000 ease-in-out" style={{ background: 'linear-gradient(90deg, #00e5ff, #5472d3) border-box', mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)' }}></div>
            
            {/* Background particle effects */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`cta-particle-${i}`}
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
          
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work with Us?</h3>
                <p className="text-xl text-gray-300 max-w-2xl">Contact our team to discuss how our precision engineering solutions can benefit your business and projects.</p>
              </div>
              
              <motion.a 
                href="#contact" 
                className="group bg-accent hover:bg-accent-light text-dark font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-500 shadow-lg shadow-accent/20 hover:shadow-accent/40 relative overflow-hidden"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Add shine effect on hover */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                
                <span className="relative z-10 flex items-center">
                  GET IN TOUCH
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ 
                      x: [0, 5, 0],
                      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;