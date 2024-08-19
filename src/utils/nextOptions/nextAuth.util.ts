import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import NextAuthOptions from '@/utils/nextOptions/nextAuthOptions';
import { getServerSession } from 'next-auth';

export const serverSession = async () => {
  const session = await getServerSession(NextAuthOptions);

  const period = session?.user.loginPeriod as number;
  const trackName = session?.user.trackName as TrackType;
  const trackRole = session?.user.trackRole as trackRole;
  const trackId = session?.user.trackId as number;
  const accessToken = session?.user.accessToken as string;

  return { period, trackName, trackRole, trackId, accessToken };
};
