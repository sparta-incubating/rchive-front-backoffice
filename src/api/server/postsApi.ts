import { PostListResponse } from '@/types/posts.types';
import { serverAxios } from '@/utils/serverAxios';
import { cache } from 'react';

export const getPostList = async (
  trackName: string,
  period: number,
  queryString: string,
) => {
  return serverAxios.get<PostListResponse>(
    `/apis/v1/backoffice/post/search?trackName=${trackName}&period=${period}&${queryString}`,
  );
};

export const getPost = cache(
  async (postId: number, trackName: string, period: number) => {
    return await serverAxios.get(
      `/apis/v1/backoffice/post/${postId}?trackName=${trackName}&loginPeriod=${period}`,
    );
  },
);

export const getPostPeriod = async (trackName: string) => {
  return serverAxios.get(`/apis/v1/role/track/period?trackName=${trackName}`);
};
