import { classMerge } from '@/utils/utils';
import { ComponentProps, ReactNode } from 'react';

interface SelectContainerProps extends ComponentProps<'div'> {
  children: ReactNode;
  className?: string;
}

const SelectContainer = ({
  children,
  className,
  ...props
}: SelectContainerProps) => {
  const baseStyle = classMerge(
    'relative w-80 rounded-[12px] bg-blue-50 p-5',
    className,
  );
  return (
    <div className={baseStyle} {...props}>
      {children}
    </div>
  );
};

export default SelectContainer;
