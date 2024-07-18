'use client';

import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import { SignupFormSchema } from '@/types/signup.types';
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface PhoneFieldProps {
  register: UseFormRegister<SignupFormSchema>;
}

const PhoneField = ({ register }: PhoneFieldProps) => {
  const [isInputFilled, setIsInputFilled] = useState<string>('');

  return (
    <>
      <InputContainer variant="secondary">
        <Input
          className="my-5 w-[233px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="휴대폰 번호 입력 (-) 제외"
          {...register('phone')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIsInputFilled(e.target.value)
          }
        />
        {isInputFilled.length > 0 && (
          <Button
            size="sm"
            variant="submit"
            disabled={true}
            className="h-[44px] w-[87px] px-5 py-3 text-xs"
          >
            인증 요청
          </Button>
        )}
      </InputContainer>
    </>
  );
};

export default PhoneField;
