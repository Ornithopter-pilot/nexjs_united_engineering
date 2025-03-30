import { motion } from 'framer-motion';

const LoadingAnimation = ({ size = 'medium', text = 'Loading', light = false }) => {
  // Size variations
  const sizes = {
    small: {
      container: 'w-32 h-32',
      outerRing: 'w-20 h-20',
      middleRing: 'w-14 h-14',
      innerRing: 'w-8 h-8',
      center: 'w-3 h-3'
    },
    medium: {
      container: 'w-40 h-40',
      outerRing: 'w-28 h-28',
      middleRing: 'w-20 h-20',
      innerRing: 'w-12 h-12',
      center: 'w-4 h-4'
    },
    large: {
      container: 'w-52 h-52',
      outerRing: 'w-36 h-36',
      middleRing: 'w-24 h-24',
      innerRing: 'w-16 h-16',
      center: 'w-5 h-5'
    }
  };
  
  // Get size settings
  const sizeClass = sizes[size] || sizes.medium;
  
  return (
    <div className={`flex flex-col items-center justify-center ${light ? 'bg-transparent' : 'bg-dark/80 backdrop-blur-md'} z-50 ${sizeClass.container}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          className={`absolute ${sizeClass.outerRing} rounded-full border-2 border-transparent border-t-accent border-b-accent/30`}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 3,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Middle ring */}
        <motion.div
          className={`absolute ${sizeClass.middleRing} rounded-full border-2 border-transparent border-r-accent border-l-accent/30`}
          animate={{ rotate: -360 }}
          transition={{ 
            duration: 2.5,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className={`absolute ${sizeClass.innerRing} rounded-full border-2 border-transparent border-t-accent/80 border-b-accent/20`}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Center dot with pulse */}
        <motion.div
          className={`${sizeClass.center} bg-accent rounded-full absolute`}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
        
        {/* Scanning line */}
        <motion.div
          className="absolute w-full h-full opacity-70"
          initial={{ y: '-50%' }}
          animate={{ y: '50%' }}
          transition={{ 
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-full h-px bg-accent blur-[1px]"></div>
        </motion.div>
        
        {/* Tech dots around the rings */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`tech-dot-${i}`}
            className="absolute w-1.5 h-1.5 bg-accent rounded-full"
            style={{
              transformOrigin: 'center',
              transform: `rotate(${i * 45}deg) translateY(-${sizeClass.outerRing.split(' ')[0].replace('w-', '') / 2}px)`
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2 + (i % 3),
              delay: i * 0.3,
              repeat: Infinity
            }}
          />
        ))}
      </div>
      
      {/* Loading text with typing animation */}
      {text && (
        <motion.div
          className="text-accent font-mono mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {text}
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            _
          </motion.span>
        </motion.div>
      )}
    </div>
  );
};

// Fullscreen loading overlay component
export const FullscreenLoading = ({ text = 'Loading System', overlayOpacity = 80 }) => {
  return (
    <div className={`fixed inset-0 bg-dark/${overlayOpacity} backdrop-blur-md flex items-center justify-center z-50`}>
      <LoadingAnimation text={text} />
    </div>
  );
};

// Page transition loading component
export const PageTransition = ({ isLoading, children }) => {
  return (
    <>
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark/90 backdrop-blur-md flex items-center justify-center z-50"
        >
          <LoadingAnimation text="Loading Section" />
        </motion.div>
      )}
    </>
  );
};

// Section loading component for inline loading states
export const SectionLoading = ({ text = 'Loading Content' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <LoadingAnimation size="small" text={text} light={true} />
    </div>
  );
};

export default LoadingAnimation;