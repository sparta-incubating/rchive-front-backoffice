'use client';

import AuthTimer from '@/components/atoms/authTimer';
import Input from '@/components/atoms/input';
import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';
import { SignupFormSchema } from '@/types/signup.types';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import PhoneField from './PhoneField';

interface PhoneFormProps {
  register: UseFormRegister<SignupFormSchema>;
  usernameCheck: string;
}

const PhoneForm = ({ register, usernameCheck }: PhoneFormProps) => {
  const [requestAuthNumber, setRequestAuthNumber] = useState<boolean>(false);
  const [expire, setExpire] = useState<boolean>(false);
  const [pwErrorMsg, setpwErrorMsg] = useState<boolean>(false);

  return (
    <PasswordContainer variant="primary">
      <InputField>
        <Label htmlFor="phone">휴대폰 번호</Label>
        <PhoneField
          register={register}
          setpwErrorMsg={setpwErrorMsg}
          setRequestAuthNumber={setRequestAuthNumber}
          expire={expire}
          usernameCheck={usernameCheck}
        />
        <div className="w-[320px] border" />
        <Input
          name="phone"
          className="w-80 bg-blue-50 py-5 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="인증번호 입력"
        />
        {pwErrorMsg ? (
          <span className="text-sm text-primary-400">
            인증 번호가 일치하지 않습니다.
          </span>
        ) : (
          <>{requestAuthNumber && <AuthTimer setExpire={setExpire} />}</>
        )}
      </InputField>
    </PasswordContainer>
  );
};

export default PhoneForm;
