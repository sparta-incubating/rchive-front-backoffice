'use client';

import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';
import { SignupFormSchema } from '@/types/signup.types';
import { UseFormRegister } from 'react-hook-form';
import PhoneField from './PhoneField';

interface PhoneFormProps {
  register: UseFormRegister<SignupFormSchema>;
  usernameCheck: string;
}

const PhoneForm = ({ register, usernameCheck }: PhoneFormProps) => {
  return (
    <>
      <PasswordContainer variant="primary">
        <InputField>
          <Label htmlFor="phone">휴대폰 번호</Label>
          <PhoneField register={register} usernameCheck={usernameCheck} />
        </InputField>
      </PasswordContainer>
    </>
  );
};

export default PhoneForm;
