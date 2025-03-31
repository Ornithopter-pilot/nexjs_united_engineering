import { motion } from 'framer-motion';
import { useState } from 'react';

const JobDetail = ({ job, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="bg-medium-gray rounded-xl overflow-hidden border border-light-gray relative"
    >
      {/* Header with background design */}
      <div className="relative overflow-hidden pt-10 pb-8 px-6 md:px-10 border-b border-light-gray">
        <div className={`absolute inset-0 opacity-5 ${
          job.department === 'tech' 
            ? 'bg-gradient-to-r from-primary-dark to-primary-light' 
            : 'bg-gradient-to-r from-accent-dark to-accent'
        }`}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-gradient-to-br from-accent-dark to-accent opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary-dark to-primary-light opacity-5 blur-3xl"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-dark hover:bg-light-gray transition-colors duration-300 z-10"
          aria-label="Close job details"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white">{job.title}</h3>
            
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={job.applicationLink}
              className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-light rounded-lg font-medium text-dark shadow-lg transition-all duration-300"
            >
              <span className="mr-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 12H4.5M4.5 12L11.5 5M4.5 12L11.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Apply Now
            </motion.a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mt-8 text-sm">
            <div className="flex items-center text-gray-300">
              <div className="w-10 h-10 rounded-md bg-dark flex items-center justify-center mr-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="#00e5ff" strokeWidth="2" />
                  <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#00e5ff" stroke="#00e5ff" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <div className="w-10 h-10 rounded-md bg-dark flex items-center justify-center mr-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="15" rx="2" stroke="#00e5ff" strokeWidth="2" />
                  <path d="M8 6V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V6" stroke="#00e5ff" strokeWidth="2" />
                  <path d="M8 14H16" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 10H16" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 18H16" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Job Type</p>
                <p className="font-medium">{job.type}</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-300">
              <div className="w-10 h-10 rounded-md bg-dark flex items-center justify-center mr-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#00e5ff" strokeWidth="2" />
                  <path d="M8 2V4" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 2V4" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 10H21" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Posted Date</p>
                <p className="font-medium">{formatDate(job.postedDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs navigation */}
      <div className="border-b border-light-gray bg-medium-gray">
        <div className="flex overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-10 py-4 font-medium transition-all duration-300 relative ${
              activeTab === 'overview' 
                ? 'text-accent' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-accent"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('responsibilities')}
            className={`px-10 py-4 font-medium transition-all duration-300 relative ${
              activeTab === 'responsibilities' 
                ? 'text-accent' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Responsibilities
            {activeTab === 'responsibilities' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-accent"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-10 py-4 font-medium transition-all duration-300 relative ${
              activeTab === 'requirements' 
                ? 'text-accent' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Requirements
            {activeTab === 'requirements' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-accent"></span>
            )}
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="p-6 md:p-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Job Overview</h4>
            <p className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed">{job.description}</p>
            
            <h5 className="text-lg font-semibold mb-4 text-white flex items-center">
              <span className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22H15M12 17V22M5 8H19M5 11H19M5 14H13M5 5V17C5 18.1046 5.89543 19 7 19H11.5" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Key Skills
            </h5>
            <div className="flex flex-wrap gap-3 mb-8 ml-2">
              {job.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="text-sm py-1.5 px-4 bg-dark/70 hover:bg-dark rounded-lg text-accent border border-accent/30 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-10 p-6 bg-dark rounded-lg border border-light-gray">
              <h5 className="text-lg font-semibold mb-4 text-white flex items-center">
                <span className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.66347 17H14.3364M11.9999 3V4M18.3639 5.63604L17.6568 6.34315M21 11.9999H20M4 11.9999H3M6.34309 6.34315L5.63599 5.63604M8.46441 15.5356C6.51179 13.5829 6.51179 10.4171 8.46441 8.46449C10.417 6.51187 13.5829 6.51187 15.5355 8.46449C17.4881 10.4171 17.4881 13.5829 15.5355 15.5356L14.9884 16.0827C14.3555 16.7155 13.9999 17.5739 13.9999 18.469V19C13.9999 20.1046 13.1045 21 11.9999 21C10.8954 21 9.99995 20.1046 9.99995 19V18.469C9.99995 17.5739 9.6444 16.7155 9.01151 16.0827L8.46441 15.5356Z" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Why Join Our Team
              </h5>
              <ul className="space-y-4 text-gray-300 ml-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Work with cutting-edge technology in a rapidly evolving industry</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Collaborative environment that encourages innovation and creative thinking</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Comprehensive professional development and growth opportunities</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Competitive compensation and benefits package</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Make a meaningful impact on transformative projects</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'responsibilities' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Key Responsibilities</h4>
            <ul className="space-y-5">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-5 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-gray-300 pt-1.5">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {activeTab === 'requirements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Requirements</h4>
            <div className="mb-10">
              <h5 className="text-lg font-semibold mb-4 text-white flex items-center">
                <span className="bg-accent/10 w-8 h-8 rounded-md flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Required Qualifications
              </h5>
              <ul className="space-y-4">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-accent mt-1.5 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4 text-white flex items-center">
                <span className="bg-primary-dark/20 w-8 h-8 rounded-md flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0489 2.92705C11.3483 2.00574 12.6517 2.00574 12.9511 2.92705L14.7195 8.21885C14.8492 8.63087 15.2279 8.90983 15.656 8.90983H21.2331C22.2016 8.90983 22.6083 10.1494 21.8283 10.7188L17.3537 14.0457C17.0014 14.3015 16.8577 14.7555 16.9875 15.1675L18.7558 20.4593C19.0552 21.3806 17.9947 22.1469 17.2147 21.5775L12.7401 18.2506C12.3878 17.9947 11.9058 17.9947 11.5535 18.2506L7.07886 21.5775C6.29886 22.1469 5.23842 21.3806 5.53786 20.4593L7.30618 15.1675C7.43597 14.7555 7.29217 14.3015 6.93995 14.0457L2.46531 10.7188C1.68529 10.1494 2.09201 8.90983 3.06047 8.90983H8.63759C9.06569 8.90983 9.44446 8.63087 9.57425 8.21885L11.3426 2.92705H11.0489Z" stroke="#5472d3" strokeWidth="2"/>
                  </svg>
                </span>
                Preferred Qualifications
              </h5>
              <ul className="space-y-4">
                {job.preferred.map((pref, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-3 h-3 rounded-full bg-primary-light mt-1.5 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-300">{pref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
        
        <div className="mt-10 pt-6 border-t border-light-gray flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0 flex items-center">
            <span className="w-6 h-6 rounded-full flex items-center justify-center bg-dark mr-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#00e5ff" strokeWidth="2" />
                <path d="M12 8V12" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1" fill="#00e5ff" />
              </svg>
            </span>
            For inquiries about this position, contact <span className="text-accent ml-1 border-b border-accent/30 pb-0.5">careers@unitedengineering.org</span>
          </p>
          
          <div className="flex space-x-4">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 border border-light-gray rounded-lg text-gray-300 hover:bg-light-gray hover:text-white transition-all duration-300 flex items-center"
            >
              <span className="mr-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Go Back
            </button>
            
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={job.applicationLink}
              className="px-5 py-2.5 bg-accent hover:bg-accent-light text-dark font-medium rounded-lg transition-all duration-300 flex items-center"
            >
              <span className="mr-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Apply Now
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetail;
