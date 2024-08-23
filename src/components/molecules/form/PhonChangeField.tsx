'use client';

import { useProfileUpdate } from '@/api/profile/useMutation';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import { profilePhoneSchema } from '@/validators/auth/profile.validator';

import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

interface PhoneFieldProps {
  register: UseFormRegister<z.infer<typeof profilePhoneSchema>>;
  label: string;
  username: string;
}

const PhoneChangeField = ({ username, register, label }: PhoneFieldProps) => {
  const [isInputFilled, setIsInputFilled] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const { postPhoneAuthNumberMutate } = useProfileUpdate();

  useEffect(() => {
    if (isInputFilled.length > 10) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isInputFilled]);

  const handleRequestAuth = () => {
    const userInfo = { username, phone: isInputFilled };
    postPhoneAuthNumberMutate.mutate(userInfo);
    // console.log(userInfo, '입력값');
  };
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

        <Button
          size="sm"
          variant="submit"
          disabled={disabled}
          className="h-[44px] w-[87px] px-5 py-3 text-xs"
          type="button"
          onClick={handleRequestAuth}
        >
          {label}
        </Button>
      </InputContainer>
      <div className="w-[320px] border" />
      <Input
        {...register('authCode')}
        className="w-80 bg-blue-50 py-5 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
        placeholder="인증번호 입력"
      />
    </>
  );
};

export default PhoneChangeField;
