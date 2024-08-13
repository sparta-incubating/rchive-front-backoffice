'use client';

import { CheckListType, SignupFormSchema } from '@/types/signup.types';
import { updateSignupFormCheckList } from '@/utils/checkBox';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

const useSignupCheckBox = (
  checkList: CheckListType[],
  setValue: UseFormSetValue<SignupFormSchema>,
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
      setValue(check.id as keyof SignupFormSchema, check.isChecked);
    });
  }, [checkList, setValue]);

  return { state, handleCheck, handleCheckAll };
};

export default useSignupCheckBox;
