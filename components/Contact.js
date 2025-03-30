import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import LocationMap from './LocationMap';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    services: []
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });
  
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  
  // Animation controls
  const sectionControls = useAnimation();
  const formControls = useAnimation();
  const mapControls = useAnimation();
  
  // Check if elements are in view
  const sectionInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const formInView = useInView(formRef, { once: true, threshold: 0.2 });
  const mapInView = useInView(mapRef, { once: true, threshold: 0.2 });
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (sectionInView) sectionControls.start('visible');
    if (formInView) formControls.start('visible');
    if (mapInView) mapControls.start('visible');
  }, [sectionInView, formInView, mapInView, sectionControls, formControls, mapControls]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        services: [...formData.services, value]
      });
    } else {
      setFormData({
        ...formData,
        services: formData.services.filter(service => service !== value)
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });
    
    // Simulate API call with timeout
    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: null });
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        services: []
      });
    }, 1500);
  };
  
  // Available services
  const availableServices = [
    { id: 'precision-machining', label: 'Precision Machining' },
    { id: 'custom-components', label: 'Custom Components' },
    { id: 'prototyping', label: 'Rapid Prototyping' },
    { id: 'engineering-consultation', label: 'Engineering Consultation' },
    { id: 'material-selection', label: 'Material Selection' }
  ];
  
  // Contact information
  const contactInfo = [
    { icon: 'fa-map-marker-alt', title: 'Visit Us', content: '08 REVENUE LAYOUT, SIDDAREDDY LAYOUTS NAGANATHPUR, BOMMANAHALLI, BANGALORE' },
    { icon: 'fa-envelope', title: 'Email Us', content: 'info@unitedengineering.org' },
    { icon: 'fa-phone-alt', title: 'Call Us', content: '+91 80 1234 5678' },
    { icon: 'fa-clock', title: 'Working Hours', content: 'Monday - Friday: 9:00 AM - 6:00 PM' }
  ];
  
  return (
    <section id="contact" ref={sectionRef} className="min-h-screen bg-dark text-white pt-20 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Tech grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-accent"
              style={{
                height: '1px',
                width: '100%',
                top: `${(i + 1) * 7}%`,
                left: 0,
                transform: `rotate(${i % 2 === 0 ? '-0.3' : '0.3'}deg)`,
                opacity: 0.3,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)'
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i + 'v'}
              className="absolute bg-accent"
              style={{
                width: '1px',
                height: '100%',
                left: `${(i + 1) * 12}%`,
                top: 0,
                opacity: 0.2,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
              }}
            />
          ))}
        </div>
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-accent"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Section header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={sectionControls}
        className="container mx-auto px-6 mb-16"
      >
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-md border-l-2 border-accent mb-6">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="text-accent font-medium tracking-wider">GET IN TOUCH</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Discuss Your <span className="text-accent">Project</span></h2>
          
          <p className="text-xl text-gray-300">
            Contact our team to discuss how our precision engineering capabilities can benefit your business and projects.
            We're ready to help you bring your concepts to reality.
          </p>
        </motion.div>
      </motion.div>
      
      {/* Contact content */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mapControls}
            className="lg:col-span-1"
            ref={mapRef}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-dark-gray/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800 h-full"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <i className="fas fa-info-circle text-accent"></i>
                </span>
                <span>Contact Information</span>
              </h3>
              
              <div className="space-y-8 mb-10">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <i className={`fas ${item.icon} text-accent`}></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Social media links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                <div className="flex gap-4">
                  {['fa-linkedin-in', 'fa-twitter', 'fa-facebook-f'].map((icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="w-10 h-10 rounded-full bg-dark border border-gray-700 flex items-center justify-center text-gray-300 hover:text-accent hover:border-accent transition-all duration-300"
                    >
                      <i className={`fab ${icon}`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={formControls}
            className="lg:col-span-2"
            ref={formRef}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-dark-gray/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <i className="fas fa-paper-plane text-accent"></i>
                </span>
                <span>Send Us a Message</span>
              </h3>
              
              {formStatus.submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent/10 border border-accent/30 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-check text-accent text-2xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold mb-3">Message Sent Successfully!</h4>
                  <p className="text-lg text-gray-300 mb-6">Thank you for reaching out to us. We'll get back to you shortly.</p>
                  <button
                    onClick={() => setFormStatus({ submitted: false, submitting: false, error: null })}
                    className="bg-accent hover:bg-accent-light text-dark font-bold py-3 px-6 rounded-md transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Two columns layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark border border-gray-700 rounded-md px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark border border-gray-700 rounded-md px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300"
                        placeholder="Your email"
                      />
                    </div>
                    
                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-gray-300 mb-2">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-dark border border-gray-700 rounded-md px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300"
                        placeholder="Your company"
                      />
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-gray-300 mb-2">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-dark border border-gray-700 rounded-md px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 mb-2">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark border border-gray-700 rounded-md px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-dark border border-gray-700 rounded-md px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  {/* Services */}
                  <div>
                    <label className="block text-gray-300 mb-3">Services You're Interested In</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availableServices.map((service) => (
                        <div key={service.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={service.id}
                            name="services"
                            value={service.id}
                            checked={formData.services.includes(service.id)}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 bg-dark border-gray-700 accent-accent"
                          />
                          <label htmlFor={service.id} className="ml-2 text-gray-300">
                            {service.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="group bg-accent hover:bg-accent-light text-dark font-bold py-4 px-8 rounded-md inline-flex items-center justify-center transition-all duration-500 shadow-lg shadow-accent/20 hover:shadow-accent/40 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Add shine effect on hover */}
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                    
                    <span className="relative z-10 flex items-center">
                      {formStatus.submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          SENDING MESSAGE...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <i className="fas fa-paper-plane ml-2"></i>
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Map with Google Maps Integration */}
      <div className="container mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-dark-gray/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 relative overflow-hidden"
        >
          {/* Technical data readout - top left */}
          <div className="absolute top-6 left-6 bg-dark-gray/80 backdrop-blur-sm rounded-md border border-accent/40 p-2 z-20 text-xs font-mono text-accent">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span>LOCATION DATA</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 pl-32">
            <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <i className="fas fa-map-marker-alt text-accent"></i>
            </span>
            <span>Our Location</span>
          </h3>
          
          {/* Map Instructions */}
          <div className="flex justify-end mb-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="bg-dark-gray/70 backdrop-blur-sm rounded-md px-3 py-1 border border-gray-700 text-sm text-gray-300 flex items-center gap-2"
            >
              <i className="fas fa-mouse text-accent text-xs"></i>
              <span>Hover over map for enhanced view</span>
            </motion.div>
          </div>
          
          {/* Technical Coordinates Data */}
          <motion.div 
            className="absolute bottom-8 left-8 z-30 bg-dark-gray/80 backdrop-blur-md border border-accent/30 rounded-lg p-3 text-xs font-mono"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="text-accent mb-1">COORDINATES</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <span className="text-gray-400">LAT:</span>
              <span className="text-white">12.9087° N</span>
              <span className="text-gray-400">LONG:</span>
              <span className="text-white">77.6481° E</span>
            </div>
          </motion.div>
          
          {/* Google Map Component */}
          <LocationMap 
            address="08 REVENUE LAYOUT, SIDDAREDDY LAYOUTS NAGANATHPUR, BOMMANAHALLI, BANGALORE, KARNATAKA, INDIA" 
            height={500} 
          />
          
          {/* Tech data readout - bottom right */}
          <motion.div 
            className="absolute bottom-6 right-6 bg-dark-gray/80 backdrop-blur-sm rounded-md border border-accent/40 p-2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <div className="text-xs font-mono text-accent flex items-center space-x-1">
              <i className="fas fa-building mr-1"></i>
              <span>UNITED ENGINEERING HQ</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Digital Business Card - Additional Way to Connect */}
      <div className="container mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-dark-gray/40 to-dark/60 backdrop-blur-sm rounded-xl p-8 border border-gray-800 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`gradient-line-${i}`}
                className="absolute bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                style={{
                  height: '1px',
                  width: '100%',
                  top: `${(i + 1) * 20}%`,
                  left: 0,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Need Quick Support?</h3>
              <p className="text-gray-300 max-w-xl">Our team is ready to provide technical support and answer any questions about our precision engineering services.</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="tel:+918012345678"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-dark/50 border border-accent/30 hover:border-accent/60 rounded-lg px-5 py-3 text-white transition-all duration-300"
              >
                <i className="fas fa-phone text-accent"></i>
                <span>Call Support</span>
              </motion.a>
              
              <motion.a
                href="mailto:support@unitedengineering.org"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-dark/50 border border-accent/30 hover:border-accent/60 rounded-lg px-5 py-3 text-white transition-all duration-300"
              >
                <i className="fas fa-envelope text-accent"></i>
                <span>Email Support</span>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-accent text-dark font-semibold rounded-lg px-5 py-3 transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                <i className="fas fa-comments"></i>
                <span>Live Chat</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;