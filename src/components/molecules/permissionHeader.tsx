import { ReactNode } from 'react';
import InquiryButton from '../atoms/inquiryButton';

interface PermissionHeaderProps {
  children: ReactNode;
}

const PermissionHeader = ({ children }: PermissionHeaderProps) => {
  return (
    <section className="flex h-[96px] w-[1084px] items-center justify-between">
      <p className="pt-[20px] text-[28px] font-bold">{children}</p>
      <InquiryButton />
    </section>
  );
};

export default PermissionHeader;
