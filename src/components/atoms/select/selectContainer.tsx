import { ComponentProps, PropsWithChildren } from 'react';

const SelectContainer = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<'div'>>) => {
  return (
    <div className="relative w-80 rounded-[12px] bg-blue-50 p-5" {...props}>
      {children}
    </div>
  );
};

export default SelectContainer;
