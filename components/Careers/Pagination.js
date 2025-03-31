import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Logic to show ellipsis for many pages
    if (totalPages <= 5) {
      // Less than 5 pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // More than 5 pages, show ellipsis
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page === '...' || page === currentPage) return;
    onPageChange(page);
    
    // Scroll to top of job section on page change
    window.scrollTo({
      top: document.getElementById('careers').offsetTop - 100,
      behavior: 'smooth'
    });
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex items-center justify-center">
      {/* Previous button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-2 transition-colors duration-300 ${
          currentPage === 1 
            ? 'bg-dark text-gray-500 cursor-not-allowed' 
            : 'bg-medium-gray text-gray-300 hover:bg-light-gray hover:text-white'
        }`}
        aria-label="Previous page"
      >
        <i className="fas fa-chevron-left text-sm"></i>
      </motion.button>
      
      {/* Page numbers */}
      <div className="flex space-x-2">
        {pageNumbers.map((page, index) => (
          <motion.button
            key={index}
            whileHover={page !== '...' ? { scale: 1.05 } : {}}
            whileTap={page !== '...' ? { scale: 0.95 } : {}}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              page === currentPage
                ? 'bg-accent text-dark font-medium'
                : page === '...'
                  ? 'bg-dark text-gray-400 cursor-default'
                  : 'bg-medium-gray text-gray-300 hover:bg-light-gray hover:text-white'
            }`}
            aria-label={page === '...' ? 'More pages' : `Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </motion.button>
        ))}
      </div>
      
      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-lg flex items-center justify-center ml-2 transition-colors duration-300 ${
          currentPage === totalPages 
            ? 'bg-dark text-gray-500 cursor-not-allowed' 
            : 'bg-medium-gray text-gray-300 hover:bg-light-gray hover:text-white'
        }`}
        aria-label="Next page"
      >
        <i className="fas fa-chevron-right text-sm"></i>
      </motion.button>
    </div>
  );
};

export default Pagination;
