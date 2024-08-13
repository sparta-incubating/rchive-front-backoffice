import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva(
  'relative flex items-center justify-center hover:cursor-pointer ',
  {
    variants: {
      variant: {
        secondary:
          'rounded-[19px] border blue-100 w-auto min-w-[69px] h-[39px] px-2.5',
        submit:
          'rounded-[16px] border border-blue-100 bg-white w-auto min-w-[69px] h-[39px]',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  },
);

interface CategoryContainerProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  className?: string;
}

const CategoryContainer = ({
  children,
  className,
  variant,
  ...props
}: CategoryContainerProps) => {
  return (
    <div className={classMerge(divVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};

export default CategoryContainer;
