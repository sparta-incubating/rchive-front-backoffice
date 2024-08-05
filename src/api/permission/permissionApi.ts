import { client } from '@/utils/clientAPI';

export const getBoardList = async () => {
  try {
    const res = await client.get(
      '/api/v1/backoffice/role?sort=DATE_LATELY&trackName=UNITY&period=0&trackRole=PM&page=1&size=10',
    );
    return res.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

type USERDATA = {
  trackName: string;
  period: number;
  trackRole: string;
  email: string;
};

//권한수락
export const postUserRole = async () => {
  try {
    const res = await client.post('/api/v1/backoffice/role/approve');
    return res.data;
  } catch (error) {
    throw new Error('권한 수락에 실패했습니다. 다시 시도해주세요.');
  }
};
