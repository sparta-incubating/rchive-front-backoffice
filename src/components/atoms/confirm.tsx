import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import { useConfirmContext } from '@/context/useConfirmContext';

interface ConfirmProps {
  children: React.ReactNode;
  text: string;
}

function Confirm({ children, text }: ConfirmProps) {
  const { handleResult, backdropClosable } = useConfirmContext();

  const handleBackdrop = () => {
    if (backdropClosable) {
      handleResult(false);
    }
  };

  return (
    <Modal
      bgColor="black"
      variant="backOffice"
      inboardClassName="min-h-[224px] w-[376px] max-h-[248px] "
    >
      <div className="m-auto flex flex-col gap-6 pb-[24px] pt-[48px]">
        <div>{children}</div>
        <div className="flex justify-center gap-2.5">
          <Button
            variant="secondary"
            type="button"
            onClick={() => handleResult(false)}
          >
            취소
          </Button>
          <Button type="button" onClick={() => handleResult(true)}>
            {text}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default Confirm;
