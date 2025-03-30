import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const LocationMap = ({ address = "08 REVENUE LAYOUT, SIDDAREDDY LAYOUTS NAGANATHPUR, BOMMANAHALLI, BANGALORE, KARNATAKA, INDIA", height = 450 }) => {
  const controls = useAnimation();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Animate map elements when component mounts
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    });
    
    // Add fade-in delay for tooltip
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    
    return () => {
      clearTimeout(tooltipTimer);
    };
  }, [controls]);
  
  // Effect to continually remove any unwanted controls
  useEffect(() => {
    if (!mapLoaded) return;
    
    // Set up an interval to keep checking for and removing the badge
    const interval = setInterval(() => {
      removeUnwantedControls();
    }, 500);
    
    // Cleanup function
    return () => clearInterval(interval);
  }, [mapLoaded]);
  
  // Helper function to remove all unwanted controls
  const removeUnwantedControls = () => {
    // Remove any elements with text content matching "UNITED ENGINEERING HQ"
    document.querySelectorAll('.leaflet-control').forEach(el => {
      if (el.textContent.includes('UNITED ENGINEERING HQ')) {
        el.remove();
      }
    });
    
    // Also remove all non-zoom controls in the bottom right
    document.querySelectorAll('.leaflet-bottom.leaflet-right .leaflet-control').forEach(control => {
      if (!control.classList.contains('leaflet-control-zoom')) {
        control.remove();
      }
    });
  };
  
  // Initialize map with Leaflet
  useEffect(() => {
    // Load Leaflet CSS
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
    document.head.appendChild(linkEl);
    
    // Create style for custom map elements
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .custom-map-marker {
        display: flex;
        justify-content: center;
      }
      .marker-pin {
        width: 20px;
        height: 20px;
        border-radius: 50% 50% 50% 0;
        background: #00e5ff;
        transform: rotate(-45deg);
        position: relative;
        animation: pulse-marker 2s infinite;
      }
      .marker-pin:after {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #111;
        position: absolute;
        top: 4px;
        left: 4px;
      }
      .leaflet-popup-content-wrapper {
        background: rgba(20, 20, 30, 0.9);
        color: white;
        border-radius: 8px;
        border: 1px solid rgba(0, 229, 255, 0.3);
        backdrop-filter: blur(4px);
      }
      .leaflet-popup-tip {
        background: rgba(0, 229, 255, 0.8);
      }
      @keyframes pulse-marker {
        0% {
          box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(0, 229, 255, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(0, 229, 255, 0);
        }
      }
      /* Dark map theme */
      .leaflet-container { 
        background-color: #0a0a12;
        will-change: transform;
        transform: translateZ(0);
      }
      /* Remove attribution and all unwanted controls completely */
      .leaflet-control-attribution,
      .leaflet-bottom.leaflet-right .leaflet-control:not(.leaflet-control-zoom) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      /* Remove any controls containing our company name */
      [class*="leaflet"] *:contains("UNITED ENGINEERING HQ") {
        display: none !important;
        visibility: hidden !important;
      }
      /* Zoom controls */
      .leaflet-control-zoom {
        border: none !important;
        margin: 15px !important;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2) !important;
      }
      .leaflet-control-zoom a {
        background-color: rgba(20, 20, 30, 0.8) !important;
        color: #00e5ff !important;
        border: 1px solid rgba(0, 229, 255, 0.3) !important;
        backdrop-filter: blur(4px);
        transition: all 0.3s ease;
      }
      .leaflet-control-zoom a:hover {
        background-color: rgba(0, 229, 255, 0.2) !important;
        color: white !important;
      }
    `;
    document.head.appendChild(styleEl);
    
    // Override Leaflet's Control.Zoom class to prevent custom badges
    const overrideScript = document.createElement('script');
    overrideScript.textContent = `
      if (window.L && window.L.Control) {
        // Store a reference to the original zoom control
        const originalZoom = window.L.Control.Zoom;
        
        // Override it with our custom version that doesn't allow additional content
        window.L.Control.Zoom = function(options) {
          // Call the original constructor
          const zoomControl = new originalZoom(options);
          
          // Override the _updateDisabled method to remove any unwanted elements
          const originalUpdateDisabled = zoomControl._updateDisabled;
          zoomControl._updateDisabled = function() {
            originalUpdateDisabled.call(this);
            
            // Remove any elements with the text "UNITED ENGINEERING HQ"
            if (this._zoomInButton && this._zoomOutButton) {
              const removeUnwanted = (el) => {
                el.querySelectorAll('*').forEach(child => {
                  if (child.textContent && child.textContent.includes('UNITED ENGINEERING HQ')) {
                    child.remove();
                  }
                });
              };
              
              removeUnwanted(this._zoomInButton);
              removeUnwanted(this._zoomOutButton);
            }
          };
          
          return zoomControl;
        };
      }
    `;
    document.head.appendChild(overrideScript);
    
    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
    script.onload = initializeMap;
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      document.head.removeChild(linkEl);
      document.head.removeChild(styleEl);
      document.head.removeChild(overrideScript);
      document.body.removeChild(script);
    };
  }, []);
  
  // Initialize the map after Leaflet is loaded
  const initializeMap = () => {
    // Set mapLoaded state
    setMapLoaded(true);
    
    // These are the coordinates for Bangalore (specifically for the address)
    const lat = 12.9087;
    const lng = 77.6481;
    
    // Create map with dark theme
    const L = window.L;
    
    // Use our custom control factory to prevent badges
    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: false,
      fadeAnimation: true,
      zoomAnimation: true,
      markerZoomAnimation: true,
      preferCanvas: true, // Use canvas renderer for better performance
      attributionControl: false // Disable attribution control entirely
    });
    
    // Store map instance in ref for later access
    mapInstanceRef.current = map;
    
    // Add zoom control to bottom right with specific options to prevent unwanted content
    L.control.zoom({
      position: 'bottomright',
      zoomInTitle: 'Zoom in',
      zoomOutTitle: 'Zoom out'
    }).addTo(map);
    
    // Add a dark-themed tile layer that matches the site
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '', // Empty attribution string
      maxZoom: 19,
      subdomains: 'abcd',
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 0
    }).addTo(map);
    
    // Improve map performance
    map.options.inertia = true;
    map.options.inertiaDeceleration = 3000; // Higher value = smoother deceleration
    map.options.easeLinearity = 0.25; // Lower value = smoother animation
    
    // Create a custom icon for the marker
    const icon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div class="marker-pin"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
    
    // Add marker with popup
    const marker = L.marker([lat, lng], { icon }).addTo(map);
    marker.bindPopup(`
      <strong style="color: #00e5ff; font-size: 14px;">United Engineering</strong><br>
      <span style="font-size: 12px;">08 Revenue Layout, Siddareddy Layouts</span>
    `);
    
    // Create marker WITHOUT company name badge
    setTimeout(() => {
      // First aggressive removal of any controls that aren't zoom
      removeUnwantedControls();
      
      // Open popup
      marker.openPopup();
    }, 1000);
    
    // Add an event listener for when the map finishes loading
    map.on('load', () => {
      removeUnwantedControls();
    });
    
    // Add event listeners for zoom events, which might recreate controls
    map.on('zoomend', () => {
      removeUnwantedControls();
    });
  };
  
  return (
    <motion.div
      ref={mapContainerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="w-full relative rounded-xl overflow-hidden shadow-xl shadow-accent/10"
      style={{ height: `${height}px` }}
    >
      {/* Decorative border with enhanced glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/30 via-accent/20 to-accent/30 rounded-xl blur-md z-0"></div>
      
      {/* Tech grid background effect - optimized for performance */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={`grid-h-${i}`}
            className="absolute bg-accent/50"
            style={{
              height: '1px',
              width: '100%',
              top: `${(i + 1) * 12.5}%`,
              transform: 'translateZ(0)',
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`grid-v-${i}`}
            className="absolute bg-accent/50"
            style={{
              width: '1px',
              height: '100%',
              left: `${(i + 1) * 12.5}%`,
              transform: 'translateZ(0)',
            }}
          />
        ))}
      </div>
      
      {/* Map container with enhanced border */}
      <div className="relative h-full w-full border-2 border-accent/30 rounded-xl z-10 overflow-hidden group">
        {/* Map loading state */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-gray/80 z-30">
            <div className="text-center">
              <div className="relative w-16 h-16 mb-4 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-l-accent animate-spin"></div>
                <div className="absolute inset-[4px] rounded-full border-2 border-transparent border-r-accent border-b-accent animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-[8px] rounded-full border-2 border-transparent border-t-accent border-r-accent animate-spin" style={{ animationDuration: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full -ml-1 -mt-1 animate-pulse"></div>
              </div>
              <p className="text-accent animate-pulse">Loading Map</p>
            </div>
          </div>
        )}
        
        {/* OpenStreetMap container with hardware acceleration */}
        <div ref={mapRef} className="w-full h-full bg-dark-gray z-10" style={{ willChange: 'transform', transform: 'translateZ(0)' }}></div>
        
        {/* Enhanced scanning line animation */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-20" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ willChange: 'transform' }}
        >
          <motion.div 
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-[1px]" 
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut"
            }}
            style={{ willChange: 'transform' }}
          />
          <motion.div 
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-[1px]" 
            initial={{ y: '30%' }}
            animate={{ y: '80%' }}
            transition={{ 
              duration: 3.2, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
            style={{ willChange: 'transform' }}
          />
        </motion.div>
        
        {/* Corners accent with improved rendering */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/70 rounded-tl-xl z-20 pointer-events-none" style={{ willChange: 'transform' }}></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/70 rounded-tr-xl z-20 pointer-events-none" style={{ willChange: 'transform' }}></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/70 rounded-bl-xl z-20 pointer-events-none" style={{ willChange: 'transform' }}></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/70 rounded-br-xl z-20 pointer-events-none" style={{ willChange: 'transform' }}></div>
        
        {/* Technical data readouts */}
        <div className="absolute top-4 left-4 bg-dark-gray/80 backdrop-blur-sm rounded-md border border-accent/40 p-2 z-30 text-xs font-mono text-accent">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            <span>MAP DATA</span>
          </div>
        </div>
        
        {/* Technical Coordinates Data */}
        <motion.div 
          className="absolute bottom-4 left-4 z-30 bg-dark-gray/80 backdrop-blur-md border border-accent/30 rounded-lg p-3 text-xs font-mono"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-accent mb-1">COORDINATES</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <span className="text-gray-400">LAT:</span>
            <span className="text-white">12.9087° N</span>
            <span className="text-gray-400">LONG:</span>
            <span className="text-white">77.6481° E</span>
          </div>
        </motion.div>

        {/* Location tooltip */}
        <motion.div
          className="absolute top-3/4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, y: -5 }}
          animate={showTooltip ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-dark-gray/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/40 shadow-lg shadow-accent/10 text-white text-sm max-w-[220px] text-center">
            <p className="font-medium text-accent">United Engineering</p>
            <p className="text-xs text-gray-300 mt-1">08 Revenue Layout, Siddareddy Layouts</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocationMap;