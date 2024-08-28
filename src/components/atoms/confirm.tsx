import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import { useConfirmContext } from '@/context/useConfirmContext';
import { PropsWithChildren } from 'react';

function Confirm({ children }: PropsWithChildren) {
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
      inboardClassName="h-[224px] w-[376px]"
    >
      <div className="m-auto flex flex-col gap-6">
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
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default Confirm;
