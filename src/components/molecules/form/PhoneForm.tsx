'use client';

import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';
import { authCodeType, SignupFormSchema } from '@/types/signup.types';
import React, { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import PhoneField from './PhoneField';

interface PhoneFormProps {
  register: UseFormRegister<SignupFormSchema>;
  usernameCheck: string;
  authCheck: (authInfo: authCodeType) => Promise<void>;
  setIsErrorMsg: Dispatch<SetStateAction<string | null>>;
  setRequestAuthNumber: React.Dispatch<React.SetStateAction<boolean>>;
  expire: boolean;
}

const PhoneForm = ({
  register,
  usernameCheck,
  authCheck,
  setIsErrorMsg,
  setRequestAuthNumber,
  expire,
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
            setIsErrorMsg={setIsErrorMsg}
            setRequestAuthNumber={setRequestAuthNumber}
            expire={expire}
          />
        </InputField>
      </PasswordContainer>
    </>
  );
};

export default PhoneForm;
