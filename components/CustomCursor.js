import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Also hide cursor on all interactive elements
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
      a, button, input, select, textarea, [role="button"], [role="link"], [role="tab"],
      label, .btn, .clickable, [onclick], [data-interactive], label[for] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(cursorStyle);
    
    // Create canvas for cursor rendering
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas properties
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    
    // Cursor state
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let isMouseDown = false;
    let isMouseMoving = false;
    let movementTimeout = null;
    let lastMoveTime = 0;
    
    // Match canvas resolution to device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1;
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      // Set default rendering quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMouseMoving ? 'medium' : 'high';
    };
    updateCanvasSize();
    
    // Store reference to canvas
    canvasRef.current = canvas;
    document.body.appendChild(canvas);
    updateCanvasSize();
    
    // Particles system
    const particles = [];
    const MAX_PARTICLES = 80;
    const SPAWN_RATE = 3; // Number of particles to spawn per frame when moving
    
    // Grid system for sci-fi effect
    const gridPoints = [];
    const MAX_GRID_POINTS = 30;
    const GRID_RANGE = 80; // How far grid points can be from cursor
    
    // Interactive elements detection
    let isOverInteractive = false;
    const interactiveElements = [];
    
    // Animation frame reference
    let animationFrame = null;
    
    // Particle class
    class Particle {
    constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.size = Math.random() * 2 + 1;
    this.ttl = 20 + Math.random() * 40; // Time to live
    this.opacity = 1;
    this.velocity = {
    x: (Math.random() - 0.5) * 3, // Increased initial velocity
    y: (Math.random() - 0.5) * 3
    };
    this.acceleration = {
    x: 0,
    y: 0
    };
    this.color = '#00e5ff';
    this.isGridPoint = false;
    }
    
    update() {
    // Calculate acceleration toward target
    if (this.targetX && this.targetY) {
    this.acceleration.x = (this.targetX - this.x) * 0.015; // Increased acceleration
    this.acceleration.y = (this.targetY - this.y) * 0.015;
    }
    
    // Apply acceleration
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    
    // Limit velocity
    const maxVelocity = 5; // Increased max speed
    const velocityMagnitude = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    if (velocityMagnitude > maxVelocity) {
    this.velocity.x = (this.velocity.x / velocityMagnitude) * maxVelocity;
    this.velocity.y = (this.velocity.y / velocityMagnitude) * maxVelocity;
    }
        
        // Apply velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Decay
        this.ttl--;
        this.opacity = this.ttl / 60;
        
        // Slowly reduce size as it ages
        if (this.ttl < 30) {
          this.size = Math.max(0.5, this.size * 0.98);
        }
        
        // Apply damping to velocity
        this.velocity.x *= 0.95;
        this.velocity.y *= 0.95;
      }
      
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        
        // Different styling for grid points vs regular particles
        if (this.isGridPoint) {
          gradient.addColorStop(0, `rgba(0, 229, 255, ${this.opacity * 0.8})`);
          gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
          ctx.strokeStyle = `rgba(0, 229, 255, ${this.opacity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          gradient.addColorStop(0, `rgba(0, 229, 255, ${this.opacity})`);
          gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      isDead() {
        // Kill particles when they go outside the screen or their TTL expires
        return this.ttl <= 0 ||
               this.x < 0 || 
               this.x > window.innerWidth || 
               this.y < 0 || 
               this.y > window.innerHeight;
      }
    }
    
    // Create a grid point particle
    const createGridPoint = (x, y) => {
      const particle = new Particle(
        x + (Math.random() - 0.5) * GRID_RANGE,
        y + (Math.random() - 0.5) * GRID_RANGE,
        x, y
      );
      particle.size = 1.5;
      particle.ttl = 100 + Math.random() * 100;
      particle.isGridPoint = true;
      return particle;
    };
    
    // Initialize grid points
    const initGridPoints = (x, y) => {
      for (let i = 0; i < MAX_GRID_POINTS; i++) {
        gridPoints.push(createGridPoint(x, y));
      }
    };
    
    // Update grid points
    const updateGridPoints = (x, y) => {
      // Add new grid points
      while (gridPoints.length < MAX_GRID_POINTS) {
        gridPoints.push(createGridPoint(x, y));
      }
      
      // Update target positions less frequently during rapid movement
      const updateTargets = isMouseMoving && Math.random() < (isMouseMoving ? 0.02 : 0.05);
      if (updateTargets) {
        for (let i = 0; i < gridPoints.length; i++) {
          // Slight jitter in target positions
          gridPoints[i].targetX = x + (Math.random() - 0.5) * GRID_RANGE;
          gridPoints[i].targetY = y + (Math.random() - 0.5) * GRID_RANGE;
        }
      }
      
      // Update all grid points
      for (let i = gridPoints.length - 1; i >= 0; i--) {
        gridPoints[i].update();
        
        // Remove grid points if they're dead or outside the viewport with extra margin
        if (gridPoints[i].isDead() || 
            gridPoints[i].x < -50 || 
            gridPoints[i].x > window.innerWidth + 50 || 
            gridPoints[i].y < -50 || 
            gridPoints[i].y > window.innerHeight + 50) {
          gridPoints.splice(i, 1);
        }
      }
    };
    
    // Draw grid connections between nearby grid points
    const drawGridConnections = (ctx) => {
      // Skip drawing grid connections during fast movement for better performance
      if (isMouseMoving) {
        const dx = mouseX - prevMouseX;
        const dy = mouseY - prevMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Skip grid connections during very fast movements
        if (speed > 15) return;
      }
      
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < gridPoints.length; i++) {
        const p1 = gridPoints[i];
        
        for (let j = i + 1; j < gridPoints.length; j++) {
          const p2 = gridPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 50) {
            // Opacity based on distance and particle opacity
            const opacity = 0.2 * (1 - distance / 50) * Math.min(p1.opacity, p2.opacity);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Create cursor particles
    const createParticles = (x, y, amount) => {
      for (let i = 0; i < amount; i++) {
        if (particles.length < MAX_PARTICLES) {
          const particle = new Particle(x, y);
          particles.push(particle);
        }
      }
    };
    
    // Draw the main cursor
    const drawMainCursor = (ctx, x, y) => {
      // Instantly position cursor exactly at mouse coordinates
      // No smoothing or delay - critical for responsiveness
      
      // Outer ring
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Inner dot (only visible on click)
      if (isMouseDown) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 1)';
        ctx.fill();
      }
      
      // Add crosshair for precision feeling
      const crosshairSize = 5;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
      ctx.lineWidth = 1;
      
      // Top line
      ctx.beginPath();
      ctx.moveTo(x, y - 15);
      ctx.lineTo(x, y - crosshairSize);
      ctx.stroke();
      
      // Bottom line
      ctx.beginPath();
      ctx.moveTo(x, y + crosshairSize);
      ctx.lineTo(x, y + 15);
      ctx.stroke();
      
      // Left line
      ctx.beginPath();
      ctx.moveTo(x - 15, y);
      ctx.lineTo(x - crosshairSize, y);
      ctx.stroke();
      
      // Right line
      ctx.beginPath();
      ctx.moveTo(x + crosshairSize, y);
      ctx.lineTo(x + 15, y);
      ctx.stroke();
      
      // Interactive mode indicator
      if (isOverInteractive) {
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Draw velocity line
      if (isMouseMoving) {
        const velocityX = mouseX - prevMouseX;
        const velocityY = mouseY - prevMouseY;
        
        if (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + velocityX * 2, y + velocityY * 2);
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };
    
    // Draw a data readout next to cursor
    const drawDataReadout = (ctx, x, y) => {
      if (!isMouseMoving && !isOverInteractive) return;
      
      const readoutX = x + 25;
      const readoutY = y - 10;
      
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
      
      if (isOverInteractive) {
        ctx.fillText('INTERACTIVE', readoutX, readoutY);
        ctx.fillText('ELEMENT DETECTED', readoutX, readoutY + 12);
      } else if (isMouseMoving) {
        // Calculate velocity
        const vx = Math.round((mouseX - prevMouseX) * 10) / 10;
        const vy = Math.round((mouseY - prevMouseY) * 10) / 10;
        
        ctx.fillText(`TRACKING: ${particles.length}`, readoutX, readoutY);
        ctx.fillText(`V[${vx}, ${vy}]`, readoutX, readoutY + 12);
      }
    };
    
    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update mouse moving state
      if (Date.now() - lastMoveTime > 100) {
        isMouseMoving = false;
      }
      
      // Check if mouse is at the edge of the screen and clean up particles
      const isAtEdge = mouseX <= 5 || mouseX >= window.innerWidth - 5 || 
                      mouseY <= 5 || mouseY >= window.innerHeight - 5;
      
      if (isAtEdge) {
        // Clean up excess particles when near the edge
        while (particles.length > 0) {
          particles.pop();
        }
      }
      
      // Adjust rendering quality based on movement
      ctx.imageSmoothingQuality = isMouseMoving ? 'medium' : 'high';
      
      // Create particles if mouse is moving
      if (isMouseMoving && !isAtEdge) {
        // Calculate speed of movement
        const dx = mouseX - prevMouseX;
        const dy = mouseY - prevMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Adjust particle creation based on speed
        const particlesToCreate = Math.min(Math.max(1, Math.floor(speed / 5)), 10);
        createParticles(mouseX, mouseY, particlesToCreate);
        
        // Store previous position for velocity calculation
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }
      
      // Update and draw grid system
      updateGridPoints(mouseX, mouseY);
      for (let i = 0; i < gridPoints.length; i++) {
        gridPoints[i].draw(ctx);
      }
      
      // Draw grid connections
      drawGridConnections(ctx);
      
      // Draw main cursor
      drawMainCursor(ctx, mouseX, mouseY);
      
      // Draw data readout
      drawDataReadout(ctx, mouseX, mouseY);
      
      // Continue animation loop
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Initialize grid and start animation
    initGridPoints(mouseX, mouseY);
    animate();
    
    // Find all interactive elements
    const updateInteractiveElements = () => {
      interactiveElements.length = 0;
      const elements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
      elements.forEach(el => interactiveElements.push(el));
    };
    
    // Check if mouse is over an interactive element
    const checkInteractive = (x, y) => {
      for (const el of interactiveElements) {
        const rect = el.getBoundingClientRect();
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          return true;
        }
      }
      return false;
    };
    
    // Update interactive elements on page change/DOM mutation
    const observer = new MutationObserver(updateInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });
    updateInteractiveElements();
    
    // Mouse event listeners
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      lastMoveTime = Date.now();
      
      // Skip throttling - update immediately for maximum responsiveness
      
      isOverInteractive = checkInteractive(mouseX, mouseY);
    };
    
    const onMouseDown = () => {
      isMouseDown = true;
      
      // Create burst of particles on click
      if (isOverInteractive) {
        createParticles(mouseX, mouseY, 20);
      }
    };
    
    const onMouseUp = () => {
      isMouseDown = false;
    };
    
    const onResize = () => {
      // Update canvas size on window resize
      updateCanvasSize();
    };
    
    const onMouseLeave = () => {
      // Clear all particles when mouse leaves the window
      particles.length = 0;
      
      // Keep only a few grid points
      while (gridPoints.length > 10) {
        gridPoints.pop();
      }
    };
    
    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    document.addEventListener('mouseleave', onMouseLeave);
    
    // Cleanup on unmount
    return () => {
      document.body.style.cursor = '';
      document.body.removeChild(canvas);
      document.head.removeChild(cursorStyle);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mouseleave', onMouseLeave);
      
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      clearTimeout(movementTimeout);
    };
  }, []);
  
  return null;
};

export default CustomCursor;