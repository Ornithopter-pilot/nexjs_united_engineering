import { motion } from 'framer-motion';

const SectionLoadingState = ({ text = 'Loading Content' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-32 h-32 mb-6">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-b-accent/30"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 3,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-[15px] rounded-full border-2 border-transparent border-r-accent border-l-accent/30"
          animate={{ rotate: -360 }}
          transition={{ 
            duration: 2.5,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-[30px] rounded-full border-2 border-transparent border-t-accent/80 border-b-accent/20"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Center dot with pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-accent rounded-full"
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
          className="absolute inset-0 opacity-70"
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
      </div>
      
      {/* Loading text */}
      <motion.div
        className="text-accent font-mono"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity
        }}
      >
        {text}
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
    </div>
  );
};

export default SectionLoadingState;