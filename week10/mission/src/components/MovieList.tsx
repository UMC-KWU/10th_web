import { type Movie } from '../types/movies';
import MovieCard from './MovieCard';
import { useState } from 'react';
import MovieModal from './MovieModal';

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setSelectedMovie(null);
  };
  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <span className="text-2xl font-bold text-gray-400">검색 결과가 없습니다.</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={openModal}
        />
      ))}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MovieList;
