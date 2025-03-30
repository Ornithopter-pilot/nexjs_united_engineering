import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';

const Capabilities = () => {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const processRef = useRef(null);
  const equipmentRef = useRef(null);
  const qualityRef = useRef(null);
  
  // Animation controls
  const heroControls = useAnimation();
  const categoriesControls = useAnimation();
  const processControls = useAnimation();
  const equipmentControls = useAnimation();
  const qualityControls = useAnimation();
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('engineering');
  
  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, threshold: 0.2 });
  const categoriesInView = useInView(categoriesRef, { once: true, threshold: 0.2 });
  const processInView = useInView(processRef, { once: true, threshold: 0.2 });
  const equipmentInView = useInView(equipmentRef, { once: true, threshold: 0.2 });
  const qualityInView = useInView(qualityRef, { once: true, threshold: 0.2 });
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (heroInView) heroControls.start('visible');
    if (categoriesInView) categoriesControls.start('visible');
    if (processInView) processControls.start('visible');
    if (equipmentInView) equipmentControls.start('visible');
    if (qualityInView) qualityControls.start('visible');
  }, [
    heroInView, categoriesInView, processInView, equipmentInView, qualityInView,
    heroControls, categoriesControls, processControls, equipmentControls, qualityControls
  ]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: i * 0.1
      }
    })
  };
  
  // Tab content sections
  const tabContent = {
    engineering: {
      title: "Engineering Services",
      description: "Our comprehensive engineering services combine precision manufacturing capabilities with innovative design and advanced technology.",
      items: [
        {
          title: "Precision Machining",
          icon: "fa-cogs",
          description: "Advanced CNC machining capabilities producing complex components with tight tolerances (±0.005mm) and excellent surface finishes.",
          features: ["Multi-axis CNC machining", "Tight tolerance manufacturing", "Complex geometries and profiles"]
        },
        {
          title: "Custom Manufacturing",
          icon: "fa-tools",
          description: "Specialized development and manufacturing of custom components tailored to your specific requirements and industry standards.",
          features: ["Design consultation and optimization", "Material selection expertise", "Specialized manufacturing processes"]
        },
        {
          title: "Prototyping",
          icon: "fa-drafting-compass",
          description: "Rapid prototyping services that help validate designs and optimize components before full production, reducing development time.",
          features: ["Rapid prototype development", "Design refinement and iteration", "Functional testing and validation"]
        }
      ]
    },
    quality: {
      title: "Quality Management",
      description: "Our robust quality management system ensures exceptional precision and reliability across all manufacturing processes.",
      items: [
        {
          title: "Quality Assurance",
          icon: "fa-check-circle",
          description: "Comprehensive quality assurance program designed to prevent defects through systematic monitoring of production processes.",
          features: ["Process validation protocols", "Statistical process control", "Preventive quality planning"]
        },
        {
          title: "Quality Control",
          icon: "fa-search",
          description: "Rigorous inspection and testing methodologies verify dimensional accuracy, material properties, and functional performance.",
          features: ["Advanced measurement systems", "Material verification", "Functional testing"]
        },
        {
          title: "Continuous Improvement",
          icon: "fa-sync-alt",
          description: "Ongoing enhancement of our processes, methodologies, and capabilities through regular audits and implementation of best practices.",
          features: ["Regular process audits", "Performance metrics tracking", "Kaizen implementation"]
        }
      ]
    },
    manufacturing: {
      title: "Manufacturing Excellence",
      description: "Our state-of-the-art manufacturing capabilities deliver exceptional precision, consistency, and performance.",
      items: [
        {
          title: "Advanced CNC Machining",
          icon: "fa-industry",
          description: "Multi-axis CNC machines capable of producing complex components with tight tolerances and excellent surface finishes.",
          features: ["5-axis machining centers", "Swiss-type automatic lathes", "CNC grinding systems"]
        },
        {
          title: "Precision Grinding",
          icon: "fa-circle-notch",
          description: "Advanced surface, cylindrical, and centerless grinding capabilities for superior surface finishes and tight tolerances.",
          features: ["Surface grinding", "Cylindrical grinding", "Centerless grinding"]
        },
        {
          title: "Material Processing",
          icon: "fa-fire-alt",
          description: "Comprehensive material handling and treatment facilities for improving properties and performance characteristics.",
          features: ["Heat treatment", "Surface treatments", "Material testing"]
        }
      ]
    },
    certifications: {
      title: "Industry Standards & Certifications",
      description: "We maintain rigorous quality standards and certifications ensuring our manufacturing processes meet the highest industry benchmarks.",
      items: [
        {
          title: "ISO 9001:2015",
          icon: "fa-certificate",
          description: "Our certified quality management system ensures consistent quality through documented processes and rigorous quality control.",
          features: ["Quality management", "Process documentation", "Continuous improvement"]
        },
        {
          title: "Environmental Management",
          icon: "fa-leaf",
          description: "ISO 14001 guidelines implementation with responsible practices and waste reduction initiatives to minimize environmental impact.",
          features: ["Waste reduction", "Sustainable processes", "Environmental compliance"]
        },
        {
          title: "Industry-Specific Compliance",
          icon: "fa-check-double",
          description: "Specialized industry requirements including aerospace, automotive, and medical device manufacturing standards.",
          features: ["IATF 16949 (Automotive)", "AS9100 (Aerospace)", "ISO 13485 (Medical)"]
        }
      ]
    }
  };
  
  // Process steps data
  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We carefully assess your requirements, specifications, and project goals to ensure a clear understanding of your needs."
    },
    {
      number: "02",
      title: "Engineering Review",
      description: "Our engineers analyze technical feasibility, material selection, and manufacturability to optimize your design."
    },
    {
      number: "03",
      title: "Design & Prototyping",
      description: "We refine designs and create prototypes when needed, allowing for testing and validation before full production."
    },
    {
      number: "04",
      title: "Production Planning",
      description: "We establish tooling requirements, production schedules, and resource allocation to ensure efficient manufacturing."
    },
    {
      number: "05",
      title: "Manufacturing",
      description: "Components are produced using our precision equipment with in-process quality checks throughout production."
    },
    {
      number: "06",
      title: "Quality Assurance",
      description: "Comprehensive inspection and testing verify all components meet required specifications and quality standards."
    },
    {
      number: "07",
      title: "Documentation",
      description: "We provide complete documentation including inspection reports and material certificates as required."
    },
    {
      number: "08",
      title: "Delivery & Support",
      description: "Final products are carefully packaged and delivered, with follow-up support to ensure your complete satisfaction."
    }
  ];
  
  // Materials expertise data
  const materialsExpertise = {
    ferrous: [
      "Carbon Steel (AISI 1018, 1045, 1095)",
      "Alloy Steel (4140, 4340, 8620)",
      "Stainless Steel (303, 304, 316, 410, 440C)",
      "Tool Steel (A2, D2, H13, M2, O1)",
      "Cast Iron (Gray, Ductile, Malleable)"
    ],
    nonFerrous: [
      "Aluminum Alloys (6061, 7075, 2024, 5052)",
      "Copper Alloys (Brass, Bronze, Beryllium Copper)",
      "Titanium Alloys (Grade 2, Grade 5/Ti-6Al-4V)",
      "Nickel Alloys (Inconel, Monel, Hastelloy)"
    ],
    specialty: [
      "Engineering Plastics (Delrin/POM, PEEK, Nylon)",
      "Composite Materials",
      "High-Temperature Alloys",
      "Multi-Material Solutions"
    ]
  };
  
  return (
    <section id="capabilities" className="min-h-screen bg-dark text-white overflow-hidden pt-20">
      {/* Tech-inspired background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-accent"
              style={{
                height: '1px',
                width: '100%',
                top: `${(i + 1) * 7}%`,
                left: 0,
                transform: `rotate(${i % 2 === 0 ? '-0.5' : '0.5'}deg)`,
                opacity: 0.3,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)'
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i + 'v'}
              className="absolute bg-accent"
              style={{
                width: '1px',
                height: '100%',
                left: `${(i + 1) * 12}%`,
                top: 0,
                opacity: 0.2,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
              }}
            />
          ))}
        </div>
        
        {/* Floating particles */}
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
      
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        className="relative min-h-[85vh] flex items-center overflow-hidden py-8 mb-8"
      >
        {/* Tech-inspired background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/20 to-dark/60 z-0"></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroControls}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="relative z-10">
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6"
              >
                <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
                <span className="text-accent font-medium tracking-wider">ENGINEERING CAPABILITIES</span>
              </motion.div>
              
              <motion.h2 
                variants={itemVariants} 
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Precision <span className="text-accent">Technology</span><br />
                <span className="text-accent">Excellence</span>
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed"
              >
                Our comprehensive manufacturing capabilities powered by advanced technology and expert engineering deliver unparalleled precision solutions across diverse industries.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.a 
                  href="#capability-details" 
                  className="group bg-accent hover:bg-accent-light text-dark font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-500 shadow-lg shadow-accent/20 hover:shadow-accent/40 relative overflow-hidden"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Add shine effect on hover */}
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  
                  <span className="relative z-10 flex items-center">
                    EXPLORE CAPABILITIES
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
                
                <motion.a 
                  href="#contact" 
                  className="group border border-accent/30 hover:border-accent backdrop-blur-sm text-white font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-300 hover:bg-accent/10 relative overflow-hidden"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Add pulse border effect */}
                  <span className="absolute inset-0 border border-accent/50 rounded-md opacity-0 group-hover:opacity-100 animate-[pulse_2s_ease-in-out_infinite]"></span>
                  
                  <span className="relative z-10">
                    REQUEST CONSULTATION
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
            
            {/* Right Content - Tech Specs Display */}
            <motion.div
              variants={itemVariants}
              className="relative z-10 p-6"
            >
              <div className="relative bg-dark-gray/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800 overflow-hidden">
                {/* Circuit-like accent lines for tech feel */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent/70 rounded-tl-xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/70 rounded-br-xl"></div>
                
                {/* Animated data values */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-400 mb-2">PRECISION CAPABILITIES</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-accent">±0.005</span>
                    <span className="text-xl text-gray-300 ml-2">mm</span>
                  </div>
                  <div className="h-1 bg-accent/30 w-48 mt-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                {/* Tech features grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: "fa-cogs", label: "5-Axis CNC", value: "Advanced" },
                    { icon: "fa-microscope", label: "Quality Control", value: "ISO 9001" },
                    { icon: "fa-bolt", label: "Throughput", value: "High-Vol" },
                    { icon: "fa-industry", label: "Production", value: "Automated" }
                  ].map((spec, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      variants={itemVariants}
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <i className={`fas ${spec.icon} text-accent`}></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{spec.label}</div>
                        <div className="text-lg font-medium text-white">{spec.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Animated scanning line for tech effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
                  animate={{ 
                    y: [-500, 500],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    y: { repeat: Infinity, duration: 3, ease: "linear" },
                    opacity: { repeat: Infinity, duration: 3, ease: "linear" }
                  }}
                />
              </div>
              
              {/* Data points */}
              <div className="absolute inset-0 pointer-events-none">
                {[1, 2, 3].map((_, i) => (
                  <motion.div
                    key={`data-point-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-accent"
                    style={{
                      top: `${30 + i * 20}%`,
                      right: `${10 + i * 20}%`,
                      boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)'
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full border border-accent animate-ping opacity-60"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Capabilities Section */}
      <div id="capability-details" className="py-16 bg-dark-gray/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Integrated Approach</h2>
            <p className="text-xl text-gray-300">
              We combine precision manufacturing capabilities with rigorous quality systems to deliver exceptional engineering solutions across diverse industries.
            </p>
          </div>
          
          {/* Tabs Navigation */}
          <div ref={categoriesRef} className="mb-12">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={categoriesControls}
              className="flex flex-wrap justify-center gap-4"
            >
              {Object.keys(tabContent).map((tab, index) => (
                <motion.button
                  key={tab}
                  variants={itemVariants}
                  custom={index}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab 
                      ? 'bg-accent/20 text-white border border-accent/80 shadow-lg shadow-accent/20' 
                      : 'bg-dark-gray/50 text-gray-300 border border-gray-800 hover:border-gray-700'
                  }`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className={`fas fa-${
                    tab === 'engineering' ? 'cog' : 
                    tab === 'quality' ? 'check-circle' : 
                    tab === 'manufacturing' ? 'industry' : 
                    'certificate'
                  } ${activeTab === tab ? 'text-accent' : 'text-gray-400'}`}></i>
                  <span>{tabContent[tab].title}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">{tabContent[activeTab].title}</h3>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">{tabContent[activeTab].description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tabContent[activeTab].items.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 group hover:border-accent/30 transition-all duration-300"
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                        <i className={`fas ${item.icon} text-accent text-2xl`}></i>
                      </div>
                      
                      <h4 className="text-xl font-bold mb-4 group-hover:text-accent transition-all duration-300">{item.title}</h4>
                      <p className="text-gray-300 mb-6">{item.description}</p>
                      
                      <ul className="space-y-2">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <i className="fas fa-check text-accent mt-1"></i>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Process Section */}
      <div ref={processRef} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={processControls}
          >
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
                <span className="text-accent font-medium tracking-wider">OUR PROCESS</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6">Engineering <span className="text-accent">Excellence</span> Process</h2>
              <p className="text-xl text-gray-300">
                Our structured approach ensures your project is completed efficiently and to your exact specifications,
                keeping you informed and involved from concept to delivery.
              </p>
            </motion.div>
            
            {/* Process Steps Timeline */}
            <div className="relative z-10 mt-24">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-accent/50 to-transparent"></div>
              
              <div className="relative z-10">
                {processSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    className={`flex mb-16 items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                      <motion.div 
                        className={`bg-dark-gray/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]`}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                      >
                        <div className="mb-3 flex items-center gap-4 justify-start">
                          <div className="text-2xl font-bold text-accent">{step.number}</div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-gray-300">{step.description}</p>
                      </motion.div>
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
          </motion.div>
        </div>
      </div>
      
      {/* Materials Expertise */}
      <div ref={equipmentRef} className="py-20 bg-dark-gray/30">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={equipmentControls}
          >
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
                <span className="text-accent font-medium tracking-wider">MATERIALS EXPERTISE</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6">Advanced <span className="text-accent">Material</span> Capabilities</h2>
              <p className="text-xl text-gray-300">
                Our engineering team has extensive experience working with a wide range of materials
                to meet diverse application requirements across multiple industries.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ferrous Metals */}
              <motion.div
                variants={cardVariants}
                custom={0}
                className="bg-dark/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 group hover:border-accent/30 transition-all duration-300"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <i className="fas fa-cog text-accent text-2xl"></i>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-all duration-300">Ferrous Metals</h3>
                
                <ul className="space-y-3">
                  {materialsExpertise.ferrous.map((material, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fas fa-check text-accent mt-1"></i>
                      <span className="text-gray-300 text-sm">{material}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Non-Ferrous Metals */}
              <motion.div
                variants={cardVariants}
                custom={1}
                className="bg-dark/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 group hover:border-accent/30 transition-all duration-300"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <i className="fas fa-atom text-accent text-2xl"></i>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-all duration-300">Non-Ferrous Metals</h3>
                
                <ul className="space-y-3">
                  {materialsExpertise.nonFerrous.map((material, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fas fa-check text-accent mt-1"></i>
                      <span className="text-gray-300 text-sm">{material}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Specialty Materials */}
              <motion.div
                variants={cardVariants}
                custom={2}
                className="bg-dark/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 group hover:border-accent/30 transition-all duration-300"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <i className="fas fa-flask text-accent text-2xl"></i>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-all duration-300">Specialty Materials</h3>
                
                <ul className="space-y-3">
                  {materialsExpertise.specialty.map((material, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fas fa-check text-accent mt-1"></i>
                      <span className="text-gray-300 text-sm">{material}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Technical Capabilities Highlight */}
      <div ref={qualityRef} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={qualityControls}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Tech Specs */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="bg-dark-gray/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800 relative overflow-hidden">
                {/* Tech-inspired decorative elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent/30 rounded-br-xl"></div>
                
                <h3 className="text-3xl font-bold mb-8 relative z-10">Technical <span className="text-accent">Specifications</span></h3>
                
                <div className="space-y-6 relative z-10">
                  {[
                    { label: "CNC Machining Centers", value: "5-Axis & Multi-Axis", icon: "fa-cogs" },
                    { label: "Turning Capability", value: "Ø1mm to Ø200mm", icon: "fa-sync" },
                    { label: "Surface Grinding", value: "Ra 0.1μm", icon: "fa-layer-group" },
                    { label: "Dimensional Tolerance", value: "±0.005mm", icon: "fa-ruler" },
                    { label: "Quality Inspection", value: "CMM & Vision Systems", icon: "fa-search" },
                    { label: "Production Capacity", value: "24/7 Operations", icon: "fa-industry" }
                  ].map((spec, index) => (
                    <motion.div 
                      key={index}
                      variants={itemVariants}
                      custom={index}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center">
                        <i className={`fas ${spec.icon} text-accent`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-sm">{spec.label}</div>
                        <div className="text-white font-semibold">{spec.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Animated scanning line for tech effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"
                  animate={{ 
                    y: [-500, 500], 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Right Side - Content */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <div className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
                <span className="text-accent font-medium tracking-wider">TECHNICAL EXCELLENCE</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6">State-of-the-Art <span className="text-accent">Equipment</span></h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our manufacturing facility is equipped with the latest precision machinery and quality control systems,
                enabling us to achieve exceptional accuracy and consistency across all production runs.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                    <i className="fas fa-check text-accent"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Advanced CNC Machining</h4>
                    <p className="text-gray-300">
                      Our multi-axis CNC machining centers enable complex geometries and tight tolerances for the most demanding applications.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                    <i className="fas fa-check text-accent"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Precision Measurement</h4>
                    <p className="text-gray-300">
                      State-of-the-art coordinate measuring machines and optical inspection systems ensure dimensional accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                    <i className="fas fa-check text-accent"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Material Testing</h4>
                    <p className="text-gray-300">
                      Comprehensive material testing capabilities verify properties and ensure conformance to specifications.
                    </p>
                  </div>
                </div>
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
                  REQUEST TECHNICAL SPECIFICATIONS
                  <i className="fas fa-arrow-right ml-2"></i>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-dark-gray/80 to-black/80 backdrop-blur-sm rounded-xl p-12 border border-gray-800 relative overflow-hidden group">
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
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Leverage Our Capabilities?</h3>
                <p className="text-xl text-gray-300 max-w-2xl">Contact our team today to discuss how our precision engineering capabilities can benefit your projects.</p>
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
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Capabilities;