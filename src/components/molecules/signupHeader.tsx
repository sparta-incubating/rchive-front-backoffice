import IconButton from '@/components/atoms/iconButton';

const SignupHeader = () => {
  return (
    <header className="flex w-full justify-between px-7 pb-5 pt-7">
      <IconButton>
        <div className="flex items-center justify-center gap-1.5">
          <div className="relative flex h-5 w-5 items-center justify-center bg-[url('/assets/icons/prevArrow.svg')] bg-center bg-no-repeat"></div>
          <span className="text-md font-semibold text-gray-900">뒤로</span>
        </div>
      </IconButton>
      <IconButton>
        <div className="relative h-5 w-5">
          <div className="relative flex h-5 w-5 items-center justify-center bg-[url('/assets/icons/close.svg')] bg-center bg-no-repeat"></div>
        </div>
      </IconButton>
    </header>
  );
};

export default SignupHeader;
