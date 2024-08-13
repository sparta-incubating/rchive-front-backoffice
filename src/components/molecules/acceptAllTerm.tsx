'use client';

import CustomCheckBox from '@/components/atoms/customCheckBox';
import { ReactNode } from 'react';

interface AcceptAllTermProps {
  children: ReactNode;
  checkBoxId: string;
  isChecked: boolean;
  onChange: () => void;
}

const AcceptAllTerm = ({
  checkBoxId,
  children,
  isChecked,
  onChange,
}: AcceptAllTermProps) => {
  return (
    <div className="items-top flex space-x-2">
      <CustomCheckBox
        id={checkBoxId}
        variant={'all'}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={checkBoxId} className="text-sm font-semibold">
        {children}
      </label>
    </div>
  );
};
export default AcceptAllTerm;
