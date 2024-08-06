import PostListPage from '@/components/pages/postListPage';
import { SearchParamsType } from '@/types/posts.types';
import React from 'react';

interface PostProps {
  searchParams: SearchParamsType;
}

const Post = ({ searchParams }: PostProps) => {
  const searchParamsData: SearchParamsType = {
    trackName: searchParams.trackName ?? '',
    period: searchParams.period ?? '',
    postType: searchParams.postType ?? '',
    startDate: searchParams.startDate ?? '',
    endDate: searchParams.endDate ?? '',
    searchPeriod: searchParams.searchPeriod ?? '',
    isOpened: searchParams.isOpened ?? '',
    tutorId: searchParams.tutorId ?? '',
    page: searchParams.page ?? '',
    size: searchParams.size ?? '',
    keyword: searchParams.keyword ?? '',
  };

  return <PostListPage searchParams={searchParamsData} />;
};
export default Post;
