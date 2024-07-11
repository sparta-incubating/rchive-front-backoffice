import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';

const divVariants = cva('flex items-center bg-blue-50 ', {
  variants: {
    variant: {
      primary: 'h-[84px] w-[360px] p-5 rounded-xl',
      secondary: 'h-[68px] w-[320px]',
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
