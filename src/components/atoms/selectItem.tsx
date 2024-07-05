import { ReactNode } from 'react';
import Image from 'next/image';

interface SelectItemProps {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
}

const SelectItem = ({
  children,
  onClick,
  selected = false,
}: SelectItemProps) => {
  return (
    <div
      onClick={onClick}
      className="relative mx-3 flex cursor-pointer justify-between rounded-[12px] px-[14px] py-5 hover:bg-primary-50"
    >
      <span
        data-selected={selected}
        className="data-[selected=false]:text-gray-900 data-[selected=true]:text-primary-400"
      >
        {children}
      </span>

      <div
        data-selected={selected}
        className="right-0 flex h-5 w-5 items-center justify-center data-[selected=true]:absolute data-[selected=false]:hidden"
      >
        <Image
          src={'/assets/icons/redCheck.svg'}
          alt={'select box check'}
          fill
        />
      </div>
    </div>
  );
};

export default SelectItem;
