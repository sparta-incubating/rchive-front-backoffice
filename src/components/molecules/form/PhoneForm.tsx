'use client';

import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';
import { authCodeType, SignupFormSchema } from '@/types/signup.types';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import PhoneField from './PhoneField';

interface PhoneFormProps {
  register: UseFormRegister<SignupFormSchema>;
  usernameCheck: string;
  authCheck: (authInfo: authCodeType) => Promise<void>;
  pwErrorMsg: string | null;
  setpwErrorMsg: Dispatch<SetStateAction<string | null>>;
}

const PhoneForm = ({
  register,
  usernameCheck,
  authCheck,
  pwErrorMsg,
  setpwErrorMsg,
}: PhoneFormProps) => {
  return (
    <>
      <PasswordContainer variant="primary">
        <InputField>
          <Label htmlFor="phone">휴대폰 번호</Label>
          <PhoneField
            register={register}
            usernameCheck={usernameCheck}
            authCheck={authCheck}
            pwErrorMsg={pwErrorMsg}
            setpwErrorMsg={setpwErrorMsg}
          />
        </InputField>
      </PasswordContainer>
    </>
  );
};

export default PhoneForm;
