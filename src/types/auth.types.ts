export type trackRole = 'PM' | 'APM' | 'USER';

export type LastConnectRoleDataType = {
  trackId: number;
  trackRole: trackRole;
  trackName: string;
  period: number;
};
export type LastConnectRoleResponseType = {
  status: number;
  message: string;
  data: LastConnectRoleDataType;
};
