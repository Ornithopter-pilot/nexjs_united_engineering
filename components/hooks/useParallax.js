import { useState, useEffect } from 'react';

// Custom hook for creating parallax effects
const useParallax = (speed = 0.1, direction = 'vertical') => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const scrollPosition = window.pageYOffset;
      // Calculate offset based on scroll position and speed
      const newOffset = scrollPosition * speed;
      setOffset(newOffset);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  // Calculate transform style based on direction
  const getTransformStyle = () => {
    if (direction === 'vertical') {
      return { transform: `translateY(${offset}px)` };
    } else if (direction === 'horizontal') {
      return { transform: `translateX(${offset}px)` };
    } else if (direction === 'rotate') {
      return { transform: `rotate(${offset}deg)` };
    } else if (direction === 'scale') {
      // Calculate scale (within reasonable bounds)
      const scale = 1 + (offset * 0.001);
      return { transform: `scale(${scale})` };
    }
    
    // Default
    return { transform: `translateY(${offset}px)` };
  };
  
  return { offset, style: getTransformStyle() };
};

export default useParallax;