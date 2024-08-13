import { classMerge } from '@/utils/utils';
import { ReactNode } from 'react';

interface SelectLayoutProps {
  children: ReactNode;
  label?: string;
}

const SelectLayout = ({ children, label }: SelectLayoutProps) => {
  const baseStyle = classMerge('flex flex-col', label === '' ? '' : 'gap-2');
  return <div className={baseStyle}>{children}</div>;
};

export default SelectLayout;
