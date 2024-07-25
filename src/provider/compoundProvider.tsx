import { ModalContextProvider } from '@/context/modal.context';
import { TagContextProvider } from '@/context/tag.context';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import TanstackQueryProvider from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { PropsWithChildren } from 'react';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <TanstackQueryProvider>
        <ModalContextProvider>
          <TagContextProvider>{children}</TagContextProvider>
        </ModalContextProvider>
      </TanstackQueryProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
