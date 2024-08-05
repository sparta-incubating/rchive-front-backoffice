import { client } from '@/utils/clientAPI';
import { getCookie } from 'cookies-next';

export const getUserInfo = async () => {
  const trackName = getCookie('trackName');
  const period = getCookie('period');

  try {
    const res = await client.get(
      `api/v1/profile?trackName=${trackName}&period=${period}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('프로필 조회에 실패했습니다. 다시 시도해주세요.');
  }
};
