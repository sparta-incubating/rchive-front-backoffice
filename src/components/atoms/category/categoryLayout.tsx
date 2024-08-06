import { classMerge } from '@/utils/utils';
import { ReactNode } from 'react';

interface CategoryLayoutProps {
  children: ReactNode;
}

const CategoryLayout = ({ children }: CategoryLayoutProps) => {
  const baseStyle = classMerge('flex flex-row space-x-2 ');
  return <div className={baseStyle}>{children}</div>;
};

export default CategoryLayout;
