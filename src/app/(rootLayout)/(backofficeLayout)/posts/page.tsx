import CustomError from '@/components/atoms/customError';
import PostListPage from '@/components/pages/postListPage';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/posts.constnat';
import { PostListResponse, SearchParamsType } from '@/types/posts.types';
import NextAuthOptions from '@/utils/nextOptions/nextAuthOptions';
import { createServerAPI } from '@/utils/serverAPI';
import axios from 'axios';
import { getServerSession } from 'next-auth';
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

  const session = await getServerSession(NextAuthOptions);

  const period = session?.user?.loginPeriod;
  const trackName = session?.user?.trackName;
  const serverAPI = await createServerAPI();

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

  try {
    const [postListResponse, periodResponse] = await Promise.all([
      serverAPI.get<PostListResponse>(
        `/apis/v1/backoffice/post/search?trackName=${trackName}&period=${period}&${query.toString()}`,
      ),
      serverAPI.get(`/apis/v1/role/track/period?trackName=${trackName}`),
    ]);

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error?.response?.data;
      console.log(errorData);

      return <CustomError errorData={errorData}></CustomError>;
    }
  }
};

export default Post;
