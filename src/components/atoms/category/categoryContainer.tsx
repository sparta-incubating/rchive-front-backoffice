import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva(
  'relative flex items-center justify-center hover:cursor-pointer px-[10px]',
  {
    variants: {
      variant: {
        secondary: 'rounded-[19px] border-2 blue-100 h-[37px]',
        submit: 'rounded-[16px] border-2 border-blue-100 bg-white h-[28px]',
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
