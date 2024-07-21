import { ModalContextProvider } from '@/context/modal.context';
import { TagContextProvider } from '@/context/tag.context';
import StoreProvider from '@/provider/reduxProvider/storeProvider';
import { PropsWithChildren } from 'react';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <ModalContextProvider>
        <TagContextProvider>{children}</TagContextProvider>
      </ModalContextProvider>
    </StoreProvider>
  );
};

export default CompoundProvider;
