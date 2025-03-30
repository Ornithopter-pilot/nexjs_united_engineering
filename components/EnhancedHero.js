import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedHero = () => {
  const bannerRef = useRef(null);
  const particlesRef = useRef(null);
  const flowLinesRef = useRef(null);
  const glowEffectsRef = useRef(null);
  const scanLinesRef = useRef(null);
  const dataDisplaysRef = useRef(null);
  const rippleContainerRef = useRef(null);
  const cursorTrailRef = useRef([]);
  
  // State for mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [trailPositions, setTrailPositions] = useState([]);
  
  // Create enhanced video-like banner movement
  useEffect(() => {
    if (!bannerRef.current) return;
    
    const banner = bannerRef.current;
    let startTime = Date.now();
    
    const animateBanner = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;
      
      // Create more pronounced video-like motion
      // Using multiple sine waves at different frequencies for a more organic feel
      const xShift = 
        Math.sin(elapsed * 0.2) * 15 + // Slow horizontal wave
        Math.sin(elapsed * 0.5) * 5;   // Faster subtle movement
        
      const yShift = 
        Math.cos(elapsed * 0.15) * 10 + // Primary vertical movement
        Math.cos(elapsed * 0.4) * 3;    // Secondary subtle movement
      
      // Subtle zoom effect that pulses slowly
      const scale = 1.1 + Math.sin(elapsed * 0.1) * 0.03;
      
      // Apply the transforms for video-like movement
      banner.style.transform = `translate(${xShift}px, ${yShift}px) scale(${scale})`;
      
      requestAnimationFrame(animateBanner);
    };
    
    const animation = requestAnimationFrame(animateBanner);
    
    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  // Create scan lines effect
  useEffect(() => {
    if (!scanLinesRef.current) return;
    
    const scanLinesContainer = scanLinesRef.current;
    
    // Create scanlines
    for (let i = 0; i < 150; i++) {
      const scanLine = document.createElement('div');
      
      scanLine.style.position = 'absolute';
      scanLine.style.left = '0';
      scanLine.style.width = '100%';
      scanLine.style.height = '1px';
      scanLine.style.top = `${i * 7}px`;
      scanLine.style.backgroundColor = 'rgba(0, 229, 255, 0.03)';
      scanLine.style.opacity = Math.random() > 0.5 ? 0.5 : 0.3;
      scanLine.style.zIndex = '4';
      
      // Add occasional flicker to some lines
      if (Math.random() > 0.9) {
        scanLine.style.animation = `flicker ${1 + Math.random() * 3}s infinite ease-in-out ${Math.random() * 5}s`;
      }
      
      scanLinesContainer.appendChild(scanLine);
    }
    
    return () => {
      while (scanLinesContainer.firstChild) {
        scanLinesContainer.removeChild(scanLinesContainer.firstChild);
      }
    };
  }, []);

  // Create flowing particle animations
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const container = particlesRef.current;
    
    // Add global keyframe animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes flicker {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.5; }
      }
      
      @keyframes float {
        0%, 100% { transform: translate(0px, 0px); }
        25% { transform: translate(10px, -15px); }
        50% { transform: translate(20px, 0px); }
        75% { transform: translate(10px, 15px); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      
      @keyframes wavyFloat {
        0% { transform: translateY(0) translateX(0) rotate(0deg); }
        33% { transform: translateY(-15px) translateX(10px) rotate(2deg); }
        66% { transform: translateY(10px) translateX(-10px) rotate(-2deg); }
        100% { transform: translateY(0) translateX(0) rotate(0deg); }
      }
      
      @keyframes dataFlow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      @keyframes ripple {
        0% { transform: translate(-50%, -50%) scale(0.1); opacity: 1; border-width: 1px; }
        100% { transform: translate(-50%, -50%) scale(3); opacity: 0; border-width: 0.5px; }
      }
      
      @keyframes cursorCollapse {
        0% { opacity: 0.8; }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      }
    `;
    
    document.head.appendChild(style);
    
    // Create modern particle system
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      
      // Varied sizes
      const size = 1 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Position particles throughout the right side of the screen
      const right = Math.random() * 70;
      const top = Math.random() * 100;
      
      particle.style.right = `${right}%`;
      particle.style.top = `${top}%`;
      
      // Style the particles with glowing effects
      particle.style.backgroundColor = 'rgba(0, 229, 255, 0.8)';
      particle.style.boxShadow = `0 0 ${size * 3}px rgba(0, 229, 255, 0.6)`;
      particle.style.opacity = 0.2 + Math.random() * 0.5;
      
      // Floating animation with varied timing
      const duration = 15 + Math.random() * 20;
      particle.style.animation = `float ${duration}s infinite ease-in-out ${Math.random() * 10}s`;
      
      container.appendChild(particle);
    }
    
    // Create larger glowing orbs that float more slowly
    for (let i = 0; i < 8; i++) {
      const orb = document.createElement('div');
      orb.className = 'absolute rounded-full backdrop-blur-sm';
      
      // Larger varied sizes
      const size = 15 + Math.random() * 25;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      
      // Position orbs throughout the right side of the screen
      const right = 10 + Math.random() * 60;
      const top = 10 + Math.random() * 80;
      
      orb.style.right = `${right}%`;
      orb.style.top = `${top}%`;
      orb.style.zIndex = '5';
      
      // Style the orbs with gradient and glow
      orb.style.background = 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.05) 70%, rgba(0,229,255,0) 100%)';
      orb.style.boxShadow = `0 0 ${size}px rgba(0, 229, 255, 0.3)`;
      
      // Slower, more graceful floating animation
      const duration = 20 + Math.random() * 15;
      orb.style.animation = `wavyFloat ${duration}s infinite ease-in-out ${Math.random() * 10}s`;
      
      container.appendChild(orb);
    }
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      document.head.removeChild(style);
    };
  }, []);

  // Create flowing data lines and wave effects
  useEffect(() => {
    if (!flowLinesRef.current) return;
    
    const container = flowLinesRef.current;
    
    // Create flowing digital lines
    for (let i = 0; i < 15; i++) {
      const flowLine = document.createElement('div');
      flowLine.className = 'absolute';
      
      // Position on the right side
      const top = 5 + Math.random() * 90;
      const right = Math.random() * 70;
      flowLine.style.top = `${top}%`;
      flowLine.style.right = `${right}%`;
      
      // Line attributes
      const width = 100 + Math.random() * 200;
      const height = 1.5 + Math.random() * 1.5;
      flowLine.style.width = `${width}px`;
      flowLine.style.height = `${height}px`;
      
      // Create the line with a gradient
      const angle = Math.random() * 40 - 20;
      flowLine.style.transform = `rotate(${angle}deg)`;
      flowLine.style.background = 'linear-gradient(90deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0.2) 50%, rgba(0,229,255,0) 100%)';
      
      // Data pulse that travels along the line
      const dataPulse = document.createElement('div');
      dataPulse.className = 'absolute top-0 h-full';
      dataPulse.style.width = '50px';
      dataPulse.style.background = 'linear-gradient(90deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0.4) 50%, rgba(0,229,255,0) 100%)';
      dataPulse.style.animation = `dataFlow ${3 + Math.random() * 5}s infinite linear ${Math.random() * 2}s`;
      
      flowLine.appendChild(dataPulse);
      container.appendChild(flowLine);
    }
    
    // Create wave effect elements
    for (let i = 0; i < 3; i++) {
      const wave = document.createElement('div');
      wave.className = 'absolute right-1/4 transform -translate-x-1/2';
      
      // Position waves at different depths
      wave.style.top = `${30 + i * 20}%`;
      wave.style.zIndex = `${5 - i}`;
      
      // Create a curved line using a pseudo-SVG approach with divs
      const curve = document.createElement('div');
      curve.className = 'relative';
      curve.style.width = '300px';
      curve.style.height = '50px';
      
      // Add points along the curve
      for (let j = 0; j < 15; j++) {
        const point = document.createElement('div');
        point.className = 'absolute rounded-full';
        
        const x = j * (300 / 15);
        // Create a sine wave pattern
        const y = 25 + Math.sin(j * 0.7) * 15; 
        
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        point.style.width = '2px';
        point.style.height = '2px';
        point.style.backgroundColor = 'rgba(0, 229, 255, 0.3)';
        point.style.boxShadow = '0 0 5px rgba(0, 229, 255, 0.5)';
        
        // Add animation offset to create wave motion
        point.style.animation = `wavyFloat ${10 + i * 3}s infinite ease-in-out ${j * 0.3}s`;
        
        curve.appendChild(point);
      }
      
      wave.appendChild(curve);
      container.appendChild(wave);
    }
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // Create accent glow effects
  useEffect(() => {
    if (!glowEffectsRef.current) return;
    
    const container = glowEffectsRef.current;
    
    // Create pulsing accent circles
    for (let i = 0; i < 4; i++) {
      const pulseContainer = document.createElement('div');
      pulseContainer.className = 'absolute';
      
      // Position throughout the screen
      pulseContainer.style.right = `${10 + Math.random() * 70}%`;
      pulseContainer.style.top = `${20 + Math.random() * 60}%`;
      
      // Inner pulse dot
      const innerDot = document.createElement('div');
      innerDot.className = 'absolute rounded-full';
      innerDot.style.width = '6px';
      innerDot.style.height = '6px';
      innerDot.style.top = '50%';
      innerDot.style.left = '50%';
      innerDot.style.transform = 'translate(-50%, -50%)';
      innerDot.style.backgroundColor = 'rgba(0, 229, 255, 0.9)';
      innerDot.style.boxShadow = '0 0 10px rgba(0, 229, 255, 0.8)';
      innerDot.style.animation = `pulse ${2 + Math.random()}s infinite ease-in-out`;
      innerDot.style.zIndex = '10';
      
      // Create multiple ripple effects
      for (let j = 0; j < 3; j++) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.width = '6px';
        ripple.style.height = '6px';
        ripple.style.border = '1px solid rgba(0, 229, 255, 0.5)';
        ripple.style.animation = `ripple ${2 + j}s infinite ease-out ${j * 0.5}s`;
        
        pulseContainer.appendChild(ripple);
      }
      
      pulseContainer.appendChild(innerDot);
      container.appendChild(pulseContainer);
    }
    
    // Create flowing accent lines with subtle data animations
    for (let i = 0; i < 6; i++) {
      const accentLineContainer = document.createElement('div');
      accentLineContainer.className = 'absolute';
      
      // Position on right side
      accentLineContainer.style.right = `${Math.random() * 70}%`;
      accentLineContainer.style.top = `${10 + Math.random() * 80}%`;
      
      // Create curved accent lines
      const width = 80 + Math.random() * 150; 
      accentLineContainer.style.width = `${width}px`;
      accentLineContainer.style.height = '40px';
      
      // Curve visualization with multiple points
      for (let j = 0; j < 10; j++) {
        const segment = document.createElement('div');
        segment.className = 'absolute bottom-0 w-1.5 bg-accent/10';
        
        const x = j * (width / 10);
        // Create varied heights to simulate a curve
        const height = 5 + Math.sin(j * 0.8) * 15 + Math.random() * 5;
        
        segment.style.left = `${x}px`;
        segment.style.height = `${height}px`;
        
        // Add subtle animation
        segment.style.animation = `wavyFloat ${8 + Math.random() * 4}s infinite ease-in-out ${j * 0.2}s`;
        
        accentLineContainer.appendChild(segment);
      }
      
      container.appendChild(accentLineContainer);
    }
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);
  
  // Create clean system data displays
  useEffect(() => {
    if (!dataDisplaysRef.current) return;
    
    const container = dataDisplaysRef.current;
    
    // System Alpha (top) - MOVED DOWN to avoid cluttering with the GET IN TOUCH button
    const systemAlpha = document.createElement('div');
    systemAlpha.className = 'absolute top-[18%] right-[5%] bg-black/30 backdrop-blur-sm border border-accent/30 rounded-sm p-3 w-[180px] transition-all duration-300 system-display';
    systemAlpha.innerHTML = `
      <div class="text-accent text-sm font-mono uppercase mb-2">SYSTEM ALPHA</div>
      <div class="flex justify-between items-center mb-1">
        <div class="text-white/70 text-xs font-mono">STATUS</div>
        <div class="text-accent text-xs font-mono">OPTIMAL</div>
      </div>
      <div class="flex justify-between items-center mb-1">
        <div class="text-white/70 text-xs font-mono">EFF</div>
        <div class="text-accent text-xs font-mono">97%</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-white/70 text-xs font-mono">TEMP</div>
        <div class="text-accent text-xs font-mono">25°</div>
      </div>
    `;
    
    // System Beta (middle)
    const systemBeta = document.createElement('div');
    systemBeta.className = 'absolute top-[45%] right-[10%] bg-black/30 backdrop-blur-sm border border-accent/30 rounded-sm p-3 w-[180px] transition-all duration-300 system-display';
    systemBeta.innerHTML = `
      <div class="text-accent text-sm font-mono uppercase mb-2">SYSTEM BETA</div>
      <div class="flex justify-between items-center mb-1">
        <div class="text-white/70 text-xs font-mono">STATUS</div>
        <div class="text-accent text-xs font-mono">OPTIMAL</div>
      </div>
      <div class="flex justify-between items-center mb-1">
        <div class="text-white/70 text-xs font-mono">EFF</div>
        <div class="text-accent text-xs font-mono">99%</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-white/70 text-xs font-mono">TEMP</div>
        <div class="text-accent text-xs font-mono">20°</div>
      </div>
    `;
    
    // System Delta (bottom)
    const systemDelta = document.createElement('div');
    systemDelta.className = 'absolute bottom-[22%] right-[5%] bg-black/30 backdrop-blur-sm border border-accent/30 rounded-sm p-3 w-[180px] transition-all duration-300 system-display';
    systemDelta.innerHTML = `
      <div class="text-accent text-sm font-mono uppercase mb-2">SYSTEM DELTA</div>
      <div class="flex justify-between items-center mb-1">
        <div class="text-white/70 text-xs font-mono">STATUS</div>
        <div class="text-accent text-xs font-mono">OPTIMAL</div>
      </div>
      <div class="flex justify-between items-center mb-1">
        <div class="text-white/70 text-xs font-mono">EFF</div>
        <div class="text-accent text-xs font-mono">93%</div>
      </div>
      <div class="flex justify-between items-center">
        <div class="text-white/70 text-xs font-mono">TEMP</div>
        <div class="text-accent text-xs font-mono">22°</div>
      </div>
    `;
    
    // Add simple hover effect
    [systemAlpha, systemBeta, systemDelta].forEach(system => {
      system.addEventListener('mouseenter', () => {
        system.style.borderColor = 'rgba(0, 229, 255, 0.7)';
        system.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.3)';
      });
      
      system.addEventListener('mouseleave', () => {
        system.style.borderColor = 'rgba(0, 229, 255, 0.3)';
        system.style.boxShadow = 'none';
      });
    });
    
    // Add to container
    container.appendChild(systemAlpha);
    container.appendChild(systemBeta);
    container.appendChild(systemDelta);
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);
  
  // Setup meteor-like cursor trail with collapsing effect
  useEffect(() => {
    if (!rippleContainerRef.current) return;
    
    const rippleContainer = rippleContainerRef.current;
    
    // Trail positions array for tracking
    let positions = [];
    let animationFrameId = null;
    let moveTimeoutId = null;
    
    // Event handlers for mouse/touch movement
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsInteracting(true);
      setIsMoving(true);
      
      // Clear any existing timeout
      if (moveTimeoutId) {
        clearTimeout(moveTimeoutId);
      }
      
      // Set timeout to detect when movement stops
      moveTimeoutId = setTimeout(() => {
        setIsMoving(false);
        collapseTrail();
      }, 150); // Short delay to detect stop
      
      // Add current position to the front of the array
      positions.unshift({ x: e.clientX, y: e.clientY });
      
      // Keep only the last 10 positions
      positions = positions.slice(0, 10);
      
      // Update trail in animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => updateTrail(false));
    };
    
    // Function to update the trail visual
    const updateTrail = (isCollapsing = false) => {
      // Clear previous trail
      while (rippleContainer.firstChild) {
        rippleContainer.removeChild(rippleContainer.firstChild);
      }
      
      // Current mouse position (for collapsing animation)
      const currentPos = positions[0] || { x: 0, y: 0 };
      
      // Create main cursor circle (bigger now)
      const mainCircle = document.createElement('div');
      mainCircle.className = 'fixed rounded-full pointer-events-none z-50';
      mainCircle.style.width = '8px'; // Bigger main cursor
      mainCircle.style.height = '8px';
      mainCircle.style.backgroundColor = 'rgba(0, 229, 255, 1)';
      mainCircle.style.boxShadow = '0 0 10px rgba(0, 229, 255, 0.8)';
      mainCircle.style.left = `${currentPos.x}px`;
      mainCircle.style.top = `${currentPos.y}px`;
      mainCircle.style.transform = 'translate(-50%, -50%)';
      
      rippleContainer.appendChild(mainCircle);
      
      // Create trail circles
      positions.forEach((pos, index) => {
        if (index === 0) return; // Skip the first one (main cursor)
        
        const trailCircle = document.createElement('div');
        trailCircle.className = 'fixed rounded-full pointer-events-none';
        
        // Calculate size and opacity based on position in trail (bigger now)
        const size = Math.max(6 - index * 0.5, 1.5); // Bigger trail circles
        let opacity = Math.max(1 - (index * 0.1), 0.1);
        
        // For collapsing animation, calculate position interpolated toward the main cursor
        let x = pos.x;
        let y = pos.y;
        
        if (isCollapsing) {
          // Linear interpolation toward the current cursor position
          const progress = index / 10; // 0 to 1
          x = pos.x + (currentPos.x - pos.x) * progress;
          y = pos.y + (currentPos.y - pos.y) * progress;
          
          // Reduce opacity as it collapses
          opacity *= (1 - progress);
          
          // Add animation for smooth collapse
          trailCircle.style.transition = 'all 0.3s ease-out';
        }
        
        trailCircle.style.width = `${size}px`;
        trailCircle.style.height = `${size}px`;
        trailCircle.style.backgroundColor = `rgba(0, 229, 255, ${opacity})`;
        trailCircle.style.boxShadow = `0 0 ${4 + size}px rgba(0, 229, 255, ${opacity * 0.7})`;
        trailCircle.style.left = `${x}px`;
        trailCircle.style.top = `${y}px`;
        trailCircle.style.transform = 'translate(-50%, -50%)';
        
        rippleContainer.appendChild(trailCircle);
      });
      
      animationFrameId = null;
    };
    
    // Function to collapse the trail when mouse stops
    const collapseTrail = () => {
      // No need to collapse if already at the initial position
      if (positions.length <= 1) return;
      
      // Function for smooth animation of trail collapse
      const animateCollapse = (progress) => {
        if (progress >= 1) return;
        
        updateTrail(true);
        
        // Continue animation
        requestAnimationFrame(() => animateCollapse(progress + 0.1));
      };
      
      // Start collapse animation
      animateCollapse(0);
      
      // Reset positions after animation completes
      setTimeout(() => {
        // Keep only current position
        positions = positions.slice(0, 1);
      }, 300);
    };
    
    // Function to reset interaction
    const handleMouseLeave = () => {
      setIsInteracting(false);
      setIsMoving(false);
      positions = [];
      
      // Clear trail
      while (rippleContainer.firstChild) {
        rippleContainer.removeChild(rippleContainer.firstChild);
      }
    };
    
    // Touch event handlers
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMouseMove({ 
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY
        });
      }
    };
    
    const handleTouchEnd = () => {
      handleMouseLeave();
    };
    
    // Click handler to create ripple effect
    const handleClick = (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full pointer-events-none';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = '15px';
      ripple.style.height = '15px';
      ripple.style.border = '2px solid rgba(0, 229, 255, 0.8)';
      ripple.style.zIndex = '45';
      ripple.style.animation = 'ripple 1.5s linear forwards';
      
      rippleContainer.appendChild(ripple);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        if (rippleContainer.contains(ripple)) {
          rippleContainer.removeChild(ripple);
        }
      }, 1500);
    };
    
    // Add event listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (moveTimeoutId) {
        clearTimeout(moveTimeoutId);
      }
      
      // Clean up any remaining elements
      while (rippleContainer.firstChild) {
        rippleContainer.removeChild(rippleContainer.firstChild);
      }
    };
  }, [isMoving]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced banner image with animation effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bannerRef}
          className="absolute inset-0 transition-transform duration-100 ease-linear"
          style={{
            backgroundImage: "url('/images/hero-background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.1)',
          }}
        />
        
        {/* Multi-layered overlays for better image tinting while maintaining detail */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50 z-10"></div>
        <div className="absolute inset-0 bg-[#001428]/40 mix-blend-color z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10"></div>
      </div>
      
      {/* Fluid particle animations */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden z-20 pointer-events-none"
      />
      
      {/* Flowing data lines and wave effects */}
      <div 
        ref={flowLinesRef}
        className="absolute inset-0 overflow-hidden z-20 pointer-events-none"
      />
      
      {/* Accent glow effects */}
      <div 
        ref={glowEffectsRef}
        className="absolute inset-0 overflow-hidden z-20 pointer-events-none"
      />
      
      {/* System data displays */}
      <div 
        ref={dataDisplaysRef}
        className="absolute inset-0 overflow-hidden z-30"
      />
      
      {/* Scan lines effect */}
      <div 
        ref={scanLinesRef}
        className="absolute inset-0 overflow-hidden z-20 opacity-30 pointer-events-none"
      />
      
      {/* Container for interactive ripple effects and cursor trail */}
      <div 
        ref={rippleContainerRef}
        className="absolute inset-0 overflow-hidden z-50 pointer-events-none"
      />

      {/* Dark text background for better readability */}
      <div className="absolute left-0 top-0 bottom-0 w-2/5 bg-gradient-to-r from-black/50 to-transparent z-30"></div>

      {/* Content - LEFT SIDE PLACEMENT */}
      <div className="container mx-auto px-6 relative z-40 pt-24">
        <div className="w-full md:w-3/5 lg:w-1/2">
          {/* Hero tagline with animation */}
          <motion.div 
            className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6"
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.1,
              type: "spring", 
              stiffness: 200
            }}
          >
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="text-accent font-medium tracking-wider">PRECISION TECHNOLOGY</span>
          </motion.div>

          {/* Main heading with staggered animation */}
          <div className="mb-8">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight"
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
              <motion.div
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }
                }}
                className="overflow-hidden"
              >
                <span className="block">MACHINE</span>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }
                }}
                className="overflow-hidden"
              >
                <span className="block text-accent">INTELLIGENCE</span>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }
                }}
                className="overflow-hidden"
              >
                <span className="block">REDEFINED</span>
              </motion.div>
            </motion.h1>
          </div>

          {/* Description with expanded industries list */}
          <motion.div
            className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl bg-black/20 p-4 rounded-md backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>
              Fusing automation, precision engineering & AI-driven workflows to transform 
              <motion.span 
                className="relative inline-block mx-1 group cursor-pointer"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <span className="text-accent font-semibold">aerospace</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50 group-hover:h-full group-hover:bg-accent/10 transition-all duration-300 ease-in-out"></span>
              </motion.span>, 
              <motion.span 
                className="relative inline-block mx-1 group cursor-pointer"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <span className="text-accent font-semibold">medical</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50 group-hover:h-full group-hover:bg-accent/10 transition-all duration-300 ease-in-out"></span>
              </motion.span>, 
              <motion.span 
                className="relative inline-block mx-1 group cursor-pointer"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <span className="text-accent font-semibold">automotive</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50 group-hover:h-full group-hover:bg-accent/10 transition-all duration-300 ease-in-out"></span>
              </motion.span>, 
              <motion.span 
                className="relative inline-block mx-1 group cursor-pointer"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <span className="text-accent font-semibold">energy</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50 group-hover:h-full group-hover:bg-accent/10 transition-all duration-300 ease-in-out"></span>
              </motion.span>, 
              <motion.span 
                className="relative inline-block mx-1 group cursor-pointer"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <span className="text-accent font-semibold">defense</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50 group-hover:h-full group-hover:bg-accent/10 transition-all duration-300 ease-in-out"></span>
              </motion.span>, and 
              <motion.span 
                className="relative inline-block mx-1 group cursor-pointer"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <span className="text-accent font-semibold">robotics</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent/50 group-hover:h-full group-hover:bg-accent/10 transition-all duration-300 ease-in-out"></span>
              </motion.span> industries worldwide
            </p>
          </motion.div>

          {/* CTA Buttons with enhanced animations */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a 
              href="#solutions" 
              className="group bg-accent hover:bg-accent-light text-dark font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-500 shadow-lg shadow-accent/20 hover:shadow-accent/40 relative overflow-hidden"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Add shine effect on hover */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              
              <span className="relative z-10 flex items-center">
                EXPLORE CAPABILITIES
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
            
            <motion.a 
              href="#contact" 
              className="group border border-accent/30 hover:border-accent backdrop-blur-sm text-white font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-300 hover:bg-accent/10 relative overflow-hidden"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Add pulse border effect */}
              <span className="absolute inset-0 border border-accent/50 rounded-md opacity-0 group-hover:opacity-100 animate-[pulse_2s_ease-in-out_infinite]"></span>
              
              <span className="relative z-10">
                GET IN TOUCH
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator - made smaller and positioned lower */}
      <motion.div 
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-40 scale-75"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.span 
          className="text-accent text-xs font-medium mb-1 tracking-widest"
          animate={{
            opacity: [0.6, 1, 0.6],
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          SCROLL
        </motion.span>
        <div className="w-5 h-12 border-2 border-accent/50 rounded-full flex justify-center">
          <motion.div 
            className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5"
            animate={{ 
              y: [0, 16, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;