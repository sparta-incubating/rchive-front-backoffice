import Image from 'next/image';
import { ComponentProps } from 'react';

interface InquiryButtonProps extends ComponentProps<'button'> {}

const InquiryButton = ({ ...props }: InquiryButtonProps) => {
  return (
    <button
      className="shadow-inquiry Button rounded-[55px] bg-white p-[13px]"
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
