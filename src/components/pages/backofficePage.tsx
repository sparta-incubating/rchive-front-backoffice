import BackofficeHeader from '@/components/molecules/backofficeHeader';
import { PropsWithChildren } from 'react';

const BackofficePage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-grow flex-col bg-blue-55">
      <div className="mx-auto flex-grow">
        <BackofficeHeader />
        <div className="h-screen">{children}</div>
      </div>
    </div>
  );
};

export default BackofficePage;
