import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList({ search, limit: 5, order: "desc" });

  //ref: 특정 요소 감시
  //inView: 해당 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage(); //해당 요소가 화면에 보이면 다음 페이지 보여라
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러발생</div>;
  }

  const allLps = lps?.pages.flatMap((page) => page.data.data) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {allLps.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
