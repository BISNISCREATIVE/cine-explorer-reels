
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Home, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <div className="text-black font-bold text-sm">🎬</div>
            </div>
            <span className="text-white font-medium text-xl">Movie</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/') 
                  ? 'text-white bg-gray-800' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/favorites"
              className={`text-sm font-medium transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/favorites') 
                  ? 'text-white bg-gray-800' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-2 w-80 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600 rounded-lg h-11"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                <Search size={16} />
              </button>
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
                className={`text-sm font-medium transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isActive('/') ? 'text-white bg-gray-800' : 'text-gray-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                to="/favorites"
                className={`text-sm font-medium transition-colors flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isActive('/favorites') ? 'text-white bg-gray-800' : 'text-gray-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={18} />
                <span>Favorites</span>
              </Link>
              <div className="relative mt-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-2 w-full bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600 rounded-lg h-11"
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
