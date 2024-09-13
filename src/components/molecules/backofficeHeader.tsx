import BackofficeHeaderTitle from '@/components/atoms/backofficeHeaderTitle';
import InquiryButton from '@/components/atoms/inquiryButton';

const BackofficeHeader = () => {
  return (
    <header className="mx-auto mt-12 flex w-[1086px] w-full items-center justify-between">
      <BackofficeHeaderTitle />
      <InquiryButton />
    </header>
  );
};

export default BackofficeHeader;
