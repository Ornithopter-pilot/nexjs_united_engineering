import { motion } from 'framer-motion';

const FilterTabs = ({ selectedDepartment, setSelectedDepartment }) => {
  const departments = [
    { id: 'all', name: 'All Divisions', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 8.5V16.4C21 17.7 21 18.35 20.82 18.9C20.6 19.55 20.2 20.08 19.64 20.47C19.12 20.82 18.47 20.93 17 20.95C16.9 20.95 16.76 20.95 16.57 20.95H7.43C7.24 20.95 7.1 20.95 7 20.95C5.54 20.93 4.88 20.82 4.36 20.47C3.8 20.08 3.4 19.55 3.18 18.9C3 18.35 3 17.7 3 16.4V8.5C3 6.5 3 5.5 3.73 4.8C4.34 4.22 5.27 4.07 7 4.05H17C18.73 4.07 19.66 4.22 20.27 4.8C21 5.5 21 6.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 13V15M2 13V15M6.5 16.5V17.5C6.5 19.16 7.84 20.5 9.5 20.5H14.5C16.16 20.5 17.5 19.16 17.5 17.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.995 20.95V23M21.5 13.5V15C21.5 15.28 21.28 15.5 21 15.5C20.72 15.5 20.5 15.28 20.5 15V13.5C20.5 13.22 20.72 13 21 13C21.28 13 21.5 13.22 21.5 13.5ZM3.5 13.5V15C3.5 15.28 3.28 15.5 3 15.5C2.72 15.5 2.5 15.28 2.5 15V13.5C2.5 13.22 2.72 13 3 13C3.28 13 3.5 13.22 3.5 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
    { id: 'tech', name: 'Tech Division', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 17.5H14M16 12.5H21.5M2.5 12.5H8M12 2.5V6.5M12 17.5V21.5M19 19L21.5 21.5M19 6L21.5 3.5M5 19L2.5 21.5M5 6L2.5 3.5M12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
    { id: 'manufacturing', name: 'Precision Manufacturing Division', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9.3V14.7C6 15.5 6.4 16.2 7 16.6L11.5 19.2C12.3 19.7 13.1 19.7 13.9 19.2L18.4 16.6C19 16.2 19.4 15.5 19.4 14.7V9.3C19.4 8.5 19 7.8 18.4 7.4L13.9 4.8C13.1 4.3 12.3 4.3 11.5 4.8L7 7.4C6.4 7.8 6 8.5 6 9.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V15M12 9V9.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) }
  ];
  
  return (
    <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      <div className="flex space-x-3">
        {departments.map((dept) => (
          <motion.button
            key={dept.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedDepartment(dept.id)}
            className={`px-4 py-2.5 rounded-lg flex items-center whitespace-nowrap transition-all duration-300 ${
              selectedDepartment === dept.id
                ? 'bg-accent text-dark font-medium'
                : 'bg-medium-gray text-gray-300 hover:bg-light-gray'
            }`}
          >
            <span className={`text-current mr-2`}>{dept.icon}</span>
            <span>{dept.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
