import BackofficeHeaderTitle from '@/components/atoms/backofficeHeaderTitle';
import InquiryButton from '@/components/atoms/inquiryButton';

const BackofficeHeader = () => {
  return (
    <header className="flex h-[48px] w-full items-center justify-between p-[32px] pt-[48px]">
      <BackofficeHeaderTitle />
      <InquiryButton />
    </header>
  );
};

export default BackofficeHeader;
