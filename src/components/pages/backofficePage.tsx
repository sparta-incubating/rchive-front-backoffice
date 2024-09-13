import BackofficeHeader from '@/components/molecules/backofficeHeader';
import { PropsWithChildren } from 'react';

const BackofficePage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-grow flex-col bg-blue-55">
      <div className="mx-auto w-full max-w-[1086px]">
        <BackofficeHeader />
        <div className="mt-[29px]">{children}</div>
      </div>
    </div>
  );
};

export default BackofficePage;
