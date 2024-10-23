import { auth } from '@/auth';
import { ConfirmProvider } from '@/context/ConfirmContext';
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
  const trackLabel = session?.user.trackLabel || '';
  const trackRole = session?.user.trackRole || 'USER';
  const period = String(session?.user.loginPeriod) || '';
  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <ModalContextProvider>
          <ConfirmProvider>
            <SetAuthInfo
              accessToken={accessToken}
              trackName={trackName}
              trackLabel={trackLabel}
              trackRole={trackRole}
              period={String(period)}
            />
            <NextAuthProvider>{children}</NextAuthProvider>
          </ConfirmProvider>
        </ModalContextProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
