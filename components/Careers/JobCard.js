import { motion } from 'framer-motion';

const JobCard = ({ job, onClick }) => {
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-medium-gray rounded-xl overflow-hidden border border-light-gray h-full cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
              job.department === 'tech' 
                ? 'bg-primary-dark/30 text-primary-light border border-primary-dark/40' 
                : 'bg-accent-dark/30 text-accent border border-accent-dark/40'
            }`}>
              {job.department === 'tech' ? 'Tech Division' : 'Precision Manufacturing Division'}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">{job.title}</h3>
          </div>
          <div className="bg-dark p-2.5 rounded-lg">
            {job.department === 'tech' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17.5H14M16 12.5H21.5M2.5 12.5H8M12 2.5V6.5M12 17.5V21.5M19 19L21.5 21.5M19 6L21.5 3.5M5 19L2.5 21.5M5 6L2.5 3.5M12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z" stroke="#5472d3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9.3V14.7C6 15.5 6.4 16.2 7 16.6L11.5 19.2C12.3 19.7 13.1 19.7 13.9 19.2L18.4 16.6C19 16.2 19.4 15.5 19.4 14.7V9.3C19.4 8.5 19 7.8 18.4 7.4L13.9 4.8C13.1 4.3 12.3 4.3 11.5 4.8L7 7.4C6.4 7.8 6 8.5 6 9.3Z" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12V15M12 9V9.01" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 flex-grow">{job.description}</p>
        
        <div className="border-t border-light-gray pt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-auto">
          <div className="flex items-center text-gray-400">
            <span className="mr-2 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span>{job.location}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <span className="mr-2 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span>{job.type}</span>
          </div>
          
          <div className="flex items-center text-gray-400 md:col-span-2">
            <span className="mr-2 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span>Posted: {formatDate(job.postedDate)}</span>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="text-xs py-1 px-2 bg-dark rounded-md text-gray-300"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs py-1 px-2 bg-dark rounded-md text-gray-400">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
          
          <span className="text-accent group-hover:translate-x-1 transition-transform duration-300 flex items-center text-sm font-medium">
            View Details
            <span className="ml-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
