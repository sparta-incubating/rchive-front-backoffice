import IconButton from '@/components/atoms/iconButton';
import { useModalContext } from '@/context/modal.context';

const SignupHeader = () => {
  const { close } = useModalContext();
  return (
    <header className="flex w-full justify-end pb-5">
      <IconButton onClick={close}>
        <div className="relative h-5 w-5">
          <div className="relative flex h-5 w-5 items-center justify-center bg-[url('/assets/icons/close.svg')] bg-center bg-no-repeat"></div>
        </div>
      </IconButton>
    </header>
  );
};

export default SignupHeader;
