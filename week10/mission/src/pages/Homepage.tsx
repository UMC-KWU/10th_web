import useFetch from '../hooks/useFetch';
import { type MovieResponse, type MovieFilters } from '../types/movies.ts';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter.tsx';
import { useCallback, useMemo, useState } from 'react';
function Homepage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '어벤져스',
    include_adult: false,
    language: 'ko-KR',
  });

  const axiosRequesConfig = useMemo(() => {
    return {
      params: filters,
    };
  }, [filters]);

  const { data, erorr, isloading } = useFetch<MovieResponse>('/search/movie', axiosRequesConfig);
  const handleMovieFileters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters],
  );

  if (erorr) {
    return <div>{erorr}</div>;
  }

  // console.log(data?.results.map((movie) => movie.title));
  return (
    <div className="container">
      <MovieFilter onChange={handleMovieFileters} />
      {isloading ? <div>로딩 중 ...</div> : <MovieList movies={data?.results || []} />}
    </div>
  );
}

export default Homepage;
