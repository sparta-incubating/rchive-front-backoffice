import { classMerge } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps, ReactNode } from 'react';

const divVariants = cva(
  'border cursor-pointer data-[disabled=true]:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
      },
      size: {},
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface PageDivProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  className?: string;
}

const PageDiv = ({ children, className, variant, ...props }: PageDivProps) => {
  return (
    <div {...props} className={classMerge(divVariants({ variant }), className)}>
      {' '}
      {children}
    </div>
  );
};

export default PageDiv;
