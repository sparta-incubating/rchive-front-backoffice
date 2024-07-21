import Toast from '@/components/molecules/toast';
import AuthProvider from '@/provider/AuthProvider';
import CompoundProvider from '@/provider/compoundProvider';

import { PropsWithChildren } from 'react';
/**
 * Root layout component
 * 여기에 Provider를 추가하거나 공통 Component(ex: Header, Footer)를 추가할 수 있습니다.
 *
 * @param{PropsWithChildren} children
 * @constructor
 */
const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <CompoundProvider>
        {children}
        <Toast />
      </CompoundProvider>
    </AuthProvider>
  );
};

export default RootLayout;
