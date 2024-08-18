import { client } from '@/utils/clientAPI';
import { getCookie } from 'cookies-next';

export type AdminDataInfoType = {
  username: string;
  trackRole: string;
  period: number;
  email: string;
  createdAt: string;
  auth: string;
};

export type USERDATA = {
  trackName: string;
  period: number;
  trackRole: string;
  email: string;
  loginPeriod: number;
  trackId: number;
};

export type DeleteUserType = {
  trackName: string;
  period: number;
  email: string;
  trackRole: string;
};

type ApproveItem = Pick<
  USERDATA,
  'trackName' | 'email' | 'trackRole' | 'period'
>;
type RejectionItem = Pick<USERDATA, 'trackName' | 'loginPeriod' | 'trackId'>;

//백오피스 - 프로필 조회
export const getBackOfficeInfo = async () => {
  try {
    const res = await client.get(`/apis/v1/backoffice/profile`);

    return res.data;
  } catch (error) {
    throw new Error('백오피스 프로필 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//유저의 트랙 권한 신청 목록 조회
export const getBoardList = async () => {
  const trackName = getCookie('trackName');
  const period = getCookie('period');

  try {
    const res = await client.get(
      `/apis/v1/backoffice/role?sort=DATE_LATELY&trackName=${trackName}&period=${period}&page=1&size=10`,
    );

    return res.data;
  } catch (error) {
    throw new Error('권한 신청 목록 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//유저의 트랙 권한 신청 건수 (전체/대기/승인) -> 탭메뉴 필터
export const getRoleCount = async () => {
  const trackName = getCookie('trackName');
  const period = getCookie('period');

  try {
    const res = await client.get(
      `/apis/v1/backoffice/role/count?trackName=${trackName}&period=${period}`,
    );

    return res.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
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
