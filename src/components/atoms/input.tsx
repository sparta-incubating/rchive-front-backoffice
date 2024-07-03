import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

const Input = ({ ...props }: InputProps) => {
  return <input {...props} />;
};

export default Input;
