'use client';

import { setAuth } from '@/redux/slice/auth.slice';
import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import { useDispatch } from 'react-redux';

interface SetAuthInfoProps {
  accessToken: string;
  trackName: TrackType;
  trackRole: trackRole;
  period: string;
}

const SetAuthInfo = ({
  accessToken,
  trackName,
  trackRole,
  period,
}: SetAuthInfoProps) => {
  const dispatch = useDispatch();
  dispatch(setAuth({ accessToken, trackName, trackRole, period }));

  return null;
};
export default SetAuthInfo;
