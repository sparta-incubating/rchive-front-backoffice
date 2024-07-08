import React, { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <input {...props} ref={ref} />;
  },
);

export default Input;
