const TMDB_API_KEY = '27158b49b8943955f2815b7b99e0a678';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzE1OGI0OWI4OTQzOTU1ZjI4MTViN2I5OWUwYTY3OCIsIm5iZiI6MTc0OTcwOTE1MC44MDksInN1YiI6IjY4NGE3MTVlZjZlZDExNzg0MjM0Mzc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QlnOilr_89KQE6HpxV611Jz_h0tRXgk64GT7I2LNQJ4';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

export const tmdbApi = {
  // Get trending movies
  getTrending: async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/week`, { headers });
    return response.json();
  },

  // Get popular movies
  getPopular: async () => {
    const response = await fetch(`${BASE_URL}/movie/popular`, { headers });
    return response.json();
  },

  // Get now playing movies
  getNowPlaying: async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing`, { headers });
    return response.json();
  },

  // Get upcoming movies with pagination support
  getUpcoming: async (page: number = 1) => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?page=${page}`, { headers });
    return response.json();
  },

  // Get movie details
  getMovieDetails: async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}`, { headers });
    return response.json();
  },

  // Get movie credits
  getMovieCredits: async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits`, { headers });
    return response.json();
  },

  // Get movie videos
  getMovieVideos: async (movieId: number) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos`, { headers });
    return response.json();
  },

  // Search movies - update: accept page param
  searchMovies: async (query: string, page: number = 1) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
      { headers }
    );
    return response.json();
  },

  // Get image URL
  getImageUrl: (path: string, size: string = 'w500') => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};
