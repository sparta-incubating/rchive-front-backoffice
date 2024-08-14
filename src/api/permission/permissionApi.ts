import { client } from '@/utils/clientAPI';

type USERDATA = {
  trackName: string;
  period: number;
  trackRole: string;
  email: string;
  loginPeriod: number;
  trackId: number;
};

type ApproveItem = Pick<
  USERDATA,
  'trackName' | 'email' | 'trackRole' | 'period'
>;
type RejectionItem = Pick<USERDATA, 'trackName' | 'loginPeriod' | 'trackId'>;
type SelectItem = Pick<
  USERDATA,
  'trackId' | 'trackRole' | 'trackName' | 'period'
>;
type OmitSelectItem = Omit<USERDATA, 'trackId' | 'trackRole'>;
type OmitBordList = Omit<USERDATA, 'trackId'>;
//get
//유저의 트랙 권한 신청 목록 조회
export const getBoardList = async (items: OmitBordList) => {
  const { trackName, period, trackRole } = items;
  try {
    const res = await client.get(
      '/apis/v1/backoffice/role?sort=DATE_LATELY&trackName=UNITY&period=0&trackRole=PM&page=1&size=10',
    );
    // const res = await client.get('/apis/v1/backoffice/role', {
    //   sort: 'DATE_LATELY',
    //   trackName,
    //   period,
    //   trackRole,
    //   page: 1,
    //   size: 10,
    // });
    return res.data;
  } catch (error) {
    throw new Error('권한 신청 목록 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//유저의 트랙 권한 신청 건수
export const getRoleCount = async (items: OmitSelectItem) => {
  const { trackName, period } = items;
  try {
    const res = await client.get('/apis/v1/backoffice/role/count', {
      trackName,
      period,
    });
    return res.data;
  } catch (error) {
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

//마지막에 선택한 권한 조회
export const getSelectRole = async (items: SelectItem) => {
  const { trackId, trackRole, trackName, period } = items;
  try {
    const res = await client.get('/apis/v1/backoffice/role/select/last', {
      trackId,
      trackRole,
      trackName,
      period,
    });
    return res.data;
  } catch (error) {
    throw new Error(
      '마지막에 선택한 권한 조회에 실패했습니다. 다시 시도해주세요.',
    );
  }
};

//post
//권한수락
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

export const deleteUsrRole = async (userInfo: RejectionItem) => {
  const { trackName, period, trackRole, email } = userInfo;

  try {
    const res = await client.delete('/apis/v1/backoffice/role/reject', {
      trackName,
      period,
      trackRole,
      email,
    });
    return res.data;
  } catch (error) {
    throw new Error('트랙권한 거절에 실패했습니다. 다시 시도해주세요.');
  }
};
