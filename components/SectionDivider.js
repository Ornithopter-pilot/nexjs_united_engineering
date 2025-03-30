import { motion } from 'framer-motion';

const SectionDivider = ({ direction = 'down', pattern = 1, bgColor = 'bg-dark-gray', textColor = 'text-dark' }) => {
  const patterns = [
    'M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,69.3C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
    'M0,128L48,117.3C96,107,192,85,288,80C384,75,480,85,576,112C672,139,768,181,864,170.7C960,160,1056,96,1152,74.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    'M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,192C840,203,960,213,1080,192C1200,171,1320,117,1380,90.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
  ];
  
  return (
    <div className={`relative w-full overflow-hidden ${direction === 'up' ? '-mt-1' : '-mb-1'} ${textColor}`}>
      <div className="absolute inset-0">
        {/* Background image texture pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/images/revamp_products/Background Texture-Pattern for Section Dividers.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay"
          }}
        ></div>
      </div>
      
      <svg 
        viewBox="0 0 1440 120" 
        className={`w-full h-12 md:h-20 relative z-10 ${bgColor}`}
        preserveAspectRatio="none" 
        style={{ transform: direction === 'up' ? 'rotate(180deg)' : 'none' }}
      >
        <motion.path 
          d={patterns[pattern - 1]}
          fill="currentColor"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.path>
      </svg>
    </div>
  );
};

export default SectionDivider;