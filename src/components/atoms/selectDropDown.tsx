import { ReactNode } from 'react';

interface SelectDropDownProps {
  clicked: boolean;
  children: ReactNode;
}

const SelectDropDown = ({ clicked, children }: SelectDropDownProps) => {
  return (
    <div
      data-clicked={clicked}
      className="transition-height absolute bottom-0 left-0 z-20 h-[100vh] w-full translate-y-full rounded-[12px] bg-white shadow-selectBox duration-500 ease-in-out scrollbar-hide data-[clicked=false]:max-h-0 data-[clicked=true]:max-h-72 data-[clicked=false]:overflow-hidden data-[clicked=true]:overflow-y-scroll data-[clicked=true]:py-[14px]"
    >
      {children}
    </div>
  );
};

export default SelectDropDown;
