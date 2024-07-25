import BackOfficeMenuBar from '@/components/organisms/backOfficeMenuBar';
import { PropsWithChildren } from 'react';
const BackOfficeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-[100vh]">
      <BackOfficeMenuBar />
      {children}
    </div>
  );
};

export default BackOfficeLayout;
