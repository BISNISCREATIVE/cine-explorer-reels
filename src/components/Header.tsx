
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors flex items-center space-x-2 ${
                isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </Link>
            <Link
              to="/favorites"
              className={`text-sm font-medium transition-colors flex items-center space-x-2 ${
                isActive('/favorites') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-lg">❤️</span>
              <span>Favorites</span>
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 rounded-full"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors flex items-center space-x-2 ${
                  isActive('/') ? 'text-white' : 'text-gray-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">🏠</span>
                <span>Home</span>
              </Link>
              <Link
                to="/favorites"
                className={`text-sm font-medium transition-colors flex items-center space-x-2 ${
                  isActive('/favorites') ? 'text-white' : 'text-gray-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg">❤️</span>
                <span>Favorites</span>
              </Link>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 rounded-full"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
