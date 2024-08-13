import PostListPage from '@/components/pages/postListPage';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/posts.constnat';
import { PostListResponse, SearchParamsType } from '@/types/posts.types';
import { createServerAPI } from '@/utils/serverAPI';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import React from 'react';

export const revalidate = 1;

interface PostProps {
  searchParams: SearchParamsType;
}

const Post = async ({ searchParams }: PostProps) => {
  const searchParamsData: SearchParamsType = {
    postType: searchParams.postType ?? '',
    startDate: searchParams.startDate ?? '',
    endDate: searchParams.endDate ?? '',
    searchPeriod: searchParams.searchPeriod ?? '',
    isOpened: searchParams.isOpened ?? '',
    tutorId: searchParams.tutorId ?? '',
    page: searchParams.page ?? '',
    size: searchParams.size ?? '',
    title: searchParams.title ?? '',
  };

  const accessToken = String(getCookie('AT', { cookies }));
  const period = String(getCookie('period', { cookies }));
  const trackName = String(getCookie('trackName', { cookies }));
  const serverAPI = createServerAPI(accessToken);

  const query = new URLSearchParams();
  if (searchParamsData.postType && searchParams.postType !== 'all')
    query.set('postType', searchParamsData.postType);
  if (searchParamsData.startDate)
    query.set('startDate', searchParamsData.startDate);
  if (searchParamsData.endDate) query.set('endDate', searchParamsData.endDate);
  if (searchParamsData.searchPeriod)
    query.set('searchPeriod', searchParamsData.searchPeriod);
  if (searchParamsData.isOpened && searchParams.isOpened !== 'all')
    query.set('isOpened', searchParamsData.isOpened);
  if (searchParamsData.tutorId) query.set('tutorId', searchParamsData.tutorId);
  if (searchParamsData.title) query.set('title', searchParamsData.title);
  query.set('page', searchParamsData.page || DEFAULT_PAGE);
  query.set('size', searchParamsData.size || DEFAULT_PAGE_SIZE);

  const postListResponse = await serverAPI.get<PostListResponse>(
    `/apis/v1/backoffice/post/search?trackName=${trackName}&period=${period}&${query.toString()}`,
  );

  const periodResponse = await serverAPI.get(
    `/apis/v1/role/track/period?trackName=${trackName}`,
  );

  const periodData = periodResponse?.data.data.trackPeriodList.map(
    (periodNumber: number) => ({
      value: periodNumber.toString(),
      label: `${periodNumber}기`,
      selected: false,
    }),
  );

  return (
    <PostListPage
      searchParams={searchParamsData}
      postListData={postListResponse.data}
      periodData={periodData}
    />
  );
};
export default Post;
