import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import getLpList from "../../apis/lp.ts";
import type { ResponseLpListDto } from "../../types/lp";

// type LP = ResponseLpListDto["data"]["data"][number];

type Params = {
  search?: string;
  limit?: number;
  order?: "asc" | "desc";
};

function useGetInfiniteLpList({
  search = "",
  limit = 10,
  order = "asc",
}: Params) {
  return useInfiniteQuery<
    ResponseLpListDto, // 1. queryFn이 리턴하는 타입
    Error, // 2. 에러 타입
    InfiniteData<ResponseLpListDto>, // 3. 최종 data의 타입 (이게 포인트!)
    [string, string, string], // 4. queryKey 타입
    number // 5. pageParam 타입
  >({
    queryKey: [QUERY_KEY.lps, search, order],

    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam,
        search,
        limit,
        order,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    //select: (data) => data.pages.flatMap((page) => page.data.data),
  });
}

export default useGetInfiniteLpList;
