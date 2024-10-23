'use client';

import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import { useModalContext } from '@/context/useModalContext';

const SignUpCompleteModal = () => {
  const { close } = useModalContext();
  return (
    <Modal inboardClassName="w-[520px] h-[577px]">
      <div className="m-auto w-full">
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <span className="text-xl font-medium">
            회원가입이 완료되었습니다.
          </span>
          <Button variant="primary" className="w-[360px]" onClick={close}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpCompleteModal;
