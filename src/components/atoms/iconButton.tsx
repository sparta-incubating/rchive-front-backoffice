import { ComponentProps, ReactNode } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const IconButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="flex h-auto w-auto items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
