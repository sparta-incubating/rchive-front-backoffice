import { CheckListType, SignupFormData } from '@/types/signup.types';
import { UseFormSetValue } from 'react-hook-form';

export const updateSignupFormCheckList = (
  checkList: CheckListType[],
  setValue: UseFormSetValue<SignupFormData>,
) => {
  checkList.forEach((check) => {
    setValue(check.id as keyof SignupFormData, check.isChecked, {
      shouldValidate: true,
    });
  });
};
