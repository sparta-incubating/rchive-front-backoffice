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
    console.log(error);
    throw new Error('프로필 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updatePhone = async (phoneNumber: string) => {
  try {
    const res = await client.patch(`/api/v1/profile/${phoneNumber}`);
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 번호 변경에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updatePassword = async (password: string) => {
  try {
    const res = await client.patch(`/api/v1/profile/${password}`);
    return res.data;
  } catch (error) {
    throw new Error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
  }
};
