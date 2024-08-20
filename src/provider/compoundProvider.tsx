import { auth } from '@/auth';
import { ModalContextProvider } from '@/context/modal.context';
import NextAuthProvider from '@/provider/nextAuthProvider/nextAuthProvider';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import SetAuthInfo from '@/utils/setAuthInfo/setAuthInfo';
import { PropsWithChildren } from 'react';

const CompoundProvider = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  const accessToken = session?.user.accessToken || '';
  const trackName = session?.user.trackName || '';
  const trackRole = session?.user.trackRole || 'USER';
  const period = session?.user.loginPeriod || '';

  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <ModalContextProvider>
          <SetAuthInfo
            accessToken={accessToken}
            trackName={trackName}
            trackRole={trackRole}
            period={String(period)}
          />
          <NextAuthProvider>{children}</NextAuthProvider>
        </ModalContextProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
