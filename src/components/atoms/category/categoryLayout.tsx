import { classMerge } from '@/utils/utils';
import { ComponentProps, ReactNode } from 'react';

interface CategoryLayoutProps extends ComponentProps<'div'> {
  children: ReactNode;
}

const CategoryLayout = ({ children, ...props }: CategoryLayoutProps) => {
  const baseStyle = classMerge('flex flex-row space-x-2 ');
  return (
    <div className={baseStyle} {...props}>
      {children}
    </div>
  );
};

export default CategoryLayout;
