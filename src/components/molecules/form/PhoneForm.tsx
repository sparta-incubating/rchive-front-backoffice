'use client';

import Input from '@/components/atoms/input';
import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';
import { SignupFormSchema } from '@/types/signup.types';
import { UseFormRegister } from 'react-hook-form';
import PhoneField from './PhoneField';

interface PhoneFormProps {
  register: UseFormRegister<SignupFormSchema>;
}

const PhoneForm = ({ register }: PhoneFormProps) => {
  return (
    <PasswordContainer variant="primary">
      <InputField>
        <Label htmlFor="phone">휴대폰 번호</Label>
        <PhoneField register={register} />
        <div className="w-[320px] border" />
        <Input
          name="phone"
          className="w-80 bg-blue-50 py-5 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="인증번호 입력"
        />
      </InputField>
    </PasswordContainer>
  );
};

export default PhoneForm;
