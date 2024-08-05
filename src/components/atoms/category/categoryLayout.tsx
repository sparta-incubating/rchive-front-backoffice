import { ReactNode } from 'react';

interface CategoryLayoutProps {
  children: ReactNode;
}

const CategoryLayout = ({ children }: CategoryLayoutProps) => {
  return (
    <div className="space-x flex w-auto w-full flex-row items-center">
      {children}
    </div>
  );
};

export default CategoryLayout;
