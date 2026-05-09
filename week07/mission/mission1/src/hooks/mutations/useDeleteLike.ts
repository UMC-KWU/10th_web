import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data) => {
      //data: API 성공 응답 데이터
      //variables: mutate에 전달한 값
      //context: onMutate에서 반환한 값
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true, //정확히 매칭하는 경우만 새로고침해라
      });
    },
    //onError: 요청 실패시 발생 한 에러
    //onMutate: 요청 직전에 실행되는 함수, 낙관적 업데이트 사용시 유용
    //onSettled: 요청이 성공하든 실패하든 항상 실행되는 함수, 로딩 상태 초기화할 때 유용
  });
}

export default useDeleteLike;
