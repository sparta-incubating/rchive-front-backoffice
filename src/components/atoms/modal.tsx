import { classMerge } from '@/utils/utils';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  backDropClassName?: string;
  inboardClassName?: string;
}

const Modal = ({
  children,
  backDropClassName,
  inboardClassName,
}: ModalProps) => {
  return (
    <div
      className={classMerge(
        'fixed left-0 top-0 z-50 flex h-screen w-full overflow-y-scroll bg-blue-55 py-6 scrollbar-hide',
        backDropClassName,
      )}
    >
      <div
        className={classMerge(
          `m-auto flex flex-col items-center rounded-xl bg-white`,
          inboardClassName,
        )}
        style={{ width: 'auto', maxWidth: '100%', padding: '1rem' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
