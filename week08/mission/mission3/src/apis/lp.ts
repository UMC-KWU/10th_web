import type { PaginationDto } from "../types/common.ts";
import type {
  RequestLpDto,
  ResponseLpListDto,
  ResponseLpDto,
  ResponseLikeLpDto,
} from "../types/lp.ts";
import { axiosInstance } from "./axios";

const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

export default getLpList;

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  //lpId를 받아서 해당 LP의 상세 정보를 가져옴
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};
