import { ReactNode } from 'react';

interface SelectItemProps {
  children: ReactNode;
  onClick: () => void;
}

const SelectItem = ({ children, onClick }: SelectItemProps) => {
  return (
    <div
      onClick={onClick}
      className="mx-3 flex cursor-pointer justify-between rounded-[12px] px-[14px] py-5 hover:bg-primary-50"
    >
      <span>{children}</span>
    </div>
  );
};

export default SelectItem;
