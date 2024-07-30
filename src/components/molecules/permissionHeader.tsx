import InquiryButton from '../atoms/inquiryButton';

const PermissionHeader = () => {
  return (
    <section className="flex h-[96px] w-[1084px] items-center justify-between">
      <p className="pt-[20px] text-[28px] font-bold">권한 설정</p>
      <InquiryButton />
    </section>
  );
};

export default PermissionHeader;
