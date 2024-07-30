import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva('absolute right-0 ', {
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
}

const CategoryDropDown = ({
  children,
  className,
  variant,
  show,
  ...props
}: DivProps) => {
  return (
    <div
      {...props}
      className={classMerge(
        divVariants({ variant }),
        className,
        show ? 'block' : 'hidden',
      )}
    >
      <div className="flex h-[100px] w-[160px] flex-col items-center justify-center rounded-[14px] border">
        {children}
      </div>
    </div>
  );
};

export default CategoryDropDown;
