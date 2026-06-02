import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  //value or delay가 변경될 때마다 실행
  useEffect(() => {
    //delay 이후에 핸들러 동작함 = delay 이후에 debouncedValue가 value로 업데이트됨
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    //value가 변경되면 -> 기존 타이머를 지워서 업데이트 취소
    //값이 변경될 때마다 -> 마지막에 멈춘 값만 업데이트 됨
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  //최종적으로 '잠깐 기다린 후의' 값을 반환
  return debouncedValue;
}

export default useDebounce;
