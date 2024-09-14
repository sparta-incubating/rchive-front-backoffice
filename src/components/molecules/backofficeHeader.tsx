import BackofficeHeaderTitle from '@/components/atoms/backofficeHeaderTitle';
import InquiryButton from '@/components/atoms/inquiryButton';

const BackofficeHeader = () => {
  return (
    <header className="mx-auto mb-[29px] mt-12 flex w-full max-w-[1102px] items-center justify-between">
      <BackofficeHeaderTitle />
      <InquiryButton />
    </header>
  );
};

export default BackofficeHeader;
