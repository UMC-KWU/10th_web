import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const [search, setSearch] = useState("매튜");
  const { data, isPending, isError } = useGetLpList({ search });

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러발생</div>;
  }

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />

      {data?.map((lp) => (
        <h1 key={lp.id}>{lp.title}</h1>
      ))}
    </div>
  );
};

export default HomePage;
