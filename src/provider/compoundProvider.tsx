import { PropsWithChildren } from 'react';
import StoreProvider from '@/provider/reduxProvider/storeProvider';

const CompoundProvider = ({ children }: PropsWithChildren) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default CompoundProvider;
