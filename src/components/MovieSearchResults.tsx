
import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbApi } from "@/services/tmdb";
import { Movie } from "@/types/movie";

interface MovieSearchResultsProps {
  results: Movie[];
  loading: boolean;
  onSelect: (id: number) => void;
  searchQuery: string;
}

const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({
  results,
  loading,
  onSelect,
  searchQuery,
}) => {
  if (!searchQuery) return null;

  return (
    <section className="w-full flex flex-col items-center mt-6">
      <div className="container max-w-2xl mx-auto p-4 rounded-lg bg-gray-900 border border-gray-800 shadow-lg">
        {loading ? (
          <div className="text-gray-400 text-center py-8">Searching...</div>
        ) : results.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {results.slice(0, 8).map((movie) => (
              <li
                key={movie.id}
                className="flex items-center space-x-4 py-4 cursor-pointer hover:bg-gray-800 rounded-lg transition"
                onClick={() => onSelect(movie.id)}
              >
                <img
                  src={
                    movie.poster_path
                      ? tmdbApi.getImageUrl(movie.poster_path, "w92")
                      : "/placeholder.svg"
                  }
                  alt={movie.title}
                  className="w-14 h-20 object-cover rounded shadow bg-gray-700 flex-shrink-0"
                />
                <div>
                  <div className="text-white font-semibold text-lg leading-tight">
                    {movie.title}
                  </div>
                  <div className="text-gray-400 text-sm mb-1">
                    {movie.release_date?.slice(0, 4)}
                  </div>
                  <div className="text-gray-400 text-xs line-clamp-2 max-w-xs">
                    {movie.overview}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-400 text-center py-8">No results found.</div>
        )}
      </div>
    </section>
  );
};

export default MovieSearchResults;
