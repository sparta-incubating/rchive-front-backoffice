'use client';

import CustomCheckBox from '@/components/atoms/customCheckBox';
import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SignupFormData } from '@/types/signup.types';

interface AcceptTermsProps {
  children: ReactNode;
  checkBoxId: string;
  isChecked: boolean;
  onChange: () => void;
  register: UseFormRegister<SignupFormData>;
}

const AcceptTerms = ({
  checkBoxId,
  children,
  isChecked,
  onChange,
  register,
}: AcceptTermsProps) => {
  return (
    <div className="items-top relative flex space-x-2">
      <CustomCheckBox
        id={checkBoxId}
        variant={'checked'}
        checked={isChecked}
        {...register(checkBoxId as keyof SignupFormData, {
          onChange: (e) => {
            e.target.checked = !e.target.checked;
            onChange();
          },
        })}
      />
      <label htmlFor={checkBoxId} className="text-sm text-gray-400">
        {children}
      </label>
    </div>
  );
};
export default AcceptTerms;
