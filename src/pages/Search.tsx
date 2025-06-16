import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbApi } from '@/services/tmdb';
import { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard';
import { Loader2 } from 'lucide-react';
import InlineSpinner from '@/components/ui/InlineSpinner';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchSearchResults = useCallback(async (searchQuery: string, searchPage: number) => {
        if (!searchQuery) {
            setResults([]);
            return;
        };
        setLoading(true);
        try {
            const data = await tmdbApi.searchMovies(searchQuery, searchPage);
            if (searchPage === 1) {
                setResults(data.results || []);
            } else {
                setResults(prev => [...prev, ...(data.results || [])]);
            }
            setHasMore((data.results?.length ?? 0) > 0 && data.page < (data.total_pages || 1));
        } catch (error) {
            console.error("Failed to search movies:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setResults([]);
        setPage(1);
        setHasMore(true);
        if (query) {
            fetchSearchResults(query, 1);
        }
    }, [query, fetchSearchResults]);

    const loadMoreResults = useCallback(() => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [loading, hasMore]);
    
    useEffect(() => {
        if (page > 1) {
            fetchSearchResults(query, page);
        }
    }, [page, query, fetchSearchResults]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 300 || loading || !hasMore) {
            return;
        }
        loadMoreResults();
    }, [loading, hasMore, loadMoreResults]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">
                    {query ? (
                        <>
                            Search results for <span className="text-[#9A1E0C]">"{query}"</span>
                        </>
                    ) : (
                        "Please enter a search term"
                    )}
                </h1>

                {loading && results.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 animate-spin text-gray-400" />
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {results.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    !loading && query && (
                         <div className="flex flex-col items-center justify-center text-center py-20">
                            <img src="/lovable-uploads/70623c64-2a7b-48ad-beed-1bbfba185e3a.png" alt="Data Not Found" className="w-32 h-32 mb-6" />
                            <h2 className="text-2xl font-bold text-white">Data Not Found</h2>
                            <p className="text-gray-400 mt-2">Try other keywords</p>
                        </div>
                    )
                )}
                
                {loading && results.length > 0 && (
                    <div className="flex justify-center py-8">
                        <InlineSpinner size={40} />
                    </div>
                )}

                {!hasMore && results.length > 0 && (
                    <div className="text-center text-zinc-500 py-4 text-sm">
                        You've reached the end of the results.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
