import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import SectionLoadingState from './SectionLoadingState';

const IndustryCapabilities = () => {
  // State for active industry
  const [activeIndustry, setActiveIndustry] = useState('aerospace');
  // State for active product within an industry
  const [activeProduct, setActiveProduct] = useState(null);
  // State for loading state
  const [isLoading, setIsLoading] = useState(false);
  // State for details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  
  // Animation controls
  const heroControls = useAnimation();
  const categoriesControls = useAnimation();
  const productsControls = useAnimation();
  
  // Detect when elements are in view
  const heroInView = useInView(heroRef, { once: true, threshold: 0.2 });
  const categoriesInView = useInView(categoriesRef, { once: true, threshold: 0.2 });
  const productsInView = useInView(productsRef, { once: true, threshold: 0.1 });
  
  // Industry categories with modern icons
  const industries = [
    { id: 'aerospace', name: 'Aerospace', icon: 'fa-plane-departure', color: 'from-blue-800 to-indigo-900' },
    { id: 'medical', name: 'Medical', icon: 'fa-heartbeat', color: 'from-cyan-800 to-sky-900' },
    { id: 'automotive', name: 'Automotive', icon: 'fa-car', color: 'from-red-800 to-rose-900' },
    { id: 'energy', name: 'Energy', icon: 'fa-bolt', color: 'from-green-800 to-emerald-900' },
    { id: 'defense', name: 'Defense', icon: 'fa-shield-alt', color: 'from-slate-800 to-gray-900' },
    { id: 'robotics', name: 'Robotics', icon: 'fa-robot', color: 'from-purple-800 to-violet-900' }
  ];
  
  // Modern product lineup based on the document
  const products = [
    // Aerospace Products
    {
      id: 'advanced-turbine-gear-systems',
      name: 'Advanced Turbine Gear Systems',
      industry: 'aerospace',
      image: '/images/revamp_products/Advanced Turbine Gear Systems.png',
      description: 'Ultra-precision gear systems for aerospace turbines, engineered to withstand extreme conditions while maintaining dimensional stability and performance.',
      features: [
        'Ultra-precision grinding to ±0.002mm tolerance',
        '5-axis CNC machining for complex geometries',
        'Digital inspection with 100% component traceability',
        'Heat-resistant nickel alloys with specialized coatings',
        'ISO 9100 aerospace certification compliant'
      ],
      specifications: {
        precision: '±0.002mm',
        materials: ['Heat-resistant nickel alloys', 'Specialized aerospace alloys', 'Titanium composites'],
        applications: ['Aircraft engines', 'Propulsion systems', 'Flight control mechanisms']
      },
      highlights: 'Our turbine gear systems feature advanced geometries and specialized thermal treatments for optimal performance in extreme aerospace environments.'
    },
    {
      id: 'high-performance-bearing-components',
      name: 'High-Performance Bearing Components',
      industry: 'aerospace',
      image: '/images/revamp_products/High-Performance Bearing Components.png',
      description: 'Precision-engineered bearings for aerospace applications that provide superior rotational accuracy, reduced friction, and extended service life.',
      features: [
        'Surface roughness <0.2Ra through automated finishing',
        'AI-optimized material selection for weight reduction',
        'Vacuum-compatible lubricant application systems',
        'In-line digital metrology throughout production',
        'Custom alloys for extreme temperature environments'
      ],
      specifications: {
        precision: '<0.2Ra surface finish',
        materials: ['Chrome steel', 'Stainless steel', 'Ceramic hybrids', 'Advanced polymers'],
        applications: ['High-speed turbines', 'Control surfaces', 'Landing gear systems']
      },
      highlights: 'These high-performance bearings incorporate advanced materials and manufacturing techniques to provide exceptional performance in demanding aerospace applications.'
    },
    {
      id: 'actuator-drive-components',
      name: 'Actuator Drive Components',
      industry: 'aerospace',
      image: '/images/revamp_products/Actuator Drive Components.png',
      description: 'Precision actuator components engineered for aircraft control systems, providing reliable and precise movement essential for flight operations.',
      features: [
        'Computer-optimized tooth profiles for noise reduction',
        'Proprietary heat treatment for enhanced fatigue resistance',
        'Laser marking for permanent part identification',
        'Automated stress testing with digital certification',
        'Fine-blanking capability for near-net shape production'
      ],
      specifications: {
        precision: '±0.004mm',
        materials: ['Aerospace-grade aluminum', 'High-strength steel', 'Titanium alloys'],
        applications: ['Flight control systems', 'Landing gear mechanisms', 'Door actuators']
      },
      highlights: 'Our actuator drive components are engineered with advanced tooth profiles and surface treatments to provide reliable, precise movement even under extreme conditions.'
    },
    
    // Medical Products
    {
      id: 'surgical-instrument-components',
      name: 'Surgical Instrument Components',
      industry: 'medical',
      image: '/images/revamp_products/Surgical Instrument Components.png',
      description: 'Precision-engineered components for surgical instruments, manufactured to exacting standards for reliable performance in critical medical applications.',
      features: [
        'Biocompatible material machining (titanium, 316L stainless)',
        'Micro-machining capabilities down to 0.1mm features',
        'ISO 13485 certified clean manufacturing environment',
        'Advanced surface finishing for sterilization compatibility',
        'AI-driven inspection for zero-defect production'
      ],
      specifications: {
        precision: 'Down to 0.1mm features',
        materials: ['Medical-grade stainless steel', 'Titanium alloys', 'Biocompatible polymers'],
        applications: ['Surgical instruments', 'Minimally invasive devices', 'Robotic surgery systems']
      },
      highlights: 'Our surgical instrument components are manufactured in ISO 13485 certified environments with advanced inspection systems to ensure absolute reliability.'
    },
    {
      id: 'implantable-device-parts',
      name: 'Implantable Device Parts',
      industry: 'medical',
      image: '/images/revamp_products/Implantable Device Parts.png',
      description: 'Ultra-precise components for implantable medical devices, featuring biocompatible materials and exceptional surface quality for optimal integration.',
      features: [
        'Ultra-smooth surface finishes (<0.1Ra) for biocompatibility',
        'Custom alloy machining with validated processes',
        'Laser marking for permanent device tracking',
        'Sub-micron tolerance control for critical dimensions',
        'Complete digital manufacturing record for each component'
      ],
      specifications: {
        precision: '<0.1Ra surface finish',
        materials: ['Medical-grade titanium', 'Cobalt-chrome alloys', 'PEEK polymers'],
        applications: ['Orthopedic implants', 'Cardiovascular devices', 'Neurological implants']
      },
      highlights: 'Our implantable components feature ultra-smooth surfaces and biocompatible materials for optimal integration and long-term stability in the human body.'
    },
    {
      id: 'diagnostic-equipment-precision-elements',
      name: 'Diagnostic Equipment Precision Elements',
      industry: 'medical',
      image: '/images/revamp_products/Diagnostic Equipment Precision Elements.png',
      description: 'High-precision components for medical diagnostic equipment, ensuring reliable and accurate operation for critical diagnostic procedures.',
      features: [
        'EMI-resistant component designs',
        'Automated deburring for refined edge quality',
        'Multi-stage verification through 3D scanning',
        'Enhanced corrosion resistance through specialized treatments',
        'Custom fixtures for high-volume consistent production'
      ],
      specifications: {
        precision: '±0.005mm',
        materials: ['Stainless steel', 'Aluminum alloys', 'Engineered polymers'],
        applications: ['Imaging equipment', 'Laboratory diagnostic systems', 'Patient monitoring devices']
      },
      highlights: 'These precision components incorporate EMI-resistant designs and specialized surface treatments to ensure reliable operation in sensitive diagnostic environments.'
    },
    
    // Automotive Products
    {
      id: 'high-efficiency-transmission-components',
      name: 'High-Efficiency Transmission Components',
      industry: 'automotive',
      image: '/images/revamp_products/High-Efficiency Transmission Components.png',
      description: 'Precision-engineered transmission components designed to optimize efficiency, reduce noise, and enhance durability in modern automotive applications.',
      features: [
        'Automated gear grinding for noise reduction (NVH-optimized)',
        'AI-driven tooth profile optimization for efficiency',
        'Integrated sensors for in-process quality control',
        'Carbon-neutral manufacturing processes',
        'Digital twin modeling for pre-production validation'
      ],
      specifications: {
        precision: '±0.004mm',
        materials: ['Case-hardened steel', 'Specialty alloys', 'Advanced composites'],
        applications: ['Automatic transmissions', 'CVT systems', 'High-performance drivetrains']
      },
      highlights: 'Our transmission components feature AI-optimized tooth profiles and specialized surface finishes to maximize efficiency and minimize NVH characteristics.'
    },
    {
      id: 'ev-drivetrain-precision-parts',
      name: 'EV Drivetrain Precision Parts',
      industry: 'automotive',
      image: '/images/revamp_products/EV Drivetrain Precision Parts.png',
      description: 'Specialized components for electric vehicle drivetrains, engineered for enhanced efficiency, reduced noise, and excellent thermal characteristics.',
      features: [
        'Lightweight material selection through computational analysis',
        'Advanced heat treatment for extended component life',
        'Noise-optimized gear geometries through simulation',
        'Automated assembly verification systems',
        'Robotically controlled machining for consistent quality'
      ],
      specifications: {
        precision: '±0.005mm',
        materials: ['High-strength aluminum alloys', 'Low-noise steel composites', 'Specialized polymers'],
        applications: ['Electric motors', 'Single-speed reducers', 'Regenerative braking systems']
      },
      highlights: 'These precision parts are specifically engineered for the unique requirements of electric vehicle powertrains, optimizing efficiency and minimizing NVH.'
    },
    {
      id: 'heavy-duty-differential-components',
      name: 'Heavy-Duty Differential Components',
      industry: 'automotive',
      image: '/images/revamp_products/Heavy-Duty Differential Components.png',
      description: 'Robust differential components designed to withstand extreme loads and provide reliable performance in heavy-duty automotive applications.',
      features: [
        'Enhanced material microstructure through controlled processes',
        'Proprietary surface treatments for wear resistance',
        'Computer-optimized gear mesh patterns',
        '3D-printed tooling for rapid production adaptation',
        'Real-time quality monitoring through digital sensors'
      ],
      specifications: {
        precision: '±0.008mm',
        materials: ['Carburized alloy steel', 'High-strength nodular iron', 'Case-hardened components'],
        applications: ['Commercial vehicles', 'Off-road equipment', 'Performance automobiles']
      },
      highlights: 'Our heavy-duty differential components feature enhanced material properties and specialized heat treatments for extreme durability under high-load conditions.'
    },
    
    // Energy Products
    {
      id: 'wind-energy-drivetrain-components',
      name: 'Wind Energy Drivetrain Components',
      industry: 'energy',
      image: '/images/revamp_products/Wind Energy Drivetrain Components.png',
      description: 'Large-scale precision components for wind turbine drivetrains, engineered for reliability and longevity in challenging environmental conditions.',
      features: [
        'Large-scale precision machining (up to 2m diameter)',
        'Specialized coatings for harsh environment protection',
        'Advanced material testing for load certification',
        'Automated quality inspection with digital documentation',
        'Design optimization for 25+ year operational lifespan'
      ],
      specifications: {
        precision: '±0.010mm',
        materials: ['Case-hardened alloy steel', 'Specialized bearing steels', 'Weather-resistant alloys'],
        applications: ['Wind turbine gearboxes', 'Main shaft bearings', 'Pitch control systems']
      },
      highlights: 'These components are engineered for decades of reliable operation in harsh environments, with specialized coatings and material properties for extreme durability.'
    },
    {
      id: 'solar-tracking-mechanism-components',
      name: 'Solar Tracking Mechanism Components',
      industry: 'energy',
      image: '/images/revamp_products/Solar Tracking Mechanism Components.png',
      description: 'Precision components for solar tracking systems that enhance energy generation efficiency through accurate positioning and reliable operation.',
      features: [
        'Weather-resistant material selection and treatment',
        'Precision-ground surfaces for minimal maintenance',
        'Automated assembly verification for zero defects',
        'Computer-simulated wear prediction testing',
        'Low-friction coatings for energy efficiency'
      ],
      specifications: {
        precision: '±0.1° tracking accuracy',
        materials: ['UV-resistant alloys', 'Self-lubricating bearings', 'Corrosion-resistant fasteners'],
        applications: ['Solar panel arrays', 'Concentrated solar power', 'Photovoltaic installations']
      },
      highlights: 'Our solar tracking mechanism components feature specialized weather-resistant materials and low-friction coatings to ensure reliable operation with minimal maintenance.'
    },
    {
      id: 'hydroelectric-control-precision-parts',
      name: 'Hydroelectric Control Precision Parts',
      industry: 'energy',
      image: '/images/revamp_products/Hydroelectric Control Precision Parts.png',
      description: 'Specialized components for hydroelectric control systems, engineered to withstand water exposure while providing precise, reliable operation.',
      features: [
        'Erosion-resistant alloy machining',
        'Computer-optimized flow surfaces',
        'Water-compatible lubricant systems',
        'Enhanced sealing interface machining',
        'Digital verification of critical dimensions'
      ],
      specifications: {
        precision: '±0.007mm',
        materials: ['Marine-grade stainless steel', 'Erosion-resistant alloys', 'Specialized composites'],
        applications: ['Flow control systems', 'Turbine regulators', 'Gate mechanisms']
      },
      highlights: 'These precision parts incorporate erosion-resistant materials and specialized surface treatments for reliable operation in water-exposed environments.'
    },
    
    // Defense Products
    {
      id: 'stabilization-system-components',
      name: 'Stabilization System Components',
      industry: 'defense',
      image: '/images/revamp_products/Stabilization System Components.png',
      description: 'Precision components for weapon and equipment stabilization systems, providing accurate positioning and vibration dampening in mobile applications.',
      features: [
        'Vibration-dampening material selection',
        'Ultra-precise machining for balanced assemblies',
        'Ruggedized design for extreme environments',
        'Proprietary heat treatment for durability',
        'Advanced non-destructive testing protocols'
      ],
      specifications: {
        precision: '±0.003mm',
        materials: ['Military-grade alloys', 'Vibration-dampening composites', 'High-strength aluminum'],
        applications: ['Vehicle weapon systems', 'Optical equipment mounts', 'Mobile radar platforms']
      },
      highlights: 'Our stabilization system components incorporate specialized dampening materials and balanced designs for optimal performance in high-vibration environments.'
    },
    {
      id: 'guidance-system-precision-elements',
      name: 'Guidance System Precision Elements',
      industry: 'defense',
      image: '/images/revamp_products/Guidance System Precision Elements.png',
      description: 'High-precision components for defense guidance systems, featuring extreme accuracy and reliability in challenging operational conditions.',
      features: [
        'Temperature-stable material processing',
        'Micro-precision machining (tolerances to ±0.001mm)',
        'Specialized cleaning processes for sensor compatibility',
        'EMI shielding integration capabilities',
        'Complete component traceability through digital manufacturing'
      ],
      specifications: {
        precision: '±0.001mm',
        materials: ['Specialized alloys', 'Temperature-stable composites', 'EMI-resistant materials'],
        applications: ['Navigation systems', 'Targeting equipment', 'Inertial measurement units']
      },
      highlights: 'These guidance system elements feature temperature-stable materials and micro-precision machining for the extreme accuracy required in critical defense applications.'
    },
    {
      id: 'optical-mount-components',
      name: 'Optical Mount Components',
      industry: 'defense',
      image: '/images/revamp_products/Optical Mount Components.png',
      description: 'Ultra-precise mounting components for defense optical systems, providing stable, accurate positioning for critical vision and targeting equipment.',
      features: [
        'Thermally stable material processing',
        'Ultra-precise surface generation (<0.5 micron flatness)',
        'Stress-relief protocols for long-term stability',
        'Custom material selection for thermal matching',
        'Vibration analysis and optimization'
      ],
      specifications: {
        precision: '<0.5 micron flatness',
        materials: ['Low-expansion alloys', 'Vibration-dampening composites', 'Thermal-matching materials'],
        applications: ['Laser targeting systems', 'Long-range optics', 'Infrared sensor arrays']
      },
      highlights: 'Our optical mount components incorporate thermally stable materials and stress-relief protocols for the exceptional stability required in high-precision optical systems.'
    },
    
    // Robotics Products
    {
      id: 'joint-and-actuator-components',
      name: 'Joint and Actuator Components',
      industry: 'robotics',
      image: '/images/revamp_products/Joint and Actuator Components.png',
      description: 'Precision-engineered components for robotic joints and actuators, providing smooth, accurate movement with minimal backlash.',
      features: [
        'Zero-backlash gear manufacturing',
        'Lightweight material machining (titanium, aluminum alloys)',
        'Proprietary surface treatments for wear reduction',
        'Automated assembly and testing systems',
        'Design optimization through load simulation'
      ],
      specifications: {
        precision: '±0.004mm',
        materials: ['Aerospace-grade aluminum', 'Titanium alloys', 'High-strength steel'],
        applications: ['Collaborative robots', 'Industrial automation', 'Precision manipulation systems']
      },
      highlights: 'These joint and actuator components feature zero-backlash design and specialized surface treatments for smooth, precise movement in advanced robotics applications.'
    },
    {
      id: 'high-precision-positioning-elements',
      name: 'High-Precision Positioning Elements',
      industry: 'robotics',
      image: '/images/revamp_products/High-Precision Positioning Elements.png',
      description: 'Ultra-precise components for robotic positioning systems, enabling exact placement and movement in automated manufacturing and assembly applications.',
      features: [
        'Micro-machining for intricate features',
        'Advanced bearing seat manufacturing',
        'Computer-optimized friction reduction',
        'Automated measurement and certification',
        'Enhanced material processing for longevity'
      ],
      specifications: {
        precision: '±0.002mm',
        materials: ['Hardened steel', 'Ceramic hybrids', 'Advanced composites'],
        applications: ['Semiconductor manufacturing', 'Medical device assembly', 'Precision electronics']
      },
      highlights: 'Our positioning elements incorporate micro-machined features and advanced bearing technology for the extreme precision required in automated manufacturing.'
    },
    {
      id: 'end-effector-mechanical-components',
      name: 'End Effector Mechanical Components',
      industry: 'robotics',
      image: '/images/revamp_products/End Effector Mechanical Components.png',
      description: 'Specialized components for robotic end effectors, providing precise gripping, manipulation, and tool operation in automated systems.',
      features: [
        'Aluminum and titanium alloy precision machining',
        'Custom tool design for specialized geometries',
        'Rapid prototyping integration for development',
        'Surface treatments for grip enhancement',
        'Digital manufacturing records for quality assurance'
      ],
      specifications: {
        precision: '±0.005mm',
        materials: ['Lightweight aluminum alloys', 'Titanium composites', 'Specialized gripping surfaces'],
        applications: ['Pick and place operations', 'Specialized tool handling', 'Delicate part manipulation']
      },
      highlights: 'These end effector components feature application-specific geometries and specialized surface treatments for optimal handling of diverse materials and objects.'
    }
  ];
  
  // Filter products based on selected industry
  const filteredProducts = products.filter(product => product.industry === activeIndustry);
  
  // Set initial active product when industry changes
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setIsLoading(true);
      
      // Simulate loading delay for smooth transitions
      const timer = setTimeout(() => {
        setActiveProduct(filteredProducts[0]);
        setIsLoading(false);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [activeIndustry]);
  
  // Trigger animations when sections come into view
  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
    if (categoriesInView) {
      categoriesControls.start('visible');
    }
    if (productsInView) {
      productsControls.start('visible');
    }
  }, [heroInView, categoriesInView, productsInView, heroControls, categoriesControls, productsControls]);
  
  // Handle product selection
  const handleProductSelect = (product) => {
    if (product.id === activeProduct?.id) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for smooth transitions
    setTimeout(() => {
      setActiveProduct(product);
      setIsLoading(false);
    }, 600);
  };
  
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
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: i * 0.1
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 229, 255, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="solutions" ref={sectionRef} className="min-h-screen bg-dark text-white overflow-hidden pt-24 pb-20">
      {/* Particle Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-accent"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.3,
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Hero Section */}
      <div ref={heroRef} className="container mx-auto px-6 mb-20 relative z-10">
        <motion.div
          initial="hidden"
          animate={heroControls}
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="text-accent font-medium tracking-wider">INDUSTRY SOLUTIONS</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-6">
            Advanced <span className="text-accent">Precision Engineering</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-12">
            Our comprehensive range of precision components delivers exceptional performance across critical industries. 
            Each solution is engineered to exacting standards, using advanced manufacturing processes and premium materials.
          </motion.p>
          
          {/* Technology Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-16">
            {['AI-Optimized Design', 'Micro-Precision Machining', 'Digital Manufacturing', 'Advanced Materials', 'ISO Certified Processes'].map((tag, index) => (
              <motion.span
                key={index}
                className="bg-dark-gray/80 text-accent px-4 py-2 rounded-full border border-accent/20 text-sm backdrop-blur-sm"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 229, 255, 0.1)' }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Industry Category Selection */}
      <div ref={categoriesRef} className="container mx-auto px-6 mb-16 relative z-10">
        <motion.div
          initial="hidden"
          animate={categoriesControls}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {industries.map((industry, index) => (
            <motion.button
              key={industry.id}
              onClick={() => setActiveIndustry(industry.id)}
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                activeIndustry === industry.id 
                  ? 'bg-gradient-to-br ' + industry.color + ' border-2 border-accent/50 shadow-lg shadow-accent/20'
                  : 'bg-dark-gray/50 border border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  activeIndustry === industry.id
                    ? 'bg-white/10'
                    : 'bg-accent/10'
                }`}>
                  <i className={`fas ${industry.icon} text-3xl ${
                    activeIndustry === industry.id ? 'text-white' : 'text-accent'
                  }`}></i>
                </div>
                <h3 className="text-lg font-bold">{industry.name}</h3>
                
                {/* Animated indicator for active category */}
                {activeIndustry === industry.id && (
                  <motion.div 
                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
              
              {/* Particle effect for active button */}
              {activeIndustry === industry.id && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={`btn-particle-${i}`}
                      className="absolute w-1 h-1 rounded-full bg-accent/70"
                      initial={{ 
                        x: '50%', 
                        y: '50%', 
                        opacity: 0 
                      }}
                      animate={{ 
                        x: `${35 + Math.random() * 30}%`, 
                        y: `${35 + Math.random() * 30}%`, 
                        opacity: [0, 0.7, 0] 
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2, 
                        repeat: Infinity, 
                        repeatType: 'loop',
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
      
      {/* Products Display Section */}
      <div ref={productsRef} className="container mx-auto px-6 relative z-10">
        <div className="mb-12">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4 flex items-center"
          >
            <i className={`fas ${industries.find(i => i.id === activeIndustry)?.icon} text-accent mr-3`}></i>
            <span>{industries.find(i => i.id === activeIndustry)?.name} Solutions</span>
          </motion.h3>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8 }}
            className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mb-6"
          />
        </div>
        
        {/* Product Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover="hover"
              onClick={() => handleProductSelect(product)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                activeProduct?.id === product.id
                  ? 'ring-2 ring-accent shadow-lg shadow-accent/20'
                  : 'border border-gray-800 hover:border-accent/30'
              }`}
            >
              {/* Product Image */}
              <div className="aspect-[4/3] overflow-hidden relative bg-dark-gray/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                
                {/* Product Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h4 className="text-xl font-bold">{product.name}</h4>
                </div>
                
                {/* Active Indicator */}
                {activeProduct?.id === product.id && (
                  <div className="absolute top-3 right-3 z-20">
                    <div className="w-3 h-3 rounded-full bg-accent relative">
                      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Selected Product Detail Display */}
        {activeProduct && !isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-dark-gray/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image Side */}
              <div className="relative p-8">
                <div className="relative rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-black/50 to-dark-gray/50 flex items-center justify-center p-4">
                  {/* Image with floating animation */}
                  <motion.div
                    className="relative z-10 max-w-full max-h-full"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{ 
                      y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                      rotate: { repeat: Infinity, duration: 12, ease: "easeInOut" }
                    }}
                  >
                    <motion.div 
                      className="absolute -inset-8 bg-accent/5 rounded-full filter blur-xl opacity-70"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <img 
                      src={activeProduct.image} 
                      alt={activeProduct.name} 
                      className="object-contain max-h-[350px]"
                    />
                  </motion.div>
                  
                  {/* Tech specs overlay */}
                  <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm border border-accent/30 rounded-lg p-3 text-xs font-mono">
                    <div className="text-accent mb-1">PRECISION</div>
                    <div className="text-white">{activeProduct.specifications.precision}</div>
                  </div>
                </div>
              </div>
              
              {/* Product Details Side */}
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-gradient">{activeProduct.name}</h3>
                
                <p className="text-gray-300 mb-8">{activeProduct.description}</p>
                
                {/* Features Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-accent flex items-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    Key Features
                  </h4>
                  
                  <ul className="grid grid-cols-1 gap-3">
                    {activeProduct.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 text-accent"><i className="fas fa-check-circle"></i></div>
                        <div className="text-gray-300">{feature}</div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Application Areas */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-accent flex items-center">
                    <i className="fas fa-industry mr-2"></i>
                    Applications
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.specifications.applications.map((app, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-dark/50 text-gray-300 px-3 py-1 rounded-full border border-gray-800"
                      >
                        {app}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Materials Used */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-accent flex items-center">
                    <i className="fas fa-flask mr-2"></i>
                    Materials
                  </h4>
                  
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.specifications.materials.map((material, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20"
                      >
                        {material}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={() => setShowDetailsModal(true)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-accent hover:bg-accent-light text-dark font-bold py-3 px-5 rounded-md flex items-center shadow-lg shadow-accent/10"
                  >
                    Technical Specifications
                    <i className="fas fa-file-alt ml-2"></i>
                  </motion.button>
                  
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-accent/40 hover:border-accent/70 hover:bg-accent/10 text-white font-bold py-3 px-5 rounded-md flex items-center"
                  >
                    Request Information
                    <i className="fas fa-arrow-right ml-2"></i>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <SectionLoadingState text="Preparing Product Data" />
        )}
      </div>
      
      {/* Manufacturing Capabilities Section */}
      <div className="container mx-auto px-6 mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="text-accent font-medium tracking-wider">MANUFACTURING CAPABILITIES</span>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Advanced <span className="text-accent">Production Technologies</span>
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            Our state-of-the-art manufacturing facility combines cutting-edge technology with precision craftsmanship
            to deliver components that exceed industry standards.
          </motion.p>
        </motion.div>
        
        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: 'Micro-Precision Machining',
              icon: 'fa-microchip',
              description: 'Ultra-precise machining capabilities down to ±0.001mm tolerances, enabling the creation of intricate components for the most demanding applications.'
            },
            {
              title: '5-Axis CNC Manufacturing',
              icon: 'fa-cogs',
              description: 'Advanced 5-axis CNC technology for complex geometries and contours, allowing single-setup production of sophisticated components.'
            },
            {
              title: 'Digital Quality Control',
              icon: 'fa-check-circle',
              description: 'Automated inspection systems with digital documentation, providing 100% component traceability and verification of critical dimensions.'
            },
            {
              title: 'Advanced Material Processing',
              icon: 'fa-atom',
              description: 'Specialized heat treatment and surface finishing processes that enhance material properties for extreme environments and applications.'
            },
            {
              title: 'Additive Manufacturing Integration',
              icon: 'fa-cubes',
              description: 'Hybrid manufacturing approach combining traditional precision machining with additive technologies for optimized component designs.'
            },
            {
              title: 'Digital Twin Modeling',
              icon: 'fa-clone',
              description: 'Pre-production validation through digital twin modeling, ensuring component performance before physical manufacturing begins.'
            }
          ].map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-dark-gray/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <i className={`fas ${capability.icon} text-accent text-2xl`}></i>
                </div>
                
                <h4 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">{capability.title}</h4>
                
                <p className="text-gray-300 flex-grow">{capability.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Technical Excellence Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-dark-gray/80 to-black/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-4">Technical Excellence</h4>
              <p className="text-gray-300 mb-6">
                Our engineering team combines decades of experience with cutting-edge technology to push the boundaries of what's possible in precision manufacturing.
              </p>
              <div className="h-1 w-20 bg-accent rounded-full"></div>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {[
                { label: "Precision Tolerance", value: "±0.001mm", icon: "🎯" },
                { label: "Surface Finish", value: "<0.1Ra", icon: "✨" },
                { label: "Quality Standard", value: "ISO 9001/13485", icon: "✓" },
                { label: "Production Capacity", value: "500K+ Annually", icon: "⚙️" },
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-dark/30 rounded-lg p-4 border border-gray-800/50 group hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-2 text-lg group-hover:bg-accent/20 transition-colors duration-300">
                      {spec.icon}
                    </div>
                    <h5 className="font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{spec.label}</h5>
                  </div>
                  <div className="font-mono text-xl text-accent">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10"></div>
          
          <div className="relative p-12 backdrop-blur-sm border border-accent/20 rounded-xl z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Need a <span className="text-accent">Custom Solution</span>?
                </h3>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Our engineering team specializes in creating custom precision components tailored to your exact specifications.
                </p>
              </div>
              
              <motion.a 
                href="#contact" 
                className="bg-accent hover:bg-accent-light text-dark font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-500 shadow-lg shadow-accent/20 hover:shadow-accent/40 relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  REQUEST A CONSULTATION
                  <i className="fas fa-arrow-right ml-2"></i>
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Technical Specifications Modal */}
      <AnimatePresence>
        {showDetailsModal && activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-gray/95 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-accent/30"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-2 text-accent">{activeProduct.name}</h3>
                <p className="text-gray-300">{activeProduct.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Technical Specifications */}
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <i className="fas fa-cogs text-accent mr-2"></i>
                    <span>Technical Specifications</span>
                  </h4>
                  
                  <div className="bg-dark/50 rounded-lg p-6 border border-gray-800">
                    <p className="text-gray-300 mb-6 italic">{activeProduct.highlights}</p>
                    
                    {/* Specs Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-gray-800">
                          <tr>
                            <td className="py-3 text-gray-400 font-semibold">Precision</td>
                            <td className="py-3 text-white">{activeProduct.specifications.precision}</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-400 font-semibold">Materials</td>
                            <td className="py-3 text-white">{activeProduct.specifications.materials.join(', ')}</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-400 font-semibold">Applications</td>
                            <td className="py-3 text-white">{activeProduct.specifications.applications.join(', ')}</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-400 font-semibold">Industry</td>
                            <td className="py-3 text-white capitalize">{activeProduct.industry}</td>
                          </tr>
                          <tr>
                            <td className="py-3 text-gray-400 font-semibold">Quality Standard</td>
                            <td className="py-3 text-white">ISO 9001:2015 Certified</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                {/* Key Features */}
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center">
                    <i className="fas fa-check-circle text-accent mr-2"></i>
                    <span>Key Features</span>
                  </h4>
                  
                  <div className="bg-dark/50 rounded-lg p-6 border border-gray-800 h-full">
                    <ul className="space-y-3">
                      {activeProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 text-accent"><i className="fas fa-check-circle"></i></div>
                          <div className="text-gray-300">{feature}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end gap-4">
                <motion.button
                  onClick={() => setShowDetailsModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 px-5 border border-gray-700 text-gray-300 rounded-md"
                >
                  Close
                </motion.button>
                
                <motion.a
                  href="#contact" 
                  onClick={() => setShowDetailsModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-accent text-dark py-3 px-5 rounded-md font-bold"
                >
                  Request Information
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default IndustryCapabilities;