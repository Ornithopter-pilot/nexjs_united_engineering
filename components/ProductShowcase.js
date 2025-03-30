import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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
                  {category.id === 'precision' && 'High-precision components including gears, bearings, and custom drive systems manufactured to exact specifications with superior surface finish and durability.'}
                  {category.id === 'aerospace' && 'Premium quality components for aerospace applications engineered for optimal performance and reliability in extreme conditions.'}
                  {category.id === 'medical' && 'Ultra-precise components for medical devices and implants with biocompatible materials and exceptional surface quality.'}
                  {category.id === 'robotics' && 'Advanced components for robotics applications featuring precision mechanisms, servo systems, and joint assemblies.'}
                  {category.id === 'defense' && 'Rugged and reliable components for defense applications designed to perform under the most demanding operational conditions.'}
                  {category.id === 'energy' && 'Precision-engineered components for energy generation and distribution systems optimized for efficiency and longevity.'}
                </p>
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

export default ProductShowcase;