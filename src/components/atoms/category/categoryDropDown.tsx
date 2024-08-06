import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva('absolute right-0', {
  variants: {
    variant: {
      permission: 'top-[35px]',
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
}

const CategoryDropDown = ({
  children,
  className,
  variant,
  show,
  isClicked = false,
  ...props
}: DivProps) => {
  return (
    <div
      {...props}
      className={classMerge(
        divVariants({ variant }),
        className,
        show ? 'z-[999] block' : 'hidden',
      )}
    >
      <div
        className={`flex w-[160px] flex-col items-center justify-center rounded-[14px] border bg-white ${
          isClicked ? 'h-[64px]' : 'h-[100px]'
        }`}
        data-clicked={isClicked}
      >
        {children}
      </div>
    </div>
  );
};

export default CategoryDropDown;
