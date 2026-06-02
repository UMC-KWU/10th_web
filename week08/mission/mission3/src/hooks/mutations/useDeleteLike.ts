import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";
import type { Likes } from "../../types/lp";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    //onMutate: 요청 직전에 실행되는 함수, 낙관적 업데이트 사용시 유용, cache로 업데이트
    onMutate: async (lp) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });
      //현재 게시글의 데이터를 캐시에서 가져오기
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);
      //게시글 데이터를 복사해서 새로운 객체 만들기
      //나중에 오류 발생시 이전 상태로 되돌리기 위해서
      const newLpPost = { ...previousLpPost };

      //게시글의 저장된 좋아요의 위치를 찾아야함
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId, //내 아이디 찾았냐?
        ) ?? -1; //없으면 -1 반환

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1); //좋아요 제거
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike); //좋아요 추가
      }

      //캐시 업데이트 -> UI 바로 업데이트
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);
      return { previousLpPost, newLpPost }; //실패시 롤백하기 위해 이전 상태 반환
    },

    //에러 발생시 롤백
    onError: (error, newLp, context) => {
      console.log(error, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id,
      ); //롤백
    },

    //성공, 실패 상관없이 항상 실행되는 함수
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default useDeleteLike;
