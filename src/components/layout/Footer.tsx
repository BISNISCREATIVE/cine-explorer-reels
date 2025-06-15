
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo size={40} />
            <span className="text-white font-bold text-xl">Movie</span>
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

