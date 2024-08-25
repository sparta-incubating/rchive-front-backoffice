//체크박스 type
export type AdminDataInfoType = {
  adminId: string;
  username: string;
  trackRole: string;
  period: number;
  email: string;
  createdAt: string;
  auth: string;
};

//권한 조회 리스트 유저 타입
export type AdminListInfoType = {
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
  trackRole: string;
  email: string;
};

export type ApproveItem = Pick<
  USERDATA,
  'trackName' | 'email' | 'trackRole' | 'period'
>;

// export type searchListItem = {
//   trackName: string;
//   period: number;
//   trackRole: string;
//   keyword: string;
//   selectItem: number;
// };

export type RejectionItem = Pick<
  USERDATA,
  'trackName' | 'loginPeriod' | 'trackId'
>;

export interface TapProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export interface FilteredListProps {
  data: AdminDataInfoType[];
}
