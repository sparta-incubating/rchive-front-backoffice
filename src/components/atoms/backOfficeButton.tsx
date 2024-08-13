import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const buttonVariants = cva(
  'rounded-[8px]  h-[37px] text-sm font-medium text-white ',
  {
    variants: {
      variant: {
        success: 'bg-success-green w-[61px] ',
        secondary: 'bg-primary-400 w-[61px]',
        nondisclosure: 'bg-blue-55 w-[72px] text-black font-semibold',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
}
const BackOfficeButton = ({
  children,
  className,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classMerge(buttonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
};

export default BackOfficeButton;
