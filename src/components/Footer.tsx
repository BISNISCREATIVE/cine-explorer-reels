
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold text-lg">Movie</span>
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
