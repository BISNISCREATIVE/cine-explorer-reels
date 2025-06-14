
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg border border-red-400/30">
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                {/* Film strip background */}
                <rect x="4" y="6" width="24" height="20" rx="2" fill="currentColor" fillOpacity="0.9"/>
                
                {/* Film holes */}
                <circle cx="7" cy="9" r="1" fill="white"/>
                <circle cx="7" cy="23" r="1" fill="white"/>
                <circle cx="25" cy="9" r="1" fill="white"/>
                <circle cx="25" cy="23" r="1" fill="white"/>
                
                {/* Play button */}
                <polygon points="13,12 13,20 19,16" fill="white"/>
                
                {/* Decorative elements */}
                <rect x="6" y="8" width="20" height="1" fill="white" fillOpacity="0.3"/>
                <rect x="6" y="23" width="20" height="1" fill="white" fillOpacity="0.3"/>
              </svg>
            </div>
            <span className="text-white font-bold text-2xl tracking-wide">Movie</span>
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
