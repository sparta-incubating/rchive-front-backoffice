import { ModalContextProvider } from '@/context/modal.context';
import NextAuthProvider from '@/provider/nextAuthProvider/nextAuthProvider';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { serverSession } from '@/utils/nextOptions/nextAuth.util';
import SetAuthInfo from '@/utils/setAuthInfo/setAuthInfo';
import { PropsWithChildren } from 'react';

const CompoundProvider = async ({ children }: PropsWithChildren) => {
  const { trackRole, trackName, period, accessToken } = await serverSession();

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
