import { TrackType } from '@/types/posts.types';

export type trackRole = 'PM' | 'APM' | 'USER';

export type LastConnectRoleDataType = {
  trackId: number;
  trackRole: trackRole;
  trackName: TrackType;
  period: number;
};
export type LastConnectRoleResponseType = {
  status: number;
  message: string;
  data: LastConnectRoleDataType;
};
