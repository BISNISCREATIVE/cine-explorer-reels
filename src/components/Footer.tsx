
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path 
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" 
                  fill="currentColor"
                />
                <path 
                  d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H14V17H7V15Z" 
                  fill="currentColor"
                />
                <circle cx="8" cy="8" r="1" fill="white"/>
                <polygon points="10,12 14,10 14,14" fill="white"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">Movie</span>
          </div>
          <p className="text-gray-400 text-sm">
            Copyright ©2025 Movie Explorer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
