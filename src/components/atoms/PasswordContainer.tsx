import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps, PropsWithChildren } from 'react';

const divVariants = cva('flex flex-col rounded-xl border bg-blue-50 p-5', {
  variants: {
    variant: {
      primary: 'h-[177px] w-[360px] ',
      secondary: 'h-[246px] w-[360px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface DivProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {}

const PasswordContainer = ({
  children,
  variant,
  className,
  ...props
}: DivProps) => {
  return (
    <div {...props} className={classMerge(divVariants({ variant }), className)}>
      {children}
    </div>
  );
};

export default PasswordContainer;
