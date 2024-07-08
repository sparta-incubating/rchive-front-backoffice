import React, { ComponentProps, ReactNode } from 'react';

interface LabelProps extends ComponentProps<'label'> {
  children: ReactNode;
}

const Label = ({ children, ...props }: LabelProps) => {
  return <label {...props}>{children}</label>;
};

export default Label;
