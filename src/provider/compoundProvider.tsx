import { ModalContextProvider } from '@/context/modalContext';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import { PropsWithChildren } from 'react';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
