import BackofficeHeader from '@/components/molecules/backofficeHeader';
import { PropsWithChildren } from 'react';

const BackofficePage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full flex-col bg-blue-55">
      <div className="mx-auto">
        <BackofficeHeader />
        {children}
      </div>
    </div>
  );
};

export default BackofficePage;
