
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Home, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Logo from "./Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSearchModal from "./MobileSearchModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const isMobile = useIsMobile();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === '/';
  const isMovieDetail = location.pathname.startsWith('/movie/');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out ${
      scrolled || (!isHome && !isMovieDetail) || isMenuOpen 
        ? 'bg-black border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Navigation - Desktop */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-[7.111px] w-[129.111px]">
              <Logo size={40} />
              <span className="text-white font-medium text-xl">Movie</span>
            </Link>

            {/* Desktop Navigation - moved closer to logo */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors flex items-center justify-center p-2 gap-2 rounded-none ${
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
                className={`text-sm font-medium transition-colors flex items-center justify-center p-2 gap-2 rounded-none ${
                  isActive('/favorites') 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Heart size={18} />
                <span>Favorites</span>
              </Link>
            </nav>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
             <form onSubmit={handleSearchSubmit} className="flex-shrink-0 flex items-center gap-2 w-[243px] h-[56px] py-2 px-4 rounded-2xl border border-[#252B37] bg-[rgba(10,13,18,0.60)] backdrop-blur-[20px]">
              <Search className="text-gray-400 w-6 h-6 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search Movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 w-full h-full p-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
            </form>
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
                className={`text-sm font-medium transition-colors flex items-center justify-center p-2 gap-2 rounded-none ${
                  isActive('/') ? 'text-white bg-gray-800' : 'text-gray-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                to="/favorites"
                className={`text-sm font-medium transition-colors flex items-center justify-center p-2 gap-2 rounded-none ${
                  isActive('/favorites') ? 'text-white bg-gray-800' : 'text-gray-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={18} />
                <span>Favorites</span>
              </Link>
               <form onSubmit={handleSearchSubmit} className="flex-shrink-0 flex items-center gap-2 w-full h-[56px] py-2 px-4 rounded-2xl border border-[#252B37] bg-[rgba(10,13,18,0.60)] backdrop-blur-[20px]">
                <Search className="text-gray-400 w-6 h-6 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-0 w-full h-full p-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                />
              </form>
            </nav>
          </div>
        )}

        {/* Mobile search modal trigger - remove this for movie detail pages */}
        {isMobile && !isMovieDetail && (
          <>
            <div className="md:hidden mt-4 pb-2 flex justify-center">
              <div
                className="flex items-center gap-2 w-full h-[42px] py-2 px-4 rounded-xl border border-[#252B37] bg-[rgba(10,13,18,0.60)] backdrop-blur-[20px] cursor-pointer"
                onClick={() => setMobileSearchOpen(true)}
              >
                <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-400 text-base select-none">Search Movie</span>
              </div>
            </div>
            <MobileSearchModal open={mobileSearchOpen} onOpenChange={setMobileSearchOpen} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
