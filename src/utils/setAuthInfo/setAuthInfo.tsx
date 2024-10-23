'use client';

import { setAuth } from '@/redux/slice/auth.slice';
import { trackRole } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface SetAuthInfoProps {
  accessToken: string;
  trackName: string;
  trackLabel: string;
  trackRole: trackRole;
  period: string;
}

const SetAuthInfo = ({
  accessToken,
  trackName,
  trackLabel,
  trackRole,
  period,
}: SetAuthInfoProps) => {
  const dispatch = useDispatch();
  dispatch(setAuth({ accessToken, trackName, trackLabel, trackRole, period }));

  const router = useRouter();
  useEffect(() => {
    const handleAuthError = () => {
      router.push('/login');
    };

    window.addEventListener('AUTH_ERROR', handleAuthError);

    return () => {
      window.removeEventListener('AUTH_ERROR', handleAuthError);
    };
  }, [router]);

  return null;
};
export default SetAuthInfo;
