'use client';

import CustomCheckBox from '@/components/atoms/customCheckBox';
import { ChangeEvent, ReactNode } from 'react';

interface AcceptAllTermProps {
  children: ReactNode;
  checkBoxId: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLLabelElement>,
  ) => void;
}

const AcceptAllTerm = ({
  checkBoxId,
  children,
  isChecked,
  onClick,
}: AcceptAllTermProps) => {
  return (
    <div className="items-top flex space-x-2">
      <CustomCheckBox
        id={checkBoxId}
        variant={'all'}
        checked={isChecked}
        onClick={onClick}
      />
      <label
        htmlFor={checkBoxId}
        onClick={onClick}
        className="text-sm font-semibold"
      >
        {children}
      </label>
    </div>
  );
};
export default AcceptAllTerm;
