import { TagType } from '@/types/tag.types';
import { postsSchema } from '@/validators/posts/posts.validator';
import { z } from 'zod';

export type PostsFormSchema = z.infer<typeof postsSchema>;

export type trackPeriodList = number[];

export type trackPeriodResponse = {
  message: string;
  status: number;
  data: { trackPeriodList: trackPeriodList };
};

export type TutorType = { tutorId: number; tutorName: string };

type TrackType = {
  key: string;
  value: string;
};

export type TractTypeResponse = {
  status: number;
  message: string;
  data: { trackNameList: TrackType[] };
};

type PostType = {
  key: string;
  value: string;
};

export type PostTypeResponse = {
  status: number;
  message: string;
  data: PostType[];
};

export type tutorApiType = {
  data: TutorType[];
  message: string;
  status: number;
};

export type PostResponse = {
  status: number;
  message: string;
  data: postFetchData;
};

export type postFetchData = {
  title: string;
  tutorRes: { tutorId: number; tutorName: string };
  contentLink: string;
  videoLink: string;
  tagNameList: string[];
  uploadedAt: string;
  postType: PostType;
  period: number;
  isOpened: boolean;
  thumbnailUrl: string;
  content: string;
  postId: string;
};

export type SearchParamsType = {
  postType: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  searchPeriod: string | undefined;
  isOpened: string | undefined;
  tutorId: string | undefined;
  page: string | undefined;
  size: string | undefined;
  title: string | undefined;
};

export type PostFilterType = {
  key: number;
  value: string;
};

export type PostListResponse = {
  status: number;
  message: string;
  data: {
    totalPages: number;
    totalElements: number;
    size: number;
    content: PostContentType[];
    number: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    numberOfElements: 7;
    pageable: {
      sort: SortType;
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    empty: boolean;
  };
};

export type PostContentType = {
  postId: number;
  thumbnailUrl: string;
  title: string;
  postType: PostType;
  tutor: string;
  period: number;
  isOpened: boolean;
  uploadedAt: string;
  tagInfoList?: TagType[];
  contentLink?: string;
};

export type SortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type PostTabType = {
  id: string;
  title: string;
};
