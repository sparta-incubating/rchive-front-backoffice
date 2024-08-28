import { PostForm } from '@/class/postForm';
import { TrackType, tutorApiType } from '@/types/posts.types';
import { client } from '@/utils/clientAPI';
import { createToast } from '@/utils/toast';
import axios from 'axios';

// 태그 검색 함수
export const getTags = async (keyword: string) => {
  try {
    const response = await client.get(`/apis/v1/posts/tags?tagName=${keyword}`);

    return response.data.data;
  } catch (error) {
    throw new Error('태그를 불러오는데 실패했습니다.');
  }
};

// 태그 저장 함수
export const postTag = async (tagName: string) => {
  try {
    const response = await client.post('/apis/v1/posts/tags', {
      tagName,
    });
    return response.data;
  } catch (error) {
    throw new Error('태그 저장에 실패했습니다.');
  }
};

// 기수 검색 함수
export const getPeriod = async <T>(track: string): Promise<T> => {
  try {
    const response = await client.get(
      `/apis/v1/role/track/period?trackName=${track}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const periodResponseData = response?.data.data.trackPeriodList;

    return periodResponseData.map((periodNumber: number) => ({
      value: periodNumber.toString(),
      label: `${periodNumber}기`,
      selected: false,
    }));
  } catch (error) {
    throw new Error('기수 호출에 실패했습니다.');
  }
};

// Thumbnail upload
export const postThumbnailUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('thumbnail', file);

  try {
    const response = await client.post(
      '/apis/v1/s3/thumbnail/upload',
      formData,
    );
    return response.data;
  } catch (error) {
    throw new Error('파일 업로드에 실패했습니다.');
  }
};

// Thumbnail delete
export const getThumbnailDelete = async (thumbnailUrl: string) => {
  try {
    return await client.get(
      `/apis/v1/s3/thumbnail/delete?thumbnailUrl=${thumbnailUrl}`,
    );
  } catch (error) {
    throw new Error('파일 삭제에 실패했습니다.');
  }
};

// 튜터 검색
export const getSearchTutor = async (
  track: TrackType,
  loginPeriod: number,
  inputPeriod: number,
  keyword: string,
): Promise<tutorApiType> => {
  try {
    const response = await client.get<tutorApiType>(
      `/apis/v1/posts/tutors?trackName=${track}&loginPeriod=${loginPeriod}&inputPeriod=${inputPeriod}&tutorName=${keyword}`,
    );

    return response.data;
  } catch (error) {
    throw new Error('태그를 불러오는데 실패했습니다.');
  }
};

// notion 게시물 데이터 가져오기
export const getNotionPageData = async (pageId: string) => {
  try {
    const response = await axios.get(`/api/notion/content?url=${pageId}`);

    return response.data.result.replace('"', '');
  } catch (error) {
    throw new Error('notion Page Data호출에 실패했습니다.');
  }
};

// 게시물 등록 endpoint
export const postDataPost = async (
  trackName: string,
  period: number,
  data: PostForm,
) => {
  try {
    const response = await client.post(
      `/apis/v1/posts?trackName=${trackName}&loginPeriod=${period}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw new Error('게시물 등록에 실패했습니다.');
  }
};

// 게시물 수정 endpoint
export const patchDataPost = async (
  trackName: string,
  period: number,
  data: PostForm,
  postId: number,
) => {
  try {
    const response = await client.patch(
      `/apis/v1/posts/${postId}?trackName=${trackName}&loginPeriod=${period}`,
      data,
    );

    return response.data;
  } catch (error) {
    throw new Error('게시물 수정에 실패했습니다.');
  }
};

// 게시물 공개 endpoint
export const patchPostOpen = async (
  trackName: string,
  loginPeriod: string,
  postIds: number[],
) => {
  try {
    const response = await client.patch(
      `/apis/v1/posts/open?trackName=${trackName}&loginPeriod=${loginPeriod}`,
      {
        postIdList: postIds,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('게시물 공개에 실패했습니다.');
  }
};

// 게시물 비공개 endpoint
export const patchPostClose = async (
  trackName: string,
  loginPeriod: string,
  postIds: number[],
) => {
  try {
    const response = await client.patch(
      `/apis/v1/posts/close?trackName=${trackName}&loginPeriod=${loginPeriod}`,
      {
        postIdList: postIds,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('게시물 비공개에 실패했습니다.');
  }
};

// 게시물 삭제 endpoiont
export const deletePost = async (
  trackName: TrackType,
  loginPeriod: number,
  postId: string,
) => {
  try {
    const response = await client.delete(
      `/apis/v1/posts/${postId}?trackName=${trackName}&loginPeriod=${loginPeriod}`,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error?.response?.data;
      createToast(data.message, 'warning');
      console.error(data.message);
    }
  }
};
