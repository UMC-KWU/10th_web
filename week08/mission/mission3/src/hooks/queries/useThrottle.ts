//useThrottle: 주어진 값(상태)이 자주 변경될 때 -> 최소 interval간격으로만 업데이트 --> 성능 개선
import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500) {
  //1. 상태를 선언 + 초기화: throttleValue = 최종적으로 쓰로틀링 적용된 값 저장
  //초기값을 전달받은 value
  const [throttleValue, setThrottleValue] = useState<T>(value);

  //2. 마지막으로 실행된 시간을 기록하는 변수: Ref lastExecuted
  //useRef: 컴포넌트가 리렌더링 되어도 값이 유지 + 변경되어도 리렌더링을 발생시키지 않음
  const lastExecuted = useRef<number>(Date.now());

  //3. useEffect: value나 delay가 변경될 때마다 실행
  useEffect(() => {
    //현재 시각과 lastExecuted.current에 저장된 마지막 시각 + delay를 비교함
    //충분한 시간이 지나면 바로 업데이트 == throttling
    if (Date.now() >= lastExecuted.current + delay) {
      //현재 시간이 지난 경우, 현재 시각으로 lastExecuted 업데이트
      lastExecuted.current = Date.now();

      //최신 value를 throttleValuedp 저장해서 컴포넌트를 리렌더링
      setThrottleValue(value);
    } else {
      //충분한 시간이 지나지 않은 경우, delay가 끝난 후에 업데이트(최신 value로)
      const timerId = setTimeout(() => {
        //타이머가 만료되면, 마지막 업데이트 시간을 현재 시각으로 갱신
        lastExecuted.current = Date.now();

        //최신 value를 throttleValue에 저장해서 컴포넌트를 리렌더링
        setThrottleValue(value);
      }, delay);

      //cleanup Function : useEffect가 재실행되기 전에 타이머가 실행되지 않았다면
      //기존 타이머를 clearTimeout을 통해 취소하여 중복 업데이트를 방지함.
      return () => clearTimeout(timerId);
    }
  }, [value, delay]); //value,delay 값이 변경될 때마다 실행되야 하므로

  return throttleValue;
}
export default useThrottle;
