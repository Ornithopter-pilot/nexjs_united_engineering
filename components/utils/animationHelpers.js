// Animation presets for smooth, non-laggy animations

// Spring animations - fluid, bouncy movement
export const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 0.8
};

export const gentleSpring = {
  type: "spring",
  stiffness: 100,
  damping: 15
};

export const responsiveSpring = {
  type: "spring",
  stiffness: 180,
  damping: 25,
  mass: 0.9,
  velocity: 2
};

// Ease animations - smooth, controlled movement
export const smoothEase = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing
  duration: 0.5
};

export const sharpEase = {
  type: "tween",
  ease: [0.19, 1, 0.22, 1], // exponential easing
  duration: 0.7
};

// Animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothEase
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: smoothEase
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothEase
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothEase
  }
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springTransition
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  }
};

// Use this for list items, grid items, etc.
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: gentleSpring
  }
};

// Custom hover animations
export const subtleHover = {
  scale: 1.03,
  y: -5,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

export const glowHover = {
  boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)",
  y: -5,
  transition: smoothEase
};

// Special effects
export const pulseAnimation = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse"
  }
};

export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
};

// High-performance translation use hardware acceleration
export const performantY = (y) => ({
  transform: `translateY(${y}px) translateZ(0)`,
  WebkitTransform: `translateY(${y}px) translateZ(0)`
});

export const performantX = (x) => ({
  transform: `translateX(${x}px) translateZ(0)`,
  WebkitTransform: `translateX(${x}px) translateZ(0)`
});