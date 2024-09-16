import { PropsWithChildren } from 'react';

const LayoutWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export default LayoutWrapper;
