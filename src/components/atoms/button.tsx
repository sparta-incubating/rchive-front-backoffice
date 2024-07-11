'use client';

import { ComponentProps, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/utils/utils';

const buttonVariants = cva(
  'rounded-full border cursor-pointer data-[disabled=true]:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-400 text-white border-primary-400 hover:bg-primary-600 hover:border-primary-600 data-[disabled=true]:bg-primary-100 data-[disabled=true]:border-primary-100',
        secondary:
          'bg-white text-black border-blue-100 hover:bg-blue-55 hover:border-blue-100 data-[disabled=true]:bg-white data-[disabled=true]:border-blue-55 data-[disabled=true]:text-gray-400',
        submit:
          'bg-black text-white border-black hover:text-gray-400 data-[disabled=true]:bg-gray-200 data-[disabled=true]:border-gray-200 data-[disabled=true]:text-white',
      },
      size: {
        lg: 'py-5 w-40',
        sm: 'py-3 px-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  disabled = false,
  className,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      data-disabled={disabled}
      disabled={disabled}
      className={classMerge(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
};

export default Button;
