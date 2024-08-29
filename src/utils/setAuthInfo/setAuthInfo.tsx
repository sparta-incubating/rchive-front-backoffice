'use client';

import { setAuth } from '@/redux/slice/auth.slice';
import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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

  const router = useRouter();
  useEffect(() => {
    const handleAuthError = () => {
      router.push('/backoffice/login');
    };

    window.addEventListener('AUTH_ERROR', handleAuthError);

    return () => {
      window.removeEventListener('AUTH_ERROR', handleAuthError);
    };
  }, [router]);

  return null;
};
export default SetAuthInfo;
