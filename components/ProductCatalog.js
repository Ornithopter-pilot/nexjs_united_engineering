import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductShowcase from './ProductShowcase';

const ProductCatalog = () => {
  // State for selected product and category
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Refs for scroll tracking and animation
  const catalogRef = useRef(null);
  const stageRef = useRef(null);
  const orbitsRef = useRef(null);
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Products', icon: 'fas fa-th-large' },
    { id: 'precision', name: 'Precision Components', icon: 'fas fa-cog' },
    { id: 'aerospace', name: 'Aerospace', icon: 'fas fa-plane' },
    { id: 'medical', name: 'Medical', icon: 'fas fa-heartbeat' },
    { id: 'robotics', name: 'Robotics', icon: 'fas fa-robot' },
    { id: 'defense', name: 'Defense', icon: 'fas fa-shield-alt' },
    { id: 'energy', name: 'Energy', icon: 'fas fa-bolt' }
  ];

  // Enhanced product data with more details and products
  const products = [
    // Precision Components
    {
      id: 'precision-gears',
      name: 'Precision Gear Systems',
      category: 'precision',
      image: '/images/precision-spur-gears.png',
      description: 'Ultra-precise gear systems manufactured to exacting tolerances for optimal performance in demanding applications.',
      features: [
        'Tolerance class: DIN 5 | AGMA 13',
        'Module range: 0.3-8',
        'Noise reduction technology',
        'Extended service life',
        'Custom tooth profiles available'
      ],
      specifications: {
        precision: '±0.003mm',
        materials: ['Aerospace-grade alloys', 'Case-hardened steel', 'Specialized composites'],
        applications: ['Industrial automation', 'Aerospace mechanisms', 'Medical devices', 'Defense systems']
      },
      highlights: 'Our precision gear systems feature advanced tooth profiles and surface treatments for maximum efficiency and durability.'
    },
    {
      id: 'high-precision-bearings',
      name: 'High-Precision Bearing Systems',
      category: 'precision',
      image: '/images/precision-bearings.png',
      description: 'Advanced bearing systems designed for exceptional rotational accuracy and reduced friction in critical applications.',
      features: [
        'Ultra-precise raceway geometry',
        'Ceramic hybrid options',
        'Low-friction seals',
        'Specialized lubrication',
        'Extended service intervals'
      ],
      specifications: {
        precision: 'ABEC 7-9 (P4-P2)',
        materials: ['Vacuum-degassed steel', 'Silicon nitride ceramics', 'Engineered polymers'],
        applications: ['Medical equipment', 'Optical systems', 'Semiconductor manufacturing', 'Aerospace controls']
      },
      highlights: 'Our high-precision bearings incorporate advanced materials and geometries to minimize friction and maximize rotational accuracy.'
    },
    {
      id: 'custom-drive-shafts',
      name: 'Custom Drive Shaft Assemblies',
      category: 'precision',
      image: '/images/precision-shafts.png',
      description: 'Engineered drive shaft assemblies custom-designed for optimal torque transmission and dimensional stability.',
      features: [
        'Ultra-precise balancing',
        'Custom spline profiles',
        'Vibration dampening',
        'High fatigue resistance',
        'Temperature-stabilized alloys'
      ],
      specifications: {
        precision: '±0.004mm',
        materials: ['High-strength alloy steel', 'Carbon fiber composites', 'Titanium alloys'],
        applications: ['Robotics', 'Powertrain systems', 'Medical devices', 'Defense applications']
      },
      highlights: 'Each drive shaft assembly is designed and manufactured to precise specifications for optimal performance in its intended application.'
    },
    
    // Aerospace Components
    {
      id: 'turbine-components',
      name: 'Turbine Precision Components',
      category: 'aerospace',
      image: '/images/bevel-gears.png', // Assuming this could work for turbine components
      description: 'High-performance components for aerospace turbine systems, engineered for reliability in extreme conditions.',
      features: [
        'Heat-resistant superalloys',
        'Precision-balanced design',
        'Optimized aerodynamics',
        'High-temperature capability',
        'Advanced surface treatments'
      ],
      specifications: {
        precision: '±0.005mm',
        materials: ['Inconel', 'Titanium alloys', 'Single-crystal superalloys'],
        applications: ['Aircraft engines', 'Power generation', 'Propulsion systems']
      },
      highlights: 'Our turbine components are designed to withstand extreme temperatures and stresses while maintaining dimensional stability.'
    },
    {
      id: 'flight-control-actuators',
      name: 'Flight Control Actuator Systems',
      category: 'aerospace',
      image: '/images/precision-shafts.png', // Repurposing image for actuators
      description: 'Precision-engineered actuator systems for aircraft flight controls with exceptional reliability and response characteristics.',
      features: [
        'Tight tolerance assemblies',
        'Lightweight design',
        'Redundant safety features',
        'Advanced sealing technology',
        'Extended maintenance intervals'
      ],
      specifications: {
        precision: '±0.004mm',
        materials: ['Aerospace aluminum', 'Titanium alloys', 'High-strength steel'],
        applications: ['Commercial aircraft', 'Military aviation', 'Space systems']
      },
      highlights: 'Our flight control actuators deliver precise, reliable movement critical for aircraft maneuverability and safety.'
    },
    
    // Medical Components
    {
      id: 'surgical-robotics',
      name: 'Surgical Robotics Components',
      category: 'medical',
      image: '/images/multi-material-systems.png', // Repurposing image
      description: 'Ultra-precise components for robotic surgical systems, enabling advanced minimally invasive procedures.',
      features: [
        'Micro-precision gearing',
        'Sterilizable materials',
        'Biocompatible surfaces',
        'Zero-backlash mechanisms',
        'Compact high-torque designs'
      ],
      specifications: {
        precision: '±0.002mm',
        materials: ['Medical-grade stainless steel', 'Biocompatible titanium', 'Engineered polymers'],
        applications: ['Robotic surgery systems', 'Medical instruments', 'Diagnostic equipment']
      },
      highlights: 'These components enable surgeons to perform delicate procedures with enhanced precision and control.'
    },
    {
      id: 'implant-components',
      name: 'Medical Implant Components',
      category: 'medical',
      image: '/images/custom-components.png', // Repurposing image
      description: 'Precision-engineered components for medical implants with biocompatible materials and surfaces.',
      features: [
        'Biocompatible materials',
        'Surface treatment for osseointegration',
        'Custom geometries',
        'Long-term stability',
        'MRI-compatible options'
      ],
      specifications: {
        precision: '±0.005mm',
        materials: ['Titanium alloys', 'Medical-grade cobalt-chrome', 'PEEK polymers'],
        applications: ['Orthopedic implants', 'Cardiovascular devices', 'Neurological implants']
      },
      highlights: 'Our implant components are manufactured with exceptional precision and surface quality for optimal biocompatibility.'
    },
    
    // Robotics Components
    {
      id: 'precision-servo-drives',
      name: 'Precision Servo Drive Systems',
      category: 'robotics',
      image: '/images/helical-gears.png', // Repurposing image
      description: 'High-performance servo drive systems for advanced robotics with exceptional positioning accuracy.',
      features: [
        'High torque-to-inertia ratio',
        'Ultra-low backlash',
        'Integrated feedback systems',
        'Compact design',
        'Advanced thermal management'
      ],
      specifications: {
        precision: '±0.003mm positioning',
        materials: ['High-grade electrical steel', 'Rare-earth magnets', 'Specialized copper alloys'],
        applications: ['Industrial robots', 'Collaborative robots', 'Automated manufacturing']
      },
      highlights: 'Our servo drive systems enable robots to achieve precise, repeatable movements essential for advanced automation.'
    },
    {
      id: 'robotic-joint-mechanisms',
      name: 'Robotic Joint Mechanisms',
      category: 'robotics',
      image: '/images/splined-shafts.png', // Repurposing image
      description: 'Advanced joint mechanisms that provide robots with smooth, precise articulation and movement capabilities.',
      features: [
        'Multi-axis freedom',
        'Zero-backlash gearing',
        'Integrated torque sensing',
        'Compact form factor',
        'Vibration dampening'
      ],
      specifications: {
        precision: '±0.006mm',
        materials: ['Hardened steel', 'Aluminum alloys', 'Composite bearings'],
        applications: ['Humanoid robots', 'Industrial manipulators', 'Automated inspection systems']
      },
      highlights: 'These mechanisms enable complex, fluid movements that mimic natural articulation for advanced robotics.'
    },
    
    // Defense Components
    {
      id: 'ballistic-guidance',
      name: 'Ballistic Guidance Systems',
      category: 'defense',
      image: '/images/industrial-axles.png', // Repurposing image
      description: 'Precision components for ballistic guidance systems that ensure accuracy and reliability in critical defense applications.',
      features: [
        'Extreme environmental resistance',
        'Shock and vibration isolation',
        'High-G survivability',
        'Redundant safety features',
        'Extended operational life'
      ],
      specifications: {
        precision: '±0.007mm',
        materials: ['Military-grade alloys', 'Specialized composites', 'Hardened electronics enclosures'],
        applications: ['Guided systems', 'Defense platforms', 'Security applications']
      },
      highlights: 'Our defense components are engineered to perform reliably under the most demanding operational conditions.'
    },
    {
      id: 'tactical-vehicle-systems',
      name: 'Tactical Vehicle Systems',
      category: 'defense',
      image: '/images/bushings.png', // Repurposing image
      description: 'Robust mechanical systems for tactical vehicles designed to operate in extreme conditions with maximum reliability.',
      features: [
        'Enhanced durability designs',
        'Extreme temperature operation',
        'Dust and moisture resistance',
        'Field-serviceable components',
        'Extended maintenance intervals'
      ],
      specifications: {
        precision: '±0.010mm',
        materials: ['Armor-grade alloys', 'High-impact composites', 'Specialized elastomers'],
        applications: ['Military vehicles', 'Border security', 'Critical infrastructure protection']
      },
      highlights: 'These systems are built to withstand extreme operational environments while maintaining functional precision.'
    },
    
    // Energy Components
    {
      id: 'turbine-generation',
      name: 'Turbine Generation Components',
      category: 'energy',
      image: '/images/precision-spur-gears.png', // Repurposing image
      description: 'Precision-engineered components for power generation turbines optimized for efficiency and longevity.',
      features: [
        'Optimized fluid dynamics',
        'Advanced material metallurgy',
        'Extended fatigue life',
        'Thermal stability',
        'Corrosion resistance'
      ],
      specifications: {
        precision: '±0.008mm',
        materials: ['Heat-resistant superalloys', 'Specialized stainless steels', 'Advanced ceramics'],
        applications: ['Power generation', 'Renewable energy', 'Industrial turbines']
      },
      highlights: 'Our turbine components are designed for maximum energy efficiency and reliability in continuous operation.'
    },
    {
      id: 'solar-tracking-systems',
      name: 'Solar Tracking Mechanisms',
      category: 'energy',
      image: '/images/precision-bearings.png', // Repurposing image
      description: 'Precision mechanical systems that enable solar arrays to track the sun for optimal energy generation efficiency.',
      features: [
        'Weather-resistant design',
        'Low-maintenance operation',
        'High precision positioning',
        'Distributed load management',
        'Automated calibration'
      ],
      specifications: {
        precision: '±0.1° tracking accuracy',
        materials: ['UV-resistant alloys', 'Self-lubricating bearings', 'Corrosion-resistant fasteners'],
        applications: ['Solar farms', 'Concentrated solar power', 'Photovoltaic installations']
      },
      highlights: 'These tracking systems significantly increase energy output through precise sun-following movements throughout the day.'
    }
  ];

  // Filter products based on selected category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Initialize with first product selected
  useEffect(() => {
    if (filteredProducts.length > 0 && !selectedProduct) {
      // Immediately set selected product for UI highlight
      setSelectedProduct(filteredProducts[0]);
      
      // Shorter loading time for better performance
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [filteredProducts, selectedProduct]);

  // Handle category change
  useEffect(() => {
    setShowDetails(false);
    
    // Immediately update selected product for UI highlight
    if (filteredProducts.length > 0) {
      setSelectedProduct(filteredProducts[0]);
    }
    
    // Shorter loading time for better responsiveness
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [activeCategory, filteredProducts]);

  // Handle product selection
  const handleProductSelect = (product) => {
    if (product.id === selectedProduct?.id) return;
    
    // First update UI immediately for responsive feel
    setSelectedProduct(product);
    setShowDetails(false);
    
    // Use a much shorter loading time for better responsiveness
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Toggle details panel
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Setup orbiting animation - optimized for performance
  useEffect(() => {
    if (!orbitsRef.current) return;
    
    // We'll update the orbit immediately without waiting for loading state
    // This makes the UI feel more responsive
    
    // Create orbit animations for background products
    const orbits = orbitsRef.current;
    
    // Clear previous orbit elements
    while (orbits.firstChild) {
      orbits.removeChild(orbits.firstChild);
    }
    
    // Create new orbit elements for each product (except selected)
    filteredProducts.forEach((product, index) => {
      if (selectedProduct && product.id === selectedProduct.id) return;
      
      const orbitEl = document.createElement('div');
      orbitEl.className = 'absolute rounded-full border border-accent/10';
      
      // Calculate orbit size and position
      const size = 300 + (index * 50);
      orbitEl.style.width = `${size}px`;
      orbitEl.style.height = `${size}px`;
      orbitEl.style.top = '50%';
      orbitEl.style.left = '50%';
      orbitEl.style.transform = 'translate(-50%, -50%)';
      
      // Add animation with reduced duration for better performance
      orbitEl.style.animation = `spin-${index % 2 === 0 ? 'clockwise' : 'counter'} ${15 + index * 3}s linear infinite`;
      
      // Add a product marker on the orbit
      const marker = document.createElement('div');
      marker.className = 'absolute w-16 h-16 p-1 rounded-full bg-dark-gray/80 backdrop-blur-sm border border-gray-700 overflow-hidden cursor-pointer transition-all duration-200 hover:scale-110 hover:border-accent/50 product-orbit-marker';
      marker.style.top = '0%';
      marker.style.left = '50%';
      marker.style.transform = 'translate(-50%, -50%)';
      marker.setAttribute('data-product-id', product.id);
      
      // Add product image
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      img.className = 'w-full h-full object-contain';
      
      marker.appendChild(img);
      orbitEl.appendChild(marker);
      orbits.appendChild(orbitEl);
      
      // Add click event to marker with immediate visual feedback
      marker.addEventListener('click', () => {
        const productId = marker.getAttribute('data-product-id');
        const product = products.find(p => p.id === productId);
        if (product) {
          // Add a visual pulse effect before handling selection
          marker.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.7)';
          setTimeout(() => {
            handleProductSelect(product);
          }, 100); // Very short delay for visual feedback
        }
      });
    });
    
    // Add keyframes for orbit animations if they don't exist
    if (!document.getElementById('orbit-keyframes')) {
      const style = document.createElement('style');
      style.id = 'orbit-keyframes';
      style.innerHTML = `
        @keyframes spin-clockwise {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-counter {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // Clean up
      const style = document.getElementById('orbit-keyframes');
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, [selectedProduct, filteredProducts]);

  return (
    <section id="products" className="relative min-h-screen bg-dark text-white overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particle effects */}
        {Array.from({ length: 30 }).map((_, i) => (
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
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`grid-h-${i}`}
              className="absolute bg-accent/50"
              style={{
                height: '1px',
                width: '100%',
                top: `${(i + 1) * 5}%`,
              }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`grid-v-${i}`}
              className="absolute bg-accent/50"
              style={{
                width: '1px',
                height: '100%',
                left: `${(i + 1) * 5}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={catalogRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="text-accent font-medium tracking-wider">VIRTUAL PRODUCT SHOWROOM</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Precision <span className="text-accent">Engineering</span> Excellence
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-300 mb-10"
          >
            Explore our comprehensive range of precision-engineered components 
            designed for the most demanding applications across multiple industries.
          </motion.p>
          
          {/* Category Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(0, 229, 255, 0.15)',
                  y: -5
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
                className={`px-5 py-3 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-accent/20 text-white border border-accent/80 shadow-lg shadow-accent/20' 
                    : 'bg-dark-gray/50 text-gray-300 border border-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <i className={`${category.icon} ${activeCategory === category.id ? 'text-accent' : 'text-gray-400'}`}></i>
                  <span>{category.name}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Product Display Stage */}
        <div className="relative min-h-[800px]" ref={stageRef}>
          {/* Virtual 3D Stage */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Orbiting products */}
            <div ref={orbitsRef} className="absolute inset-0 pointer-events-none"></div>
            
            {/* Central product display */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  {/* Fast Modern Loading Indicator */}
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-b-accent animate-spin" style={{ animationDuration: '0.8s' }}></div>
                    <div className="absolute inset-[8px] rounded-full border-2 border-transparent border-l-accent border-r-accent animate-spin" style={{ animationDuration: '1s', animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-[16px] rounded-full border-2 border-transparent border-t-accent border-r-accent animate-spin" style={{ animationDuration: '1.2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-accent rounded-full -ml-2 -mt-2 animate-pulse" style={{ animationDuration: '0.8s' }}></div>
                  </div>
                  <div className="text-xl font-light text-accent animate-pulse mb-2" style={{ animationDuration: '1s' }}>Loading Product</div>
                  <div className="text-sm text-gray-400">Please wait...</div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedProduct?.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col md:flex-row gap-10 items-center bg-dark-gray/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 max-w-6xl"
                  >
                    {/* Product Image */}
                    <motion.div 
                      className="w-full md:w-1/2 relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <div className="relative aspect-square flex items-center justify-center overflow-hidden group rounded-xl">
                        {/* Image with glow effect */}
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/10 to-dark/30 z-10 rounded-xl"></div>
                        
                        <motion.div 
                          className="relative"
                          animate={{ 
                            y: [0, -10, 0], 
                            rotate: [0, 1, 0, -1, 0]
                          }}
                          transition={{ 
                            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                            rotate: { repeat: Infinity, duration: 8, ease: "easeInOut" }
                          }}
                        >
                          <motion.div 
                            className="absolute -inset-8 bg-accent/5 rounded-full filter blur-xl opacity-70"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          />
                          <img 
                            src={selectedProduct?.image} 
                            alt={selectedProduct?.name} 
                            className="relative z-10 max-w-full max-h-[400px] object-contain"
                          />
                        </motion.div>
                        
                        {/* Tech data points */}
                        <div className="absolute inset-0 pointer-events-none">
                          {[1, 2, 3].map((_, i) => (
                            <motion.div
                              key={`data-point-${i}`}
                              className="absolute w-2 h-2 rounded-full bg-accent/80"
                              style={{
                                top: `${20 + i * 25}%`,
                                left: `${10 + i * 30}%`,
                                boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)'
                              }}
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2 + i,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            >
                              <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full border border-accent/60 animate-ping opacity-60"></div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Specifications overlay */}
                        <div className="absolute bottom-3 left-3 bg-dark-gray/80 backdrop-blur-sm border border-gray-800/80 rounded-lg p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-xs font-mono">
                            <div className="text-accent mb-1">PRECISION SPECS</div>
                            <div className="flex justify-between gap-4 text-gray-300">
                              <span>Accuracy:</span>
                              <span className="text-accent">{selectedProduct?.specifications.precision}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Product Type Badge */}
                      <div className="absolute -top-4 -right-4 bg-dark-gray/80 backdrop-blur-sm text-accent px-3 py-1 rounded-md text-sm border border-accent/30 z-30">
                        {categories.find(c => c.id === selectedProduct?.category)?.name || 'Product'}
                      </div>
                    </motion.div>
                    
                    {/* Product Details */}
                    <motion.div 
                      className="w-full md:w-1/2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <h3 className="text-3xl font-bold mb-4 text-white">{selectedProduct?.name}</h3>
                      
                      <div className="h-1 w-20 bg-accent/50 rounded-full mb-6"></div>
                      
                      <p className="text-gray-300 mb-8 leading-relaxed">{selectedProduct?.description}</p>
                      
                      {/* Features List */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold mb-3 text-accent">Key Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedProduct?.features.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (index * 0.1) }}
                              className="flex items-start gap-2"
                            >
                              <div className="text-accent mt-1"><i className="fas fa-check"></i></div>
                              <div className="text-gray-300 text-sm">{feature}</div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Materials */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-accent">Available Materials</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct?.specifications.materials.map((material, index) => (
                            <motion.span 
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + (index * 0.1) }}
                              className="bg-dark-gray/60 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700"
                            >
                              {material}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-4 mt-8">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-accent hover:bg-accent-light text-dark font-bold py-3 px-5 rounded-md flex items-center justify-center transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30"
                          onClick={toggleDetails}
                        >
                          {showDetails ? 'Hide Specifications' : 'View Specifications'}
                          <i className={`fas fa-chevron-${showDetails ? 'up' : 'down'} ml-2`}></i>
                        </motion.button>
                        
                        <motion.a
                          href="#contact"
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="border border-accent/40 hover:border-accent/70 hover:bg-accent/10 text-white font-bold py-3 px-5 rounded-md flex items-center justify-center transition-all duration-300"
                        >
                          Request Information
                          <i className="fas fa-arrow-right ml-2"></i>
                        </motion.a>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
          
          {/* Detailed Specifications Panel */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="relative z-20 max-w-6xl mx-auto mt-8 bg-dark-gray/60 backdrop-blur-lg rounded-xl p-8 border border-gray-800"
              >
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={toggleDetails}
                    className="text-gray-400 hover:text-accent"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-accent">{selectedProduct?.name} Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Technical Specifications */}
                  <div className="col-span-2">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <i className="fas fa-cogs text-accent mr-2"></i>
                      <span>Technical Details</span>
                    </h4>
                    
                    <div className="bg-dark/40 rounded-lg p-6 border border-gray-800">
                      <p className="text-gray-300 mb-6 italic">{selectedProduct?.highlights}</p>
                      
                      {/* Specs Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <tbody>
                            <tr className="border-b border-gray-800">
                              <td className="py-3 text-gray-400 font-semibold">Precision</td>
                              <td className="py-3 text-white">{selectedProduct?.specifications.precision}</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="py-3 text-gray-400 font-semibold">Primary Materials</td>
                              <td className="py-3 text-white">{selectedProduct?.specifications.materials.join(', ')}</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="py-3 text-gray-400 font-semibold">Applications</td>
                              <td className="py-3 text-white">{selectedProduct?.specifications.applications.join(', ')}</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="py-3 text-gray-400 font-semibold">Category</td>
                              <td className="py-3 text-white">{categories.find(c => c.id === selectedProduct?.category)?.name}</td>
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
                  
                  {/* Applications and Information */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <i className="fas fa-industry text-accent mr-2"></i>
                      <span>Applications</span>
                    </h4>
                    
                    <div className="bg-dark/40 rounded-lg p-6 border border-gray-800 h-full">
                      <ul className="space-y-3">
                        {selectedProduct?.specifications.applications.map((app, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1 text-accent"><i className="fas fa-check-circle"></i></div>
                            <div>
                              <div className="font-medium text-white">{app}</div>
                              <div className="text-sm text-gray-400">Engineered for precision and reliability</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8">
                        <button className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/50 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                          <i className="fas fa-file-pdf"></i>
                          <span>Download Datasheet</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Product Thumbnails */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Browse Our Product Range</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.03), duration: 0.3 }}
                onClick={() => handleProductSelect(product)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="relative cursor-pointer"
              >
                {/* Outer glow effect for selected product */}
                {selectedProduct?.id === product.id && (
                  <motion.div 
                    className="absolute -inset-1 bg-accent/20 rounded-xl blur-md z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                {/* Card content */}
                <div className={`relative z-10 bg-dark-gray/50 backdrop-blur-sm rounded-lg p-4 border transition-all duration-200 ${
                  selectedProduct?.id === product.id
                    ? 'border-accent shadow-xl shadow-accent/30 outline outline-1 outline-accent product-highlight'
                    : 'border-gray-800 hover:border-gray-700'
                }`}>
                <div className="aspect-square rounded-md overflow-hidden bg-black/30 flex items-center justify-center p-2 mb-3">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                    animate={hoveredProduct === product.id ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h4 className={`text-sm font-medium text-center line-clamp-2 ${selectedProduct?.id === product.id ? 'text-accent' : 'text-gray-300'}`}>
                  {product.name}
                </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-dark-gray/80 to-black/80 backdrop-blur-sm rounded-xl p-12 border border-gray-800 relative overflow-hidden group"
        >
          {/* Animated accent border */}
          <div className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-1000 ease-in-out" style={{ background: 'linear-gradient(90deg, #00e5ff, #5472d3) border-box', mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)' }}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Need a <span className="text-accent">Custom Solution</span>?</h3>
              <p className="text-xl text-gray-300 max-w-2xl">Our engineering team can design and manufacture custom components tailored to your exact specifications and requirements.</p>
            </div>
            
            <motion.a 
              href="#contact" 
              className="bg-accent hover:bg-accent-light text-dark font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-500 shadow-lg shadow-accent/20 hover:shadow-accent/40 relative overflow-hidden"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Add shine effect on hover */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              
              <span className="relative z-10 flex items-center">
                REQUEST A CONSULTATION
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
    </section>
  );
};

export default ProductCatalog;