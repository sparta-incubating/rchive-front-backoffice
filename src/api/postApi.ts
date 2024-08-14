import {
  postsEndPointFormData,
  TrackType,
  tutorApiType,
} from '@/types/posts.types';
import axiosAPI from '@/utils/axiosAPI';
import { client } from '@/utils/clientAPI';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 태그 검색 함수
export const getTags = async (keyword: string) => {
  try {
    const response = await axiosAPI.get(
      `/apis/v1/posts/tags?tagName=${keyword}`,
    );

    return response.data.data;
  } catch (error) {
    throw new Error('태그를 불러오는데 실패했습니다.');
  }
};

// 태그 저장 함수
export const postTag = async (tagName: string) => {
  try {
    const response = await axiosAPI.post('/apis/v1/posts/tags', {
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
    const response = await axiosAPI.get(
      `/apis/v1/role/track/period?trackName=${track}`,
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

  const accessToken = getCookie('AT');

  try {
    const response = await axiosAPI.post(
      '/apis/v1/s3/thumbnail/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
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
    const response = await axios.get(`/apis/notion/content?url=${pageId}`);

    return response.data.result.replace('"', '');
  } catch (error) {
    throw new Error('notion Page Data호출에 실패했습니다.');
  }
};

// 게시물 등록 endpoint
export const postDataPost = async (
  trackName: string,
  period: number,
  data: postsEndPointFormData,
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
