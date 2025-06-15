
import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbApi } from "@/services/tmdb";
import { Movie } from "@/types/movie";
import { Loader2 } from "lucide-react";

interface MovieSearchResultsProps {
  results: Movie[];
  loading: boolean;
  searchQuery: string;
  onSelect: (id: number) => void;
}

const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({
  results,
  loading,
  searchQuery,
  onSelect,
}) => {
  const navigate = useNavigate();

  if (!searchQuery) return null;

  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="bg-[#171B22] rounded-2xl shadow-lg border border-[#232831] hover:shadow-xl transition group cursor-pointer flex flex-col overflow-hidden relative"
              onClick={() => navigate(`/movie/${movie.id}`)}
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
                <div className="mt-auto flex gap-2">
                  {/* Tambahan badge genre/vote jika diinginkan */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full text-center text-gray-400 py-20">
          No results found for <span className="font-semibold">&quot;{searchQuery}&quot;</span>
        </div>
      )}
    </div>
  );
};

export default MovieSearchResults;
