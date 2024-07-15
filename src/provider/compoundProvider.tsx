import { ModalContextProvider } from '@/context/modal.context';
import { TagContextProvider } from '@/context/tag.context';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import { PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <StoreProvider>
        <ModalContextProvider>
          <TagContextProvider>{children}</TagContextProvider>
        </ModalContextProvider>
      </StoreProvider>
    </AuthProvider>
  );
};

export default CompoundProvider;
