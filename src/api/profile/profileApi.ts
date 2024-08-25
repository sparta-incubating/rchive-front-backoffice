import {
  PassWordChange,
  PhoneChange,
  PhoneInfo,
  ProfileChange,
  RoleChange,
} from '@/types/profile.types';
import { client } from '@/utils/clientAPI';
import { getSession } from 'next-auth/react';

export const getUserInfo = async () => {
  try {
    const session = await getSession();
    const trackName = session?.user.trackName;
    const period = session?.user.loginPeriod;

    const res = await client.get(
      `/apis/v1/profile?trackName=${trackName}&period=${period}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('프로필 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updatePassword = async (password: PassWordChange) => {
  const { originPassword, newPassword } = password;
  // console.log(originPassword, '기존비밀번호');
  // console.log(newPassword, '변경할 비밀번호');
  try {
    const res = await client.patch(`/apis/v1/profile/password`, {
      originPassword,
      newPassword,
    });
    return res.data;
  } catch (error) {
    throw new Error('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updateRole = async (roleInfo: RoleChange) => {
  const { trackName, period: periodInt, trackRole } = roleInfo;

  try {
    const res = await client.post(`/apis/v1/role`, {
      trackName,
      period: Number(periodInt),
      trackRole,
    });
    return res.data;
  } catch (error) {
    throw new Error('권한수정 요청에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updateProfileInfo = async (profileInfo: ProfileChange) => {
  const { profileImg, nickname } = profileInfo;

  try {
    const res = await client.patch(`/apis/v1/profile`, {
      profileImg,
      nickname,
    });
    return res.data;
  } catch (error) {
    throw new Error('프로필 수정에 실패했습니다. 다시 시도해주세요.');
  }
};

//해당트랙 이름의 기수조회
export const getTrackPeriodList = async (trackName: string) => {
  try {
    const res = await client.get(
      `/apis/v1/role/track/period?trackName=${trackName}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('기수 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//휴대폰 인증 전송
export const sendPhoneAuthNumber = async (userInfo: PhoneInfo) => {
  //유저이름 & 바꿀 휴대폰 번호
  const { username, phone } = userInfo;

  try {
    const res = await client.post(`/apis/v1/users/auth/phone/send`, {
      username,
      phone,
    });
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 인증 전송에 실패했습니다. 다시 시도해주세요.');
  }
};

//휴대폰 인증 확인
export const checkPhoneAuth = async (userInfo: PhoneChange) => {
  //유저이름 & 바꿀 휴대폰 번호 & 인증번호
  const { username, phone, authCode } = userInfo;
  try {
    const res = await client.post(`/apis/v1/users/auth/phone/valid`, {
      username,
      phone,
      authCode,
    });
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 번호 변경에 실패했습니다. 다시 시도해주세요.');
  }
};

export const updatePhoneNumber = async (phone: string) => {
  try {
    const res = await client.patch(`/apis/v1/profile/phone`, {
      phone,
    });
    return res.data;
  } catch (error) {
    throw new Error('휴대폰 번호 변경에 실패했습니다. 다시 시도해주세요.');
  }
};
