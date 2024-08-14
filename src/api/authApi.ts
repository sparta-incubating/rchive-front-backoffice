import { Admin, User } from '@/class/signup';
import { RoleFormSchema } from '@/types/role.types';
import { emailUniqueResponseType } from '@/types/signup.types';
import axiosAPI from '@/utils/axiosAPI';
import { client } from '@/utils/clientAPI';
import { createServerAPI } from '@/utils/serverAPI';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

export const postSignup = async (userData: User | Admin) => {
  try {
    const response = await axiosAPI.post('/apis/v1/users/signup', userData);
    return response.data;
  } catch (error) {
    console.log({ error });
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

export const getMailCheck = async (email: string) => {
  try {
    const response = await axiosAPI.get<emailUniqueResponseType>(
      `/apis/v1/users/overlap/email?email=${email}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('이메일 중복 확인에 실패했습니다. 다시 시도해주세요.');
  }
};

export const postSignIn = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const res = await client.post('/apis/v1/users/login', {
      username: data.username,
      password: data.password,
    });
    const accessToken = res.headers.authorization.replace('Bearer ', '');
    if (res?.status === 200) {
      setCookie('AT', accessToken);
    }
    return res;
  } catch (error) {
    console.log(error, '로그인 오류');
  }
};

// 마지막 접속 권한 endpoint
export const getLastConnectRole = async () => {
  try {
    await axios.get('/api/auth/lastConnectRole');
  } catch (error) {
    throw new Error('마지막 권환 조회에 실패했습니다.');
  }
};

// 권한 신청 endpoint
export const postRoleApply = async (data: RoleFormSchema) => {
  try {
    const response = await client.post('/apis/v1/role', data);
    return response.data;
  } catch (error) {
    throw new Error('권한 신청에 실패했습니다.');
  }
};

// 권한 신청 여부 조회 endpoint
export const getRoleApplyStatus = async () => {
  try {
    const response = await client.get('/apis/v1/role/request');
    return response.data.data;
  } catch (error) {
    throw new Error('권한 신청 여부 조회에 실패했습니다.');
  }
};

// logout endpoint
export const logout = async () => {
  try {
    const res = await client.delete('/apis/v1/users/logout');
    if (res.data.status === 200) {
      return res.data.status;
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
  }
};

export const serverLogout = async (req: NextRequest) => {
  const res = new NextResponse();
  const accessToken = getCookie('AT', { req, res });
  const serverAPI = createServerAPI(String(accessToken));
  try {
    const res = await serverAPI.delete('/apis/v1/users/logout');
    if (res.data.status === 200) {
      return res.data.status;
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
  }
};

export const postReissue = async () => {
  try {
    const res = await client.post('/apis/v1/users/reissue');

    const accessToken = res.headers.authorization.replace('Bearer ', '');
    if (res?.status === 200) {
      setCookie('AT', accessToken);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
