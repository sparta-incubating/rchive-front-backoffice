import { ComponentProps, ReactNode } from 'react';

interface SelectLabelProps extends ComponentProps<'label'> {
  children: ReactNode;
}

const SelectLabel = ({ children, ...props }: SelectLabelProps) => {
  return (
    <label className="text-sm font-normal text-gray-900" {...props}>
      {children}
    </label>
  );
};

export default SelectLabel;
