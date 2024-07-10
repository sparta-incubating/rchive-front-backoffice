import React, { ComponentProps } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/utils/utils';

const FormSpanVariants = cva('text-sm text-primary-400', {
  variants: {
    variant: {
      success: 'text-success-green',
      error: 'text-primary-400',
      default: 'text-gray-300',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface SpanProps
  extends ComponentProps<'span'>,
    VariantProps<typeof FormSpanVariants> {
  children: string;
  className?: string;
}

const FormSpan = ({ children, variant, className, ...props }: SpanProps) => {
  return (
    <>
      <span className="text-success-green"></span>
      <span
        {...props}
        className={classMerge(FormSpanVariants({ variant }), className)}
      >
        {children}
      </span>
    </>
  );
};

export default FormSpan;
