import { ReactNode } from 'react';
import { classMerge } from '@/utils/utils';

interface ModalProps {
  children: ReactNode;
  inboardClassName?: string;
}

const Modal = ({ children, inboardClassName }: ModalProps) => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen overflow-y-scroll bg-blue-55 py-6">
      <div
        className={classMerge(
          `mx-auto flex h-[1317px] w-[408px] flex-col items-center rounded-xl bg-white`,
          inboardClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
