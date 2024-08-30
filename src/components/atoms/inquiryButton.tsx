import Image from 'next/image';
import { ComponentProps } from 'react';

interface InquiryButtonProps extends ComponentProps<'button'> {}

const InquiryButton = ({ ...props }: InquiryButtonProps) => {
  return (
    <button
      className="rounded-[55px] bg-white p-[13px] shadow-inquiryButton"
      {...props}
    >
      <div className="flex gap-[10px]">
        <div className="relative h-6 w-6">
          <Image
            src="/backoffice/assets/icons/email.svg"
            alt={'문의하기 메일 아이콘'}
            fill
          />
        </div>
        <span className="text-sm font-medium">문의하기</span>
      </div>
    </button>
  );
};

export default InquiryButton;
