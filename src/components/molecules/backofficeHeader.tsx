import BackofficeHeaderTitle from '@/components/atoms/backofficeHeaderTitle';
import InquiryButton from '@/components/atoms/inquiryButton';

const BackofficeHeader = () => {
  return (
    <header className="mt-12 flex items-center justify-between px-24">
      <BackofficeHeaderTitle />
      <InquiryButton />
    </header>
  );
};

export default BackofficeHeader;
