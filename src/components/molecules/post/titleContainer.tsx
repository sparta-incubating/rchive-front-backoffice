import { classMerge } from '@/utils/utils';
import { ReactNode } from 'react';

interface TitleContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const TitleContainer = ({
  title,
  children,
  className,
}: TitleContainerProps) => {
  return (
    <div className={classMerge('relative', className)}>
      <div className="flex items-center py-2">
        <span className="text-base font-medium">{title}</span>
      </div>
      {children}
    </div>
  );
};

export default TitleContainer;
