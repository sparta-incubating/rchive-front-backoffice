import { getPostList, getPostPeriod } from '@/api/server/postsApi';
import { auth } from '@/auth';
import CustomError from '@/components/atoms/customError';
import PostListPage from '@/components/pages/postListPage';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/posts.constnat';
import { SearchParamsType } from '@/types/posts.types';
import axios from 'axios';

export const revalidate = 0;

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

  const session = await auth();

  const period = session?.user?.loginPeriod;
  const trackName = session?.user?.trackName;

  console.log({ period, trackName });

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
    const postListResponse = await getPostList(
      trackName || '',
      Number(period),
      query.toString(),
    );

    const periodResponse = await getPostPeriod(trackName || '');

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
      const data = error?.response?.data;
      const status = error?.response?.status;

      return <CustomError errorData={{ status, data }}></CustomError>;
    }
  }
};

export default Post;
