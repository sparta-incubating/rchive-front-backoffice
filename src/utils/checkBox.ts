import { CheckListType, SignupFormSchema } from '@/types/signup.types';
import { UseFormSetValue } from 'react-hook-form';

export const updateSignupFormCheckList = (
  checkList: CheckListType[],
  setValue: UseFormSetValue<SignupFormSchema>,
) => {
  checkList.forEach((check) => {
    setValue(check.id as keyof SignupFormSchema, check.isChecked, {
      shouldValidate: true,
    });
  });
};
