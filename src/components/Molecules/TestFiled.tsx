import React, { ComponentProps } from 'react';
import Label from '../atoms/label';
import Input from '../atoms/input';
import { cva, VariantProps } from 'class-variance-authority';
import { classMerge } from '@/lib/utils';

/**기존 코드*/
const inputVariants = cva('peer focus:outline-none bg-blue-50', {
  variants: {
    variant: {
      primary: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface InputFieldProps
  extends ComponentProps<'div'>,
    VariantProps<typeof inputVariants> {
  label: string;
  labelProps: ComponentProps<'label'>;
  inputProps: ComponentProps<'input'>;
}

const InputField = ({
  label,
  labelProps,
  inputProps,
  variant,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div {...props} className="h-[46px] w-[230px]">
      <Label {...labelProps}>{label}</Label>
      <Input
        {...inputProps}
        className={classMerge(inputVariants({ variant }), className)}
      />
    </div>
  );
};

export default InputField;
