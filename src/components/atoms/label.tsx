import React, { ComponentProps, ReactNode } from 'react';
import { classMerge } from '@/utils/utils';

interface LabelProps extends ComponentProps<'label'> {
  children: ReactNode;
  className?: string;
}

const Label = ({ children, className, ...props }: LabelProps) => {
  const baseStyle = 'text-xs mb-[8px] group-focus-within:text-primary-400';
  return (
    <label className={classMerge(baseStyle, className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
