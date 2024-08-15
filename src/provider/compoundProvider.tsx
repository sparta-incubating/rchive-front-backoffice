import { ModalContextProvider } from '@/context/modal.context';
import NextAuthProvider from '@/provider/nextAuthProvider/nextAuthProvider';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import SetAuthInfo from '@/utils/setAuthInfo/setAuthInfo';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  const accessToken = String(getCookie('AT', { cookies }));
  const trackName = String(getCookie('trackName', { cookies })) as TrackType;
  const trackRole = String(getCookie('trackRole', { cookies })) as trackRole;
  const period = String(getCookie('period', { cookies }));

  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <ModalContextProvider>
          <SetAuthInfo
            accessToken={accessToken}
            trackName={trackName}
            trackRole={trackRole}
            period={period}
          />
          <NextAuthProvider>{children}</NextAuthProvider>
        </ModalContextProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
