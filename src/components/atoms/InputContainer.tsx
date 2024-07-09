import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';

const divVariants = cva(' w-[360px]', {
  variants: {
    variant: {
      primary: 'h-[108px] ',
      secondary: 'h-[205px] ',
      tertiary: 'h-[274px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface DivProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {}

const InputContainer = ({
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

export default InputContainer;
