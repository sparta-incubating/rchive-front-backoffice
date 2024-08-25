import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva('absolute left-0 h-auto', {
  variants: {
    variant: {
      permission: 'top-[32px]',
      category: 'top-[26px]',
    },
  },
  defaultVariants: {
    variant: 'permission',
  },
});

interface DivProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  className?: string;
  show: boolean;
  isClicked?: boolean;
  isLargeSize?: boolean;
}

const AdminIsOpenDropDown = ({
  children,
  className,
  variant,
  show,
  isClicked = false,
  isLargeSize = false,
  ...props
}: DivProps) => {
  return (
    <div
      {...props}
      className={`absolute left-0 top-[32px] h-auto ${show ? 'z-30 block' : 'hidden'}`}
    >
      <div
        className={`flex w-[160px] flex-col items-center justify-center overflow-y-auto rounded-[14px] bg-white shadow-dropDownBox ${
          isLargeSize ? 'h-[100px]' : 'h-[64px]'
        }`}
        data-clicked={isClicked}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminIsOpenDropDown;
