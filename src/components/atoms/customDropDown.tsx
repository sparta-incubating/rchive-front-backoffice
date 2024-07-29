import React, { ReactNode } from 'react';

interface SelectDropDownProps {
  clicked: boolean;
  children: ReactNode;
}

const CustomDropDown = React.forwardRef<HTMLDivElement, SelectDropDownProps>(
  ({ clicked, children }, ref) => {
    return (
      <div
        ref={ref}
        data-clicked={clicked}
        className="transition-height absolute bottom-0 left-0 z-30 h-auto w-full translate-y-full rounded-[12px] bg-white shadow-selectBox duration-500 ease-in-out scrollbar-hide data-[clicked=false]:max-h-0 data-[clicked=true]:max-h-72 data-[clicked=false]:overflow-hidden data-[clicked=true]:overflow-y-scroll data-[clicked=true]:py-[14px]"
      >
        {children}
      </div>
    );
  },
);

export default CustomDropDown;
