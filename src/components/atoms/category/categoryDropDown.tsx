import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva('absolute left-0 ', {
  variants: {
    variant: {
      permission: 'top-[38px]',
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
        show ? 'z-30 block' : 'hidden',
      )}
    >
      <div
        className={`flex h-auto w-[160px] flex-col items-center overflow-y-scroll rounded-[14px] border bg-white py-2 scrollbar-hide ${
          isClicked ? 'max-h-[64px]' : 'max-h-[120px]'
        }`}
        data-clicked={isClicked}
      >
        {children}
      </div>
    </div>
  );
};

export default CategoryDropDown;
