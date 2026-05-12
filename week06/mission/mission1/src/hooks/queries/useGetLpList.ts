import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp.ts";
import type { PaginationDto } from "../../types/common";
import type { ResponseLpListDto } from "../../types/lp"; // 추가
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
  return useQuery<
    ResponseLpListDto, // 👉 queryFn이 반환하는 타입
    Error,
    ResponseLpListDto["data"]["data"] // 👉 select 이후 최종 data 타입 (LP[])
  >({
    queryKey: [QUERY_KEY.lps],
    queryFn: () => getLpList({ cursor, limit, search, order }),
    staleTime: 1000 * 60 * 5, //5분 : 데이터가 신선하다고 간주되는 시간 -> 캐시된 데이터 그대로 사용(네트워크요청 down)
    gcTime: 1000 * 60 * 10, //10분 : 가비지 컬렉션의 약자, 사용되지 않는 데이터는 메모리에서 제거 -> 10분 후에 캐시된 데이터 제거(메모리 최적화)

    //조건에 따라 쿼리 실행 여부 제어
    //enabled: Boolean(search),
    select: (data) => data.data.data, //쿼리 함수에서 반환된 전체 응답 객체에서 필요한 데이터만 선택하여 반환 -> 컴포넌트에서는 필요한 데이터만 사용 가능(코드 간결화)
  });
}

export default useGetLpList;
