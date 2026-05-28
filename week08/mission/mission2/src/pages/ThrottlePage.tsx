import { useEffect, useState } from "react";
import useThrottle from "../hooks/queries/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); //내가 스크롤하면 handleScroll 실행해라

    return () => {
      window.removeEventListener("scroll", handleScroll); //메모리 누수 방지 위해 이벤트 제거
    };
  }, [handleScroll]);

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div>
        <h1>Throttling이 무엇일까요</h1>
        <p>ScrollY: {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
