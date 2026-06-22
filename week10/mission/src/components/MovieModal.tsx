import { type Movie } from '../types/movies';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        <div className="relative h-64 bg-gray-900">
          <img
            src={movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : ''}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold transition-colors">
            ✕
          </button>

          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold drop-shadow-lg">{movie.title}</h2>
          </div>
        </div>

        <div className="p-6 flex gap-6">
          <div>
            <img
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : ''}
              alt={movie.title}
              className="w-40 h-56 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <div className="mb-4">
                <div className="font-bold text-xl text-blue-500">{movie.vote_average.toFixed(1)}</div>
              </div>
              <div className="mb-4 flex flex-col gap-1 items-center">
                <p className="text-sm font-semibold text-gray-600">개봉일</p>
                <p className="text-lg font-bold text-gray-900">{movie.release_date}</p>
              </div>

              <div className="mb-4 flex flex-col gap-1 items-center">
                <p className="text-sm font-semibold text-gray-600">인기도</p>
                <p className="text-lg font-bold text-gray-900">{movie.popularity.toFixed(1)}</p>
              </div>

              <div className="mb-6 flex flex-col gap-1 items-center">
                <p className="text-sm font-semibold text-gray-600 mb-2">줄거리</p>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{movie.overview}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <a
                href={imdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors text-center">
                IMDB에서 검색
              </a>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg transition-colors">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
