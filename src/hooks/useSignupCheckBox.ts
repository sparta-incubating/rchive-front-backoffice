'use client';

import { useEffect, useState } from 'react';
import { CheckListType, SignupFormData } from '@/types/signup.types';
import { updateSignupFormCheckList } from '@/utils/checkBox';
import { UseFormSetValue } from 'react-hook-form';

const useSignupCheckBox = (
  checkList: CheckListType[],
  setValue: UseFormSetValue<SignupFormData>,
) => {
  const [state, setState] = useState<CheckListType[]>(checkList);

  const handleCheck = (id: string) => {
    setState((prevCheckList) =>
      prevCheckList.map((check) =>
        check.id === id ? { ...check, isChecked: !check.isChecked } : check,
      ),
    );
  };

  const handleCheckAll = () => {
    const allChecked = state.every((check) => check.isChecked);
    const newCheckList = state.map((check) => ({
      ...check,
      isChecked: !allChecked,
    }));
    setState(newCheckList);

    updateSignupFormCheckList(newCheckList, setValue);
  };

  useEffect(() => {
    checkList.forEach((check) => {
      setValue(check.id as keyof SignupFormData, check.isChecked);
    });
  }, [checkList, setValue]);

  return { state, handleCheck, handleCheckAll };
};

export default useSignupCheckBox;
