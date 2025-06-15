
import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { tmdbApi } from "@/services/tmdb";
import { Movie } from "@/types/movie";
import { Loader2 } from "lucide-react";

interface MovieSearchResultsProps {
  results: Movie[];
  loading: boolean;
  searchQuery: string;
  onSelect: (id: number) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({
  results,
  loading,
  searchQuery,
  onSelect,
  onLoadMore,
  hasMore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll: check scroll near bottom, panggil onLoadMore jika ada
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !onLoadMore || !hasMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Trigger load more when sisa <= 200px
    if (scrollHeight - scrollTop - clientHeight < 200) {
      onLoadMore();
    }
  }, [onLoadMore, hasMore, loading]);

  // Attach scroll listener
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!searchQuery) return null;

  return (
    <div
      ref={containerRef}
      className="max-h-[70vh] overflow-y-auto bg-[#101216]/95 backdrop-blur-xl border-t border-[#232831] px-3 sm:px-8 pt-7 pb-5 w-full shadow-xl z-[60] fixed left-0 right-0 top-16"
      style={{ minHeight: '250px' }}
    >
      {loading && results.length === 0 ? (
        <div className="w-full flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(movie.id);
              }}
              className="bg-[#171B22] rounded-2xl shadow-lg border border-[#232831] hover:shadow-xl transition group cursor-pointer flex flex-col overflow-hidden relative"
            >
              <img
                src={
                  movie.poster_path
                    ? tmdbApi.getImageUrl(movie.poster_path, "w500")
                    : "/placeholder.svg"
                }
                alt={movie.title}
                className="w-full h-80 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">{movie.title}</h3>
                <div className="text-gray-400 text-sm mb-2">{movie.release_date?.slice(0, 4)}</div>
                <div className="text-gray-300 text-sm line-clamp-3 mb-2">{movie.overview}</div>
                <div className="mt-auto flex gap-2"></div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full text-center text-gray-400 py-20">
          No results found for <span className="font-semibold">&quot;{searchQuery}&quot;</span>
        </div>
      )}
      {/* Loader bawah untuk infinite scroll */}
      {loading && results.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
        </div>
      )}
      {!hasMore && results.length > 0 && (
        <div className="text-center text-zinc-500 py-4 text-sm">No more results</div>
      )}
    </div>
  );
};

export default MovieSearchResults;
