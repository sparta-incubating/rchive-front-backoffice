import axiosAPI from '@/utils/axiosAPI';

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
  formData.append('file', file);

  try {
    const response = await axiosAPI.post(
      '/api/v1/s3/thumbnail/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log({ response });
  } catch (error) {
    throw new Error('file 업로드에 실패했습니다.');
  }
};
