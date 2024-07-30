import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const modalVariants = cva(
  'fixed top-0 z-50 flex h-screen overflow-y-scroll py-6 scrollbar-hide',
  {
    variants: {
      variant: {
        default: 'left-0 w-full',
        backOffice: 'left-[292px] w-[calc(100%-292px)]',
      },
      bgColor: {
        default: 'bg-blue-55',
        black: 'bg-black/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      bgColor: 'default',
    },
  },
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  children: ReactNode;
  backDropClassName?: string;
  inboardClassName?: string;
}

const Modal = ({
  children,
  backDropClassName,
  inboardClassName,
  variant,
  bgColor,
}: ModalProps) => {
  return (
    <div
      className={classMerge(
        modalVariants({ variant, bgColor }),
        backDropClassName,
      )}
    >
      <div
        className={classMerge(
          'm-auto flex flex-col items-center rounded-xl bg-white',
          inboardClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
