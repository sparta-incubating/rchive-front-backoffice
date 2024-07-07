import { PropsWithChildren } from 'react';

const SelectLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default SelectLayout;
