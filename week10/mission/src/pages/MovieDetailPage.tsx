import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      MovieDetailPage
      <h1 className="">오타니 안 파이팅~</h1>
      <h1 className="">영화 아이디: {id}</h1>
    </div>
  );
}
