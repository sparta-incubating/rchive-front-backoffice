import { PostListResponse, TrackType } from '@/types/posts.types';
import { createServerAPI } from '@/utils/serverAPI';
import { cache } from 'react';

export const getPostList = cache(
  async (trackName: TrackType, period: number, queryString: string) => {
    const serverAPI = await createServerAPI();
    return serverAPI.get<PostListResponse>(
      `/apis/v1/backoffice/post/search?trackName=${trackName}&period=${period}&${queryString}`,
    );
  },
);

export const getPost = cache(
  async (postId: number, trackName: TrackType, period: number) => {
    const serverAPI = await createServerAPI();
    return await serverAPI.get(
      `/apis/v1/backoffice/post/${postId}?trackName=${trackName}&loginPeriod=${period}`,
    );
  },
);

export const getPostPeriod = async (trackName: TrackType) => {
  const serverAPI = await createServerAPI();
  return serverAPI.get(`/apis/v1/role/track/period?trackName=${trackName}`);
};
