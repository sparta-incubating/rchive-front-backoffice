import { TutorType } from '@/types/posts.types';
import axiosAPI from '@/utils/axiosAPI';
import { client } from '@/utils/clientAPI';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 태그 검색 함수
export const getTags = async (keyword: string) => {
  try {
    const response = await axiosAPI.get(
      `/api/v1/posts/tags?tagName=${keyword}`,
    );

    return response.data.data;
  } catch (error) {
    throw new Error('태그를 불러오는데 실패했습니다.');
  }
};

// 태그 저장 함수
export const postTag = async (tagName: string) => {
  try {
    const response = await axiosAPI.post('/api/v1/posts/tags', {
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
      `/api/v1/role/track/period?trackName=${track}`,
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
      '/api/v1/s3/thumbnail/upload',
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
    const response = await client.get(
      `http://15.165.242.59:8080/api/v1/s3/thumnail/delete?thumbnailUrl=${thumbnailUrl}`,
    );
    console.log({ response });
    return response;
  } catch (error) {
    throw new Error('파일 삭제에 실패했습니다.');
  }
};

// 튜터 검색
export const getSearchTutor = async (keyword: string): Promise<TutorType[]> => {
  return await new Promise((resolve) => {
    resolve([
      { tutorId: 1, tutorName: 'test' },
      { tutorId: 2, tutorName: '테스트' },
      { tutorId: 3, tutorName: '김테스' },
      { tutorId: 4, tutorName: '김스트' },
    ]);
  });
  /*try {
    const response = await axiosAPI.get(
      `/api/v1/posts/tags?tagName=${keyword}`,
    );

    return response.data.data;
  } catch (error) {
    throw new Error('태그를 불러오는데 실패했습니다.');
  }*/
};

// notion 게시물 데이터 가져오기
export const getNotionPageData = async (pageId: string) => {
  try {
    const response = await axios.get(`/api/notion/content?url=${pageId}`);

    console.log(response.data.result);

    return response.data;
  } catch (error) {
    throw new Error('notion Page Data호출에 실패했습니다.');
  }
};
