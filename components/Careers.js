import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import JobCard from './Careers/JobCard';
import JobDetail from './Careers/JobDetail';
import Pagination from './Careers/Pagination';
import FilterTabs from './Careers/FilterTabs';
import { jobs } from './Careers/jobData';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const jobsPerPage = 4;
  const careersRef = useRef(null);
  
  // Handle filtering jobs based on department and search term
  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesDepartment && matchesSearch;
    });
    
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [selectedDepartment, searchTerm]);
  
  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  
  // Handle job selection
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    
    // Scroll to job details when a job is selected
    if (careersRef.current) {
      const yOffset = -100; // Offset for navbar
      const y = careersRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  const closeJobDetail = () => {
    setSelectedJob(null);
  };
  
  // Handle department selection
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    
    // Close job detail view when changing departments
    if (selectedJob) {
      setSelectedJob(null);
    }
  };
  
  return (
    <section id="careers" ref={careersRef} className="py-24 bg-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-primary-dark opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-accent-dark opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Join Our Team</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover opportunities to innovate and excel at the cutting edge of technology and precision manufacturing.
          </p>
        </motion.div>
        
        {/* Search and filter section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className={`relative w-full md:w-1/2 transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <input
                type="text"
                placeholder="Search for positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full py-3 px-5 pl-12 bg-medium-gray border border-light-gray rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <FilterTabs 
              selectedDepartment={selectedDepartment} 
              setSelectedDepartment={handleDepartmentSelect} 
            />
          </div>
        </motion.div>
        
        {/* Jobs display section */}
        {selectedJob ? (
          <JobDetail job={selectedJob} onClose={closeJobDetail} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentJobs.length > 0 ? (
                currentJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <JobCard job={job} onClick={() => handleJobSelect(job)} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 flex justify-center items-center py-20">
                  <div className="text-center">
                    <i className="fas fa-search text-4xl text-gray-500 mb-4"></i>
                    <h3 className="text-xl font-medium mb-2">No matching positions found</h3>
                    <p className="text-gray-400">Try adjusting your search criteria or browse all departments</p>
                    <button 
                      onClick={() => { setSelectedDepartment('all'); setSearchTerm(''); }}
                      className="mt-6 px-6 py-2 bg-primary-dark hover:bg-primary transition-colors duration-300 rounded-lg text-white"
                    >
                      View all positions
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredJobs.length > jobsPerPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 flex justify-center"
              >
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Careers;
