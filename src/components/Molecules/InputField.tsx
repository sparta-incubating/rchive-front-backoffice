import React, { ComponentProps, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/utils/utils';

const divVariants = cva(
  'group flex flex-col w-[360px] bg-blue-50 rounded-xl text-xs relative',
  {
    variants: {
      variant: {
        primary: 'h-[84px] p-[20px]',
        secondary: 'h-[177px] p-[20px]',
        tertiary: 'h-[246px] px-[20px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface InputFieldProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  className?: string;
}

const InputField = ({
  children,
  variant,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div {...props} className={classMerge(divVariants({ variant }), className)}>
      {children}
    </div>
  );
};

export default InputField;
