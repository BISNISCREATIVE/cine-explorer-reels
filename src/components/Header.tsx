import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Home, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Logo from "./Logo";
import { tmdbApi } from "@/services/tmdb";
import MovieSearchResults from './MovieSearchResults';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showResultsPanel, setShowResultsPanel] = useState(false);

  // INFINITE SCROLL STATE
  const [searchPage, setSearchPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRefDesktop = useRef<HTMLDivElement>(null);
  const containerRefMobile = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Reset page & result jika searchQuery berubah (fresh search)
  useEffect(() => {
    setSearchPage(1);
    setSearchResults([]);
    setHasMoreResults(true);
  }, [searchQuery]);

  // Fetch search movies (for current page) with debounce
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearchLoading(false);
      setHasMoreResults(true);
      return;
    }
    setSearchLoading(true);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      try {
        // Perbaikan: pisahkan query dan page parameter
        const data = await tmdbApi.searchMovies(searchQuery, searchPage);
        if (searchPage === 1) {
          setSearchResults(data.results || []);
        } else {
          setSearchResults((prev: any[]) => [...prev, ...(data.results || [])]);
        }
        setHasMoreResults((data?.results?.length ?? 0) > 0 && (data.page < (data.total_pages || 999)));
      } catch (err) {
        setSearchResults([]);
        setHasMoreResults(false);
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
    // eslint-disable-next-line
  }, [searchQuery, searchPage]);

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (containerRefDesktop.current && !containerRefDesktop.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Show panel when input focused & ada searchQuery
  useEffect(() => {
    setShowResultsPanel(!!searchFocused && !!searchQuery);
  }, [searchFocused, searchQuery]);

  // Close search panel on route change
  useEffect(() => {
    setSearchFocused(false);
    setShowResultsPanel(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSelectMovie = (id: number) => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchFocused(false);
    setShowResultsPanel(false);
    setSearchPage(1);
    setIsMenuOpen(false); // Tutup mobile menu jika ada
    navigate(`/movie/${id}`);
  };

  // Handler fetch next page (dipanggil dari MovieSearchResults saat scroll near bottom)
  const fetchNextSearchPage = useCallback(() => {
    // Prevent double fetch
    if (searchLoading || !hasMoreResults) return;
    setSearchPage(prev => prev + 1);
  }, [searchLoading, hasMoreResults]);

  const isActive = (path: string) => location.pathname === path;

  // Cek apakah sedang di halaman detail movie (contoh: /movie/xxxxx)
  const isMovieDetailPage = /^\/movie\/\d+/.test(location.pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Logo size={40} />
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
          <div className="hidden md:flex items-center space-x-4" ref={containerRefDesktop}>
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
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
              <div className="relative mt-4" ref={containerRefMobile}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search Movie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="pl-12 pr-4 py-2 w-full bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600 rounded-lg h-11"
                />
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Show search results panel below header only
          IF not on a movie detail page */}
      {!isMovieDetailPage && showResultsPanel && (
        <MovieSearchResults
          results={searchResults}
          loading={searchLoading}
          onSelect={handleSelectMovie}
          searchQuery={searchQuery}
          onLoadMore={fetchNextSearchPage}
          hasMore={hasMoreResults}
        />
      )}
    </header>
  );
};

export default Header;
