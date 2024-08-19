import {
  ApproveItem,
  DeleteUserType,
  RejectionItem,
} from '@/types/admin.types';
import { client } from '@/utils/clientAPI';
import { getSession } from 'next-auth/react';

//백오피스 - 프로필 조회
export const getBackOfficeInfo = async () => {
  try {
    const res = await client.get(`/apis/v1/backoffice/profile`);
    return res.data;
  } catch (error) {
    throw new Error('백오피스 프로필 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

export const getBoardList = async (filters: Record<string, string>) => {
  const session = await getSession();
  const trackName = session?.user.trackName;
  const period = session?.user.loginPeriod;

  const params = {
    sort: filters.sort || 'DATE_LATELY',
    trackName,
    period,
    searchPeriod: filters.searchPeriod || undefined,
    email: filters.email || undefined,
    page: '1',
    size: '10',
    trackRole: filters.trackRole || undefined,
  };

  try {
    const res = await client.get('/apis/v1/backoffice/role', { params });
    return res.data;
  } catch (error) {
    throw new Error('권한 신청 목록 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//이메일로 유저 검색
// /apis/v1/backoffice/role?sort=DATE_LATELY&trackName=ANDROID&period=0&email=nodejs_apm%40test.com&page=1&size=10

//유저의 트랙 권한 신청 건수 (전체/대기/승인) -> 탭메뉴 필터
export const getRoleCount = async () => {
  try {
    const session = await getSession();
    const trackName = session?.user.trackName;
    const period = session?.user.loginPeriod;

    const res = await client.get(
      `/apis/v1/backoffice/role/count?trackName=${trackName}&period=${period}`,
    );

    return res.data;
  } catch (error) {
    throw new Error(
      '유저의 트랙 권한 신청 건수 조회에 실패했습니다. 다시 시도해주세요.',
    );
  }
};

//권한수락(Post)
//유저의 트랙 권한 수락 (PM일 때)
export const postUserApprove = async (userInfo: ApproveItem) => {
  //예시
  // const userInfo = {
  //   trackName: 'ANDROID',
  //   period: 0,
  //   trackRole: 'STUDENT',
  //   email: 'string',
  // };

  const { trackName, period, trackRole, email } = userInfo;
  try {
    const res = await client.post('/apis/v1/backoffice/role/approve', {
      trackName,
      period,
      trackRole,
      email,
    });
    return res.data;
  } catch (error) {
    throw new Error('권한 수락에 실패했습니다. 다시 시도해주세요.');
  }
};

//일반 유저의 트랙 권한 수락 (APM일 때)
export const patchUserPermission = async (userInfo: RejectionItem) => {
  const { trackName, loginPeriod, trackId } = userInfo;

  try {
    const res = await client.patch('/apis/v1/backoffice/track/permission', {
      trackName,
      loginPeriod,
      trackId,
    });
    return res.data;
  } catch (error) {
    throw new Error('권한 승인에 실패했습니다. 다시 시도해주세요.');
  }
};

//권한 거절
//유저의 트랙 권한 거절 - PM일
export const deleteUsrRole = async (userInfo: DeleteUserType) => {
  const { trackName, period, trackRole, email } = userInfo;

  try {
    const res = await client.delete('/apis/v1/backoffice/role/reject', {
      params: {
        trackName,
        period,
        trackRole,
        email,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('트랙권한 거절에 실패했습니다. 다시 시도해주세요.');
  }
};

//트랙의 일반 유저 열람 권한 거절 - APM일 때
export const patchUserRejection = async (userInfo: RejectionItem) => {
  //예시
  // const userInfo = {
  // trackName:'ANDROID',
  // loginPeriod: 1,
  // trackId:11
  // };
  const { trackName, loginPeriod, trackId } = userInfo;

  try {
    const res = await client.patch('/apis/v1/backoffice/track/rejection', {
      trackName,
      loginPeriod,
      trackId,
    });
    return res.data;
  } catch (error) {
    throw new Error('권한 거절에 실패했습니다. 다시 시도해주세요.');
  }
};

//마지막에 선택한 권한 조회
export const getSelectRole = async () => {
  try {
    const res = await client.get('/apis/v1/backoffice/role/select/last');
    return res.data;
  } catch (error) {
    throw new Error(
      '마지막에 선택한 권한 조회에 실패했습니다. 다시 시도해주세요.',
    );
  }
};
