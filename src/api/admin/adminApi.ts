import { ADMIN_DEFAULT_PAGE_SIZE } from '@/constants/admin.constant';
import {
  ApproveItem,
  DeleteUserType,
  FilterParams,
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

export const getBoardList = async (filters: FilterParams) => {
  const session = await getSession();
  const trackName = session?.user.trackName;
  const loginPeriod = session?.user.loginPeriod;

  const params = {
    sort: filters.sort || 'DATE_LATELY',
    trackName,
    loginPeriod,
    status: filters.status || undefined,
    searchPeriod: filters.searchPeriod || undefined,
    searchKeyword: filters.keyword || undefined,
    searchTrackRole: filters.trackRole || undefined,
    page: filters.page,
    size: ADMIN_DEFAULT_PAGE_SIZE,
  };

  try {
    const res = await client.get('/apis/v1/backoffice/role', { params });
    return res.data;
  } catch (error) {
    throw new Error('권한 신청 목록 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//유저의 트랙 권한 신청 건수 (전체/대기/승인) -> 탭메뉴 필터
export const getRoleCount = async () => {
  try {
    const session = await getSession();
    const trackName = session?.user.trackName;
    const loginPeriod = session?.user.loginPeriod;

    const res = await client.get(
      `/apis/v1/backoffice/role/count?trackName=${trackName}&loginPeriod=${loginPeriod}`,
    );

    return res.data;
  } catch (error) {
    throw new Error(
      '유저의 트랙 권한 신청 건수 조회에 실패했습니다. 다시 시도해주세요.',
    );
  }
};

//권한수락
export const postUserApprove = async (userInfo: ApproveItem) => {
  const { trackName, period, trackRole, email } = userInfo;
  try {
    const res = await client.post('/apis/v1/backoffice/role/approve', [
      {
        trackName,
        period,
        trackRole,
        email,
      },
    ]);
    return res.data;
  } catch (error) {
    throw new Error('권한 수락에 실패했습니다. 다시 시도해주세요.');
  }
};

//권한 거절
export const deleteUsrRole = async (userInfo: DeleteUserType) => {
  // const { trackName, period, trackRole, email } = userInfo;
  const params = [userInfo];
  try {
    const res = await client.delete('/apis/v1/backoffice/role/reject', {
      data: params,
    });
    return res.data;
  } catch (error) {
    throw new Error('권한 수락에 실패했습니다. 다시 시도해주세요.');
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

//3개월 후 해당 트랙 권한 수락/거절 - 현재는 사용하지않는 api
export const patchUserPermission = async (userInfo: RejectionItem) => {
  const { trackName, loginPeriod, trackId } = userInfo;

  try {
    const res = await client.patch('/apis/v1/backoffice/track/permission', [
      {
        trackName,
        loginPeriod,
        trackId,
      },
    ]);
    return res.data;
  } catch (error) {
    throw new Error('권한 승인에 실패했습니다. 다시 시도해주세요.');
  }
};

export const patchUserRejection = async (userInfo: RejectionItem) => {
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
