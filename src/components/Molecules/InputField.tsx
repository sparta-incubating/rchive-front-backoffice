import React, { ComponentProps } from 'react';
import Label from '../atoms/label';
import Input from '../atoms/input';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/lib/utils';

const divVariants = cva('border w-[230px] h-[46px] data-[hover=true] ', {
  variants: {
    variant: {
      primary: '',
      // primary:'border-dashed border-2 border-indigo-600',
      // secondary:'border-double border-4 border-indigo-600'
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface InputFieldProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  label: string;
  htmlFor: string;
  labelProps: ComponentProps<'label'>;
  inputProps: ComponentProps<'input'>;
}

const InputField = ({
  label,
  htmlFor,
  labelProps,
  inputProps,
  variant,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div {...props} className={classMerge(divVariants({ variant }), className)}>
      <Label htmlFor={htmlFor} {...labelProps}>
        {label}
      </Label>
      <Input {...inputProps} className="peer focus:outline-none" />
    </div>
  );
};

export default InputField;
