import { classMerge } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps, ReactNode } from 'react';

const containerVariants = cva(' border rounded-[12px] w-[360px] h-[84px]  ', {
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
});

interface ContainerProps
  extends ComponentProps<'div'>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
  className?: string;
}

const Container = ({
  children,
  className,
  variant,
  ...props
}: ContainerProps) => {
  return (
    <div
      {...props}
      className={classMerge(containerVariants({ variant }), className)}
    >
      {children}
    </div>
  );
};

export default Container;
