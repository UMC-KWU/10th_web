import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieResponse } from "../types/movie";
import MovieFilter from "../components/MovieFilter";
import type { MovieFilters } from "../types/movie";
import { useState } from "react";
import { useMemo, useCallback } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    //이걸로 아무리 동결해도 컴포넌트도 감싸야 완전히 동결됨
    () => ({
      //이 '참조' 값을 동결시키겠다
      params: filters,
    }),
    [filters],
  ); //filters가 바뀔때만 axiosRequestConfig가 바뀌도록

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handelMovieFilters = useCallback(
    //'객체' 값 동결
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters],
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <MovieFilter onchange={handelMovieFilters} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}
