import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva('', {
  variants: {
    variant: {
      secondary: 'rounded-[16px] border-2 blue-100 w-[79px] h-[37px]',
      submit:
        'rounded-[19px] border-2 border-blue-100 bg-white w-[81px] h-[28px]',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
});

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
