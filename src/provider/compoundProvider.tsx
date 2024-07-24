import { ModalContextProvider } from '@/context/modal.context';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { PropsWithChildren } from 'react';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
