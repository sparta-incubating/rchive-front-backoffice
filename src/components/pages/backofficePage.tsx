import { PropsWithChildren } from 'react';
import BackofficeHeader from '../molecules/backofficeHeader';

const BackofficePage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-grow flex-col bg-blue-55">
      <div className="mx-auto w-[1148px] flex-grow">
        <BackofficeHeader />
        <div className="w-full px-[32px] pt-[24px]">{children}</div>
      </div>
    </div>
  );
};

export default BackofficePage;
