import React, { ComponentProps } from 'react';
import FormField from '../Molecules/FormField';
import Button from '../atoms/button';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/lib/utils';

const divVariants = cva('rounded-full', {
  variants: {
    variant: {
      primary: 'border-dashed border-2 border-indigo-600',
      secondary: 'border-double border-4 border-indigo-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface EmailFormProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  label: string;
  htmlFor: string;
  labelProps: ComponentProps<'label'>;
  inputProps: ComponentProps<'input'>;
}

const EmailForm = ({
  label,
  htmlFor,
  labelProps,
  inputProps,
  variant,
  className,
  ...props
}: EmailFormProps) => {
  return (
    <div className={classMerge(divVariants({ variant }), className)}>
      <FormField
        label={label}
        htmlFor={htmlFor}
        labelProps={labelProps}
        inputProps={inputProps}
      />
      <button>버튼</button>
    </div>
  );
};

export default EmailForm;
