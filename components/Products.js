import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

const Products = () => {
  // State for active product category filter
  const [activeCategory, setActiveCategory] = useState('all');
  // State to track if products are loading
  const [isLoading, setIsLoading] = useState(true);
  // State for the featured product
  const [featuredProduct, setFeaturedProduct] = useState(0);
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for active product
  const [activeProduct, setActiveProduct] = useState(0);
  
  // Simulate loading time for products and reset active product when category changes
  useEffect(() => {
    setIsLoading(true);
    setActiveProduct(0); // Reset to first product when category changes
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Short delay for loading animation
    
    return () => clearTimeout(timer);
  }, [activeCategory]);
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const productsGridRef = useRef(null);
  const featuredRef = useRef(null);
  
  // Animation controls
  const heroControls = useAnimation();
  const gridControls = useAnimation();
  const featuredControls = useAnimation();
  
  // Detect when elements are in view
  const heroInView = useInView(heroRef, { once: true, threshold: 0.2 });
  const productsGridInView = useInView(productsGridRef, { once: true, threshold: 0.1 });
  const featuredInView = useInView(featuredRef, { once: true, threshold: 0.2 });
  
  // Refs and animation controls for sections
  
  // Product categories
  const categories = [
    { id: 'all', name: 'All Products', icon: 'fa-th-large' },
    { id: 'gears', name: 'Gears', icon: 'fa-cog' },
    { id: 'shafts', name: 'Shafts & Axles', icon: 'fa-arrows-alt-h' },
    { id: 'bearings', name: 'Bearings', icon: 'fa-circle-notch' },
    { id: 'custom', name: 'Custom Components', icon: 'fa-puzzle-piece' },
    { id: 'specialty', name: 'Specialty Systems', icon: 'fa-microchip' }
  ];
  
  // Products data
  const products = [
    {
      id: 'p1',
      title: 'Precision Spur Gears',
      category: 'gears',
      image: '/images/precision-spur-gears.png',
      description: 'High-quality spur gears manufactured with precision to ensure smooth power transmission and optimal performance.',
      highlights: ['Module range: 0.5-6', 'Tolerance class: DIN 6', 'Material options: Steel, Brass, Plastic'],
      specifications: {
        precision: '±0.005mm',
        materials: ['Alloy Steel', 'Stainless Steel', 'Brass', 'Engineering Plastics'],
        treatments: ['Heat Treatment', 'Surface Hardening', 'Precision Grinding'],
        applications: ['Automotive', 'Industrial Equipment', 'Robotics']
      }
    },
    {
      id: 'p2',
      title: 'Helical Gears',
      category: 'gears',
      image: '/images/helical-gears.png',
      description: 'Precision-engineered helical gears designed for smooth, quiet operation and higher load capacity.',
      highlights: ['Helix angle: 15°-30°', 'Reduced noise operation', 'Higher load capacity'],
      specifications: {
        precision: '±0.008mm',
        materials: ['Alloy Steel', 'Carbon Steel', 'Bronze'],
        treatments: ['Carburizing', 'Nitriding', 'Precision Grinding'],
        applications: ['Gearboxes', 'Heavy Machinery', 'Power Transmission']
      }
    },
    {
      id: 'p3',
      title: 'Bevel Gears',
      category: 'gears',
      image: '/images/bevel-gears.png',
      description: 'Precision bevel gears for applications requiring changes in direction of rotating shafts.',
      highlights: ['Pressure angle: 20°', 'Intersecting shaft applications', 'Spiral and straight tooth options'],
      specifications: {
        precision: '±0.010mm',
        materials: ['Alloy Steel', 'Stainless Steel', 'Tool Steel'],
        treatments: ['Case Hardening', 'Shot Peening', 'Lapping'],
        applications: ['Automotive Differentials', 'Power Tools', 'Marine Equipment']
      }
    },
    {
      id: 'p4',
      title: 'Precision Shafts',
      category: 'shafts',
      image: '/images/precision-shafts.png',
      description: 'High-quality precision shafts manufactured to tight tolerances for various industrial applications.',
      highlights: ['Diameter range: 5mm-150mm', 'Straightness: <0.002mm/100mm', 'Custom keyways available'],
      specifications: {
        precision: '±0.004mm',
        materials: ['Carbon Steel', 'Alloy Steel', 'Stainless Steel', 'Tool Steel'],
        treatments: ['Induction Hardening', 'Precision Grinding', 'Polishing'],
        applications: ['Power Transmission', 'Automation Equipment', 'Precision Machinery']
      }
    },
    {
      id: 'p5',
      title: 'Splined Shafts',
      category: 'shafts',
      image: '/images/splined-shafts.png',
      description: 'Precision-engineered splined shafts designed for applications requiring torque transmission with axial movement.',
      highlights: ['Multiple spline types', 'Enhanced torque capacity', 'Allows axial movement'],
      specifications: {
        precision: '±0.006mm',
        materials: ['Alloy Steel', 'Tool Steel', 'Heat-Treated Steel'],
        treatments: ['Surface Hardening', 'Precision Grinding', 'Surface Finishing'],
        applications: ['Automotive Transmissions', 'Agricultural Equipment', 'Industrial Machinery']
      }
    },
    {
      id: 'p6',
      title: 'Industrial Axles',
      category: 'shafts',
      image: '/images/industrial-axles.png',
      description: 'Robust and reliable industrial axles manufactured to withstand heavy loads and provide consistent performance.',
      highlights: ['Load capacity: Up to 10 tons', 'High durability design', 'Fatigue-resistant materials'],
      specifications: {
        precision: '±0.010mm',
        materials: ['Alloy Steel', 'Carbon Steel', 'Heat-Treated Steel'],
        treatments: ['Through Hardening', 'Stress Relieving', 'Surface Treatment'],
        applications: ['Heavy Machinery', 'Construction Equipment', 'Material Handling']
      }
    },
    {
      id: 'p7',
      title: 'Precision Bearings',
      category: 'bearings',
      image: '/images/precision-bearings.png',
      description: 'High-quality bearings designed to reduce friction and support loads in rotating machinery.',
      highlights: ['ID range: 10mm-200mm', 'Low friction operation', 'Extended service life'],
      specifications: {
        precision: 'Class P5/ABEC 5',
        materials: ['Chrome Steel', 'Stainless Steel', 'Ceramic Hybrids'],
        treatments: ['Heat Stabilization', 'Super Finishing', 'Special Lubrication'],
        applications: ['High-Speed Machinery', 'Precision Equipment', 'Medical Devices']
      }
    },
    {
      id: 'p8',
      title: 'Bushings',
      category: 'bearings',
      image: '/images/bushings.png',
      description: 'Precision-engineered bushings for reducing friction between moving parts, manufactured from high-quality materials.',
      highlights: ['Multiple mounting options', 'Self-lubricating variants', 'High wear resistance'],
      specifications: {
        precision: '±0.005mm',
        materials: ['Bronze', 'Steel/Bronze', 'Polymer', 'Nylon'],
        treatments: ['Impregnation', 'Coating', 'Surface Texturing'],
        applications: ['Automotive', 'Hydraulic Systems', 'General Machinery']
      }
    },
    {
      id: 'p9',
      title: 'Custom Components',
      category: 'custom',
      image: '/images/custom-components.png',
      description: 'Bespoke precision components tailored to your specific requirements, manufactured using advanced CNC technology.',
      highlights: ['Tailored specifications', 'Engineering consultation', 'Prototype to production'],
      specifications: {
        precision: 'Down to ±0.003mm',
        materials: ['Various Metals', 'Engineering Plastics', 'Composite Materials'],
        treatments: ['Custom Heat Treatments', 'Surface Finishing', 'Coating Options'],
        applications: ['Specialized Equipment', 'Research & Development', 'Unique Applications']
      }
    },
    {
      id: 'p10',
      title: 'Multi-Material Systems',
      category: 'specialty',
      image: '/images/multi-material-systems.png',
      description: 'Engineering solutions combining multiple materials into integrated precision components for complex engineering challenges.',
      highlights: ['Material optimization', 'Enhanced functionality', 'Weight reduction'],
      specifications: {
        precision: '±0.008mm',
        materials: ['Metal-Polymer Combinations', 'Bi-Metal Constructions', 'Composite Integrations'],
        treatments: ['Interface Bonding', 'Selective Hardening', 'Advanced Assembly'],
        applications: ['Aerospace', 'Medical Equipment', 'Advanced Automation']
      }
    }
  ];
  
  // Filter products based on active category and search term
  const filteredProducts = products
    .filter(product => activeCategory === 'all' || product.category === activeCategory)
    .filter(product => {
      if (!searchTerm) return true;
      return product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             product.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
  // Featured products array (can be different from the full product list)
  const featuredProducts = [
    {
      id: 'featured1',
      title: 'Precision Engineering Excellence',
      subtitle: 'Advanced Gear Systems',
      category: 'gears',
      description: 'Our precision-engineered gear systems deliver exceptional performance through advanced manufacturing techniques and premium materials. Designed for reliability in the most demanding applications.',
      image: '/images/precision-spur-gears.png',
      stats: [
        { label: 'Precision', value: '±0.005mm' },
        { label: 'Hardness', value: '58-62 HRC' },
        { label: 'Lifespan', value: '10+ years' }
      ],
      bgColor: 'from-blue-900/40 to-cyan-900/20'
    },
    {
      id: 'featured2',
      title: 'Durability Redefined',
      subtitle: 'Premium Shaft Solutions',
      category: 'shafts',
      description: 'Engineered for exceptional torque transmission and dimensional stability. Our shaft solutions feature premium materials and precision machining to ensure optimal performance even in harsh environments.',
      image: '/images/precision-shafts.png',
      stats: [
        { label: 'Straightness', value: '<0.002mm' },
        { label: 'Surface Finish', value: 'Ra 0.4' },
        { label: 'Fatigue Resistance', value: 'Superior' }
      ],
      bgColor: 'from-purple-900/40 to-blue-900/20'
    },
    {
      id: 'featured3',
      title: 'Friction Reduction Technology',
      subtitle: 'Advanced Bearing Systems',
      category: 'bearings',
      description: 'Our precision bearings deliver exceptional rotational accuracy and extended service life through advanced manufacturing processes and premium materials. Designed for reliable operation in critical applications.',
      image: '/images/precision-bearings.png',
      stats: [
        { label: 'Runout', value: '<0.003mm' },
        { label: 'Noise Level', value: '<65 dB' },
        { label: 'Temperature Range', value: '-40°C to 150°C' }
      ],
      bgColor: 'from-cyan-900/40 to-emerald-900/20'
    }
  ];
  
  // Section divider patterns
  const dividerPaths = [
    'M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,69.3C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
    'M0,128L48,117.3C96,107,192,85,288,80C384,75,480,85,576,112C672,139,768,181,864,170.7C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    'M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,192C840,203,960,213,1080,192C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
  ];
  
  // Effect to trigger animations when elements come into view
  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
    if (productsGridInView) {
      gridControls.start('visible');
    }
    if (featuredInView) {
      featuredControls.start('visible');
    }
  }, [heroInView, productsGridInView, featuredInView, heroControls, gridControls, featuredControls]);
  
  // Ref to store the interval ID
  const intervalId = useRef(null);
  
  // Auto cycle featured products with manual navigation support
  useEffect(() => {
    // Store interval ID in a ref so we can clear it when manually navigating
    intervalId.current = setInterval(() => {
      setFeaturedProduct(prev => (prev + 1) % featuredProducts.length);
    }, 8000);
    
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [featuredProducts.length]);
  
  // Function to go to next slide
  const goToNextSlide = () => {
    const nextIndex = (featuredProduct + 1) % featuredProducts.length;
    handleProductNavigation(nextIndex);
  };

  // Function to go to previous slide
  const goToPrevSlide = () => {
    const prevIndex = featuredProduct === 0 ? featuredProducts.length - 1 : featuredProduct - 1;
    handleProductNavigation(prevIndex);
  };

  // Drag handling for swipe gestures
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      goToNextSlide();
    } else if (offset.x > swipeThreshold) {
      goToPrevSlide();
    }
  };
  
  // Function to handle manual navigation with immediate transition
  const handleProductNavigation = (index) => {
    // Immediately set the featured product to the selected index
    setFeaturedProduct(index);
    
    // Clear the auto-cycle interval and restart it
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    
    // Reset the interval timer
    intervalId.current = setInterval(() => {
      setFeaturedProduct(prev => (prev + 1) % featuredProducts.length);
    }, 8000);
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
  
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
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
    }),
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };
  
  const categoryButtonVariants = {
    initial: { opacity: 0.7 },
    active: { 
      opacity: 1,
      backgroundColor: "rgba(0, 229, 255, 0.15)",
      borderColor: "rgba(0, 229, 255, 0.5)",
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -3,
      backgroundColor: "rgba(0, 229, 255, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <section id="products" ref={sectionRef} className="min-h-screen bg-dark text-white overflow-hidden">
      {/* Floating Particles Background */}
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
      
      {/* Products Hero Section - Modern Tech Interface */}
      <div ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden py-10 mt-4">
        {/* Advanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-gray/60 via-dark/80 to-dark-gray/60 z-0"></div>
        
        {/* Tech grid lines with glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-accent"
                style={{
                  height: '1px',
                  width: '100%',
                  top: `${(i + 1) * 7}%`,
                  left: 0,
                  transform: `rotate(${i % 2 === 0 ? '-0.3' : '0.3'}deg)`,
                  opacity: 0.3,
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)'
                }}
              />
            ))}
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i + 'v'}
                className="absolute bg-accent"
                style={{
                  width: '1px',
                  height: '100%',
                  left: `${(i + 1) * 4}%`,
                  top: 0,
                  opacity: 0.2,
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Tech data points and interface elements */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {/* Tracking point with scanning animation */}
          <motion.div
            className="absolute top-[140px] left-[80px] flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div 
              className="relative w-14 h-14"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <circle cx="50" cy="50" r="48" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1" fill="none" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent animate-ping opacity-70"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent absolute"></div>
              </div>
            </motion.div>
            <div className="ml-2 font-mono text-xs text-accent">
              <div>TRACKING: 2δ</div>
              <div>v{4}, ε{3}</div>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-20 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text Content - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Animated circuit graphic above the PRECISION COMPONENTS text */}
              <motion.div
                className="relative w-32 h-32 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0">
                  {/* Outer ring */}
                  <div className="w-full h-full rounded-full border border-accent/30 animate-[pulse_4s_ease-in-out_infinite]" />
                  
                  {/* Middle ring */}
                  <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 animate-[pulse_3s_ease-in-out_infinite_1s]" />
                  
                  {/* Inner circle */}
                  <div className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 animate-[pulse_2s_ease-in-out_infinite]">
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 animate-[pulse_1.5s_ease-in-out_infinite]" />
                  </div>
                  
                  {/* Circuit lines */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                      key={`circuit-${i}`}
                      className="absolute bg-accent/40"
                      style={{
                        width: '2px',
                        height: '15px',
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 45}deg) translateY(-20px)`,
                        transformOrigin: 'bottom center',
                        boxShadow: '0 0 5px rgba(0, 229, 255, 0.5)'
                      }}
                    />
                  ))}
                  
                  {/* Data points */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={`data-point-${i}`}
                      className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                      style={{
                        left: `${25 + Math.random() * 50}%`,
                        top: `${25 + Math.random() * 50}%`,
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
                <span className="text-accent font-medium tracking-wider">PRECISION COMPONENTS</span>
              </motion.div>
              
              <motion.h2 
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                <motion.span 
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }
                  }}
                >
                  Engineering <span className="text-accent">Mastery</span>
                </motion.span>
                <motion.span 
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }
                  }}
                >
                  in Motion
                </motion.span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Discover our comprehensive range of precision components, where advanced engineering
                and manufacturing excellence converge to create solutions that power industries worldwide.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.a 
                  href="#product-categories" 
                  className="group bg-accent hover:bg-accent-light text-dark font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-500 shadow-lg shadow-accent/20 hover:shadow-accent/40 relative overflow-hidden"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Add shine effect on hover */}
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                  
                  <span className="relative z-10 flex items-center">
                    EXPLORE PRODUCTS
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
              </motion.div>
            </motion.div>

            {/* Hero Image - Right Side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main hero image with glow effect */}
              <div className="relative rounded-lg overflow-hidden">
                {/* Glow effect around the image */}
                <div className="absolute -inset-0.5 bg-accent/20 rounded-lg blur-md z-0"></div>
                
                {/* Main image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-accent/30 z-10">
                  <img 
                    src="/images/hero-background.jpg" 
                    alt="Precision Engineering Components" 
                    className="w-full h-full object-cover transition-transform duration-10000 ease-out"
                  />
                  
                  {/* Scanning line effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent w-full h-full" 
                    initial={{ y: -500 }}
                    animate={{ y: 500 }}
                    transition={{ 
                      duration: 2.5, 
                      ease: "linear", 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </div>

                {/* Tech data readouts - Repositioned to avoid overlap */}
                <div className="absolute -bottom-8 -right-6 bg-dark-gray/80 backdrop-blur-sm rounded-md border border-accent/40 p-3 shadow-lg shadow-accent/10 z-20">
                  <div className="text-xs font-mono">
                    <div className="flex justify-between gap-4 text-accent">
                      <span>PRECISION:</span>
                      <span>±0.005mm</span>
                    </div>
                    <div className="flex justify-between gap-4 text-gray-300">
                      <span>BATCH:</span>
                      <span>A-4721</span>
                    </div>
                    <div className="flex justify-between gap-4 text-gray-300">
                      <span>STATUS:</span>
                      <span className="text-accent">OPTIMAL</span>
                    </div>
                  </div>
                </div>
                
                {/* Tech certification badge - Fixed positioning to avoid being cut off */}
                <div className="absolute -top-6 -left-6 bg-dark-gray/80 backdrop-blur-sm rounded-full border border-accent/40 p-3 w-20 h-20 flex items-center justify-center shadow-lg shadow-accent/10 z-30">
                  <div className="text-accent text-xs font-mono text-center">
                    <div>ISO</div>
                    <div>9001</div>
                  </div>
                </div>
                
                {/* 24/7 badge - Repositioned */}
                <div className="absolute top-1/4 -right-4 bg-dark-gray/80 backdrop-blur-sm rounded-full border border-accent/40 p-3 w-16 h-16 flex items-center justify-center shadow-lg shadow-accent/10 z-20">
                  <div className="text-accent text-xs font-mono text-center">24/7</div>
                </div>
                
                {/* Certified badge - Repositioned */}
                <div className="absolute bottom-1/4 -left-4 bg-dark-gray/80 backdrop-blur-sm rounded-full border border-accent/40 p-3 w-16 h-16 flex items-center justify-center shadow-lg shadow-accent/10 z-20">
                  <div className="text-accent text-xs font-mono text-center">Certified</div>
                </div>
              </div>
              
              {/* Data points */}
              <div className="absolute inset-0 pointer-events-none">
                {[1, 2, 3].map((_, i) => (
                  <motion.div
                    key={`data-point-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-accent"
                    style={{
                      top: `${20 + i * 25}%`,
                      left: `${15 + i * 30}%`,
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
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="relative z-10 w-full overflow-hidden -mt-1 text-dark-gray">
        <svg viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d={dividerPaths[0]}></path>
        </svg>
      </div>
      
      {/* Featured Product Section (Full-width card slider) */}
      <div ref={featuredRef} className="relative bg-dark-gray overflow-hidden py-20 -mt-1">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate={featuredControls}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={textRevealVariants} className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
              <span className="text-accent font-medium tracking-wider">FEATURED SOLUTIONS</span>
            </motion.div>
            
            <motion.h3 variants={textRevealVariants} className="text-4xl font-bold mb-6">
              Engineering <span className="text-accent">Excellence</span> in Every Component
            </motion.h3>
          </motion.div>
          
          {/* Featured product cards with animated transitions */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={featuredProduct}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.2
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={goToNextSlide}
                className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${featuredProducts[featuredProduct].bgColor} backdrop-blur-md border border-gray-800 cursor-pointer`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image side */}
                  <div className="p-8 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute -inset-4 bg-accent/5 rounded-full blur-xl"></div>
                      <motion.img
                        src={featuredProducts[featuredProduct].image}
                        alt={featuredProducts[featuredProduct].title}
                        className="relative z-10 max-w-full max-h-[300px] object-contain"
                        animate={{
                          y: [0, -15, 0],
                          transition: {
                            y: {
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Content side */}
                  <div className="p-8 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="text-accent mb-2 font-medium">
                        {featuredProducts[featuredProduct].subtitle}
                      </div>
                      <h3 className="text-3xl font-bold mb-4">
                        {featuredProducts[featuredProduct].title}
                      </h3>
                      <p className="text-gray-300 mb-6">
                        {featuredProducts[featuredProduct].description}
                      </p>
                      
                      {/* Stat boxes */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {featuredProducts[featuredProduct].stats.map((stat, i) => (
                          <motion.div
                            key={`stat-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                            className="bg-dark/30 backdrop-blur-sm rounded-lg p-3 text-center border border-accent/10"
                          >
                            <div className="text-gray-400 text-xs mb-1">{stat.label}</div>
                            <div className="font-mono text-accent font-semibold">{stat.value}</div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="bg-dark/50 hover:bg-accent/20 text-accent border border-accent/30 rounded-md py-3 px-6 inline-flex items-center transition-colors duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explore Technology
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Left/Right navigation arrows for desktop - new addition */}
            <div className="hidden md:block">
              <motion.button 
                className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-dark-gray/80 text-accent hover:text-white p-2 rounded-full z-20 border border-accent/30 hover:border-accent/70"
                onClick={goToPrevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button 
                className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-dark-gray/80 text-accent hover:text-white p-2 rounded-full z-20 border border-accent/30 hover:border-accent/70"
                onClick={goToNextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            
            {/* Touch indicator for mobile users */}
            <div className="md:hidden absolute inset-x-0 bottom-[-30px] text-center text-sm text-gray-400 opacity-70 z-10">
              <span>Swipe or tap to navigate</span>
            </div>
            
            {/* Navigation dots - Enhanced with hover effects and improved click handling */}
            <div className="flex justify-center mt-8">
              {featuredProducts.map((_, i) => (
                <motion.button
                  key={`dot-${i}`}
                  onClick={() => handleProductNavigation(i)}
                  whileHover={{ scale: 1.2, backgroundColor: '#00e5ff' }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-4 h-4 mx-3 rounded-full transition-all duration-200 relative ${
                    featuredProduct === i 
                      ? 'bg-accent scale-125 border border-accent/50' 
                      : 'bg-gray-700 hover:bg-gray-500 border border-gray-600'
                  }`}
                  aria-label={`View featured product ${i + 1}`}
                >
                  {featuredProduct === i && (
                    <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping"></span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider (inverted) */}
      <div className="relative z-10 w-full overflow-hidden -mt-1 text-dark-gray">
        <svg viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none" className="w-full h-12 md:h-20 transform rotate-180">
          <path d={dividerPaths[1]}></path>
        </svg>
      </div>
      
      {/* Virtual Product Showroom - Modern 3D-like Experience */}
      <div id="product-categories" className="relative min-h-screen overflow-hidden">
        {/* Technical background particles - reduced number for better performance */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`bg-particle-${i}`}
              className="absolute rounded-full bg-accent/20 will-change-transform"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 5px rgba(0, 229, 255, 0.3)',
                transform: 'translateZ(0)',
                animation: `float ${20 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Laser grid lines - using CSS transform for hardware acceleration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`grid-h-${i}`}
                className="absolute bg-accent/50 will-change-transform"
                style={{
                  height: '1px',
                  width: '100%',
                  top: `${(i + 1) * 10}%`,
                  transform: 'translateZ(0) translateY(-0.5px)',
                }}
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`grid-v-${i}`}
                className="absolute bg-accent/50 will-change-transform"
                style={{
                  width: '1px',
                  height: '100%',
                  left: `${(i + 1) * 10}%`,
                  transform: 'translateZ(0) translateX(-0.5px)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-24 z-10 relative">
          <motion.div
            ref={productsGridRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-black/30 px-4 py-2 rounded-md border-l-2 border-accent mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
              <span className="text-accent font-medium tracking-wider">VIRTUAL SHOWROOM</span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Explore Our <span className="text-accent">Precision Solutions</span>
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-300 mb-12"
            >
              Navigate our interactive product showcase to discover our premium precision-engineered components
            </motion.p>

            {/* Virtual Showroom Navigation - Category Selector */}
            <div className="relative z-20 mb-16">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(0, 229, 255, 0.15)',
                      transition: { duration: 0.2 } 
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-3 rounded-lg transition-all duration-200 will-change-transform ${
                      activeCategory === category.id 
                        ? 'bg-accent/20 text-white border border-accent/50' 
                        : 'bg-dark-gray/50 text-gray-300 border border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`fas ${category.icon} ${activeCategory === category.id ? 'text-accent' : 'text-gray-400'} mr-2`}></i>
                      <span>{category.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3D Showcase Area */}
          <ProductShowcase 
            products={filteredProducts}
            categories={categories}
            activeCategory={activeCategory}
            isLoading={isLoading}
          />
          

        </div>
      </div>

      {/* Technical specifications section - Maintained but with improved performance */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 py-20"
      >
        <div className="p-8 bg-dark-gray/30 rounded-xl border border-gray-800 relative overflow-hidden">
          {/* Accent corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent/40 rounded-tl-lg pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent/40 rounded-br-lg pointer-events-none"></div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Technical Excellence</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our products are manufactured to exacting standards using state-of-the-art equipment and rigorous quality control procedures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Precision Tolerance", value: "±0.003mm", icon: "🎯" },
              { label: "Material Options", value: "15+ Alloys", icon: "🔧" },
              { label: "Quality Standard", value: "ISO 9001:2015", icon: "✓" },
              { label: "Custom Solutions", value: "Unlimited", icon: "⚙️" },
            ].map((spec, index) => (
              <motion.div
                key={`spec-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-dark/40 rounded-lg p-5 border border-gray-800/50 group hover:border-accent/30 transition-colors duration-300 will-change-transform"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-3 text-xl group-hover:bg-accent/20 transition-colors duration-300">
                    {spec.icon}
                  </div>
                  <h4 className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">{spec.label}</h4>
                </div>
                <div className="font-mono text-2xl text-accent">{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Custom Solution CTA */}
      <div className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group bg-gradient-to-r from-dark-gray/80 to-black/80 backdrop-blur-sm rounded-xl p-12 border border-gray-800 relative overflow-hidden"
          >
            {/* Interactive particle background */}
            <div className="absolute inset-0 opacity-50 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`cta-particle-${i}`}
                  className="absolute rounded-full bg-accent/30"
                  style={{
                    width: `${6 + Math.random() * 8}px`,
                    height: `${6 + Math.random() * 8}px`,
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                    filter: 'blur(1px)'
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 15,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Need a <span className="text-accent">Custom Solution</span>?
                </h3>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Our engineering team can design and manufacture custom components tailored to your exact specifications and requirements.
                </p>
              </div>
              
              <motion.a 
              href="#contact" 
              className="group relative bg-dark/50 hover:bg-accent/20 text-accent border border-accent/40 hover:border-accent font-bold py-3 px-6 rounded-md inline-flex items-center justify-center transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              >
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
      </div>
    </section>
  );
};

// ProductShowcase Component - Simplified to only show categories
const ProductShowcase = ({ products, categories, activeCategory, isLoading }) => {
  const productContainerRef = useRef(null);
  
  // Show a loading state while categories are being prepared
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center min-h-[650px]"
      >
        <div className="relative w-24 h-24 mb-8">
          {/* Animated loading circle */}
          <motion.div
            className="absolute inset-0 border-4 border-accent/20 rounded-full"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity
            }}
          />
          <motion.div
            className="absolute inset-0 border-t-4 border-r-4 border-accent rounded-full"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Infinity
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 bg-accent rounded-full shadow-glow"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
        </div>
        <h3 className="text-2xl font-bold text-accent mb-3">Loading Categories</h3>
        <p className="text-gray-300 mb-1 text-center max-w-md">
          Preparing product categories for display
        </p>
      </motion.div>
    );
  }
  
  return (
    <div className="relative min-h-[650px] mb-20" ref={productContainerRef}>
      {/* Category Grid Container */}
      <div className="relative w-full max-w-6xl mx-auto min-h-[650px] py-12">
        {/* Category Grid View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4"
        >
          {categories.filter(cat => cat.id !== 'all').map((category, index) => (
            <motion.div
              key={`category-card-${index}`}
              className="bg-dark-gray/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-accent/30 transition-all duration-300 group h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <i className={`fas ${category.icon} text-accent text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-all duration-300">{category.name}</h3>
                <p className="text-gray-300 mb-6 flex-grow">
                  {category.id === 'gears' && 'High-precision gears including spur, helical, and bevel designs manufactured to exact specifications with superior surface finish and durability.'}
                  {category.id === 'shafts' && 'Premium quality shafts and axles engineered for optimal torque transmission and dimensional stability across diverse industrial applications.'}
                  {category.id === 'bearings' && 'Advanced bearing solutions designed to reduce friction in rotating machinery while providing exceptional load capacity and extended service life.'}
                  {category.id === 'custom' && 'Bespoke precision components tailored to your exact requirements, from prototype development to production-ready manufacturing.'}
                  {category.id === 'specialty' && 'Innovative multi-material system solutions that integrate different materials to solve complex engineering challenges conventional approaches cannot address.'}
                </p>
                
                {/* Sample Products for each category */}
                <div className="flex justify-center gap-3 mb-6">
                  {products
                    .filter(product => product.category === category.id)
                    .slice(0, 3)
                    .map((product, i) => (
                      <div key={`sample-${category.id}-${i}`} className="w-14 h-14 rounded-full border border-accent/30 overflow-hidden bg-dark/30 flex items-center justify-center p-1">
                        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                      </div>
                    ))}
                </div>
              </div>
              
              {/* CTA Button */}
              <a 
                href="#contact" 
                className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-md py-3 px-5 mt-4 text-center font-medium inline-flex items-center justify-center transition-colors duration-300 group-hover:border-accent/50"
              >
                Request Specifications
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Pagination dots (simplified for visual consistency) */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div 
              key={`dot-${index}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === 0 ? 'bg-accent scale-125' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Motion-tracking Cursor Effect for Desktop */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full">
          <defs>
            <radialGradient id="cursor-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(0, 229, 255, 0.1)" />
              <stop offset="100%" stopColor="rgba(0, 229, 255, 0)" />
            </radialGradient>
          </defs>
          <motion.circle 
            r="100"
            fill="url(#cursor-gradient)"
            className="will-change-transform"
            initial={{ x: -100, y: -100 }}
            animate={{
              x: [300, 700, 900, 500, 300],
              y: [200, 400, 200, 600, 200],
            }}
            transition={{
              x: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Products;