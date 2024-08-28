import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva('group flex flex-col w-[360px]', {
  variants: {
    variant: {
      primary: 'h-[46px]',
      secondary: 'w-[320px] h-[100px] mb-[24px] ',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

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
