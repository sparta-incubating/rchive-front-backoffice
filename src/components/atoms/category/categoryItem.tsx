import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva(
  'flex h-[100px] w-[160px] flex-col items-center justify-center rounded-[14px] border',
  {
    variants: {
      variant: {
        permission: 'top-[35px]',
        category: 'top-[26px]',
      },
    },
    defaultVariants: {
      variant: 'permission',
    },
  },
);

interface DivProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  className?: string;
}

const CategoryItem = ({ children, className, variant, ...props }: DivProps) => {
  return (
    <div className="flex h-[100px] w-[160px] flex-col items-center justify-center rounded-[14px] border">
      <div
        {...props}
        className={classMerge(divVariants({ variant }), className)}
      >
        {children}
      </div>
    </div>
  );
};

export default CategoryItem;
