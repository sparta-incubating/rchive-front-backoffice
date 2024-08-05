import { classMerge } from '@/utils/utils';
import { ReactNode } from 'react';

interface TagDropDownProps {
  disable: boolean;
  children: ReactNode;
  className?: string;
}

/**
 *
 * @param {boolean} disable // false: dropdown 열기, true: dropdown 닫기
 * @param {ReactNode} children // children components
 * @constructor
 */
const DropDownContainer = ({
  disable,
  className,
  children,
}: TagDropDownProps) => {
  return (
    <div
      data-disable={disable}
      className={classMerge(
        'transition-height absolute bottom-0 left-0 z-20 h-auto w-full translate-y-full overflow-scroll rounded-[12px] bg-white shadow-dropDownBox scrollbar-hide data-[disable=false]:max-h-72 data-[disable=true]:max-h-0 data-[disable=true]:overflow-hidden data-[disable=true]:overflow-y-scroll data-[disable=false]:px-[12px] data-[disable=false]:py-3',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DropDownContainer;
