'use client';

import CustomCheckBox from '@/components/atoms/customCheckBox';
import { ReactNode } from 'react';

interface AcceptTermsProps {
  children: ReactNode;
  checkBoxId: string;
  isChecked: boolean;
  onChange: () => void;
}

const AcceptTerms = ({
  checkBoxId,
  children,
  isChecked,
  onChange,
}: AcceptTermsProps) => {
  return (
    <div className="items-top relative flex space-x-2">
      <CustomCheckBox
        id={checkBoxId}
        variant={'checked'}
        checked={isChecked}
        onClick={onChange}
      />
      <label
        htmlFor={'ageCut'}
        onClick={onChange}
        className="text-sm text-gray-400"
      >
        {children}
      </label>
    </div>
  );
};
export default AcceptTerms;
