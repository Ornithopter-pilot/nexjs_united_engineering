import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 120,
        damping: 20,
        delay: 0.1
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05, 
      color: '#00e5ff',
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 10 
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const mobileItemVariants = {
    closed: {
      opacity: 0,
      x: -20
    },
    open: {
      opacity: 1,
      x: 0
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-gray/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="block">
              <img 
                src="/images/logo-white.png" 
                alt="United Engineering" 
                className="w-auto h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {['Home', 'Solutions', 'Evolution', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                    className="text-white hover:text-accent font-medium text-sm uppercase tracking-wider transition-colors duration-300"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#contact" 
                  className="bg-accent text-dark px-5 py-2.5 rounded-md font-semibold text-sm uppercase tracking-wider hover:bg-accent-light transition-colors duration-300"
                >
                  Get in Touch
                </a>
              </motion.li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              className="w-8 h-8 flex justify-center items-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M4 6H20"
                  stroke="#00e5ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ 
                    d: mobileMenuOpen ? "M6 18L18 6" : "M4 6H20",
                    opacity: mobileMenuOpen ? 1 : 1
                  }}
                />
                <motion.path
                  d="M4 12H20"
                  stroke="#00e5ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ 
                    opacity: mobileMenuOpen ? 0 : 1,
                    x: mobileMenuOpen ? 20 : 0
                  }}
                />
                <motion.path
                  d="M4 18H20"
                  stroke="#00e5ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ 
                    d: mobileMenuOpen ? "M6 6L18 18" : "M4 18H20",
                    opacity: mobileMenuOpen ? 1 : 1
                  }}
                />
              </svg>
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial="closed"
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
        >
          <ul className="pt-5 pb-3 space-y-4">
            {['Home', 'Solutions', 'Evolution', 'Careers', 'Contact'].map((item) => (
              <motion.li key={item} variants={mobileItemVariants}>
                <a
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  className="block text-white hover:text-accent font-medium text-lg py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </motion.li>
            ))}
            <motion.li variants={mobileItemVariants} className="pt-2">
              <a 
                href="#contact" 
                className="block w-full bg-accent text-dark text-center px-5 py-3 rounded-md font-semibold text-sm uppercase tracking-wider hover:bg-accent-light transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </a>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default NavBar;
