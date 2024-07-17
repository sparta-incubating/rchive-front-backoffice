import { ReactNode } from 'react';

interface TitleContainerProps {
  title: string;
  children: ReactNode;
}

const TitleContainer = ({ title, children }: TitleContainerProps) => {
  return (
    <div className="relative">
      <div className="flex items-center py-2">
        <span className="text-base font-medium">{title}</span>
      </div>
      {children}
    </div>
  );
};

export default TitleContainer;
