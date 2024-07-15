import axiosAPI from '@/utils/axiosAPI';

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
