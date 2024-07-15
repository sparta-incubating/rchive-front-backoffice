import { ReactNode } from 'react';

interface TagDropDownProps {
  disable: boolean;
  children: ReactNode;
}

/**
 *
 * @param {boolean} disable // false: dropdown 열기, true: dropdown 닫기
 * @param {ReactNode} children // children components
 * @constructor
 */
const DropDownContainer = ({ disable, children }: TagDropDownProps) => {
  return (
    <div
      data-disable={disable}
      className="transition-height shadow-dropDownBox absolute bottom-0 left-0 z-20 h-auto w-1/2 translate-y-full rounded-[12px] bg-white scrollbar-hide data-[disable=false]:max-h-72 data-[disable=true]:max-h-0 data-[disable=true]:overflow-hidden data-[disable=true]:overflow-y-scroll data-[disable=false]:px-[14px] data-[disable=false]:py-3"
    >
      {children}
    </div>
  );
};

export default DropDownContainer;
