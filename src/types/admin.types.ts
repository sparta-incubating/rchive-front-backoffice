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

export type ApproveItem = Pick<
  USERDATA,
  'trackName' | 'email' | 'trackRole' | 'period'
>;
export type RejectionItem = Pick<
  USERDATA,
  'trackName' | 'loginPeriod' | 'trackId'
>;

export interface TapProps {
  onTabChange: (tab: string) => void;
}

export interface FilteredListProps {
  data: AdminDataInfoType[];
}
