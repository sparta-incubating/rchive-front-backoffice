import { RoleFormSchema } from '@/types/role.types';
import axiosInstance from '@/utils/axiosAPI';
import { client } from '@/utils/clientAPI';

// 권한 신청 endpoint
export const postRoleApply = async (data: RoleFormSchema) => {
  try {
    const response = await client.post('/apis/v1/role', data);
    return response.data;
  } catch (error) {
    throw new Error('권한 신청에 실패했습니다.');
  }
};

// 마지막 접속 정보 endpoint
export const getLastConnectRole = async (accessToken: string) => {
  return await axiosInstance.get('/apis/v1/role/select/last', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// 권한 신청 여부 조회 endpoint
export const getRoleApplyStatus = async (accessToken: string) => {
  return await axiosInstance.get('/apis/v1/role/request', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const login = async (
  username: string | undefined,
  password: string | undefined,
) => {
  return await axiosInstance.post('/apis/v1/users/login', {
    username,
    password,
  });
};

export const logout = async (accessToken: string) => {
  await axiosInstance.delete('/apis/v1/users/logout', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const refreshToken = async (refreshToken: string) => {
  return await axiosInstance.post(
    '/apis/v1/users/reissue',
    {},
    {
      headers: {
        Cookie: `Refresh=${refreshToken}`,
      },
    },
  );
};
