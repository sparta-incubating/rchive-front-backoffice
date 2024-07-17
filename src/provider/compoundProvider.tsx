import { ModalContextProvider } from '@/context/modal.context';
import { TagContextProvider } from '@/context/tag.context';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <StoreProvider>
        <SessionProvider>
          <ModalContextProvider>
            <TagContextProvider>{children}</TagContextProvider>
          </ModalContextProvider>
        </SessionProvider>
      </StoreProvider>
    </AuthProvider>
  );
};

export default CompoundProvider;
