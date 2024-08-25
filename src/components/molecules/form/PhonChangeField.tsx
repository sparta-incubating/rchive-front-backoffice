'use client';

import { useProfileUpdate } from '@/api/profile/useMutation';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import { profilePhoneSchema } from '@/validators/auth/profile.validator';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

interface PhoneFieldProps {
  register: UseFormRegister<z.infer<typeof profilePhoneSchema>>;
  label: string;
  username: string;
  setpwErrorMsg: Dispatch<SetStateAction<boolean>>;
  setRequestAuthNumber: Dispatch<SetStateAction<boolean>>;
}

const PhoneChangeField = ({
  username,
  register,
  label,
  setpwErrorMsg,
  setRequestAuthNumber,
}: PhoneFieldProps) => {
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
    try {
      postPhoneAuthNumberMutate.mutate(userInfo);
      try {
        setpwErrorMsg(false);
        setRequestAuthNumber(false);
        setTimeout(() => {
          setRequestAuthNumber(true);
        }, 0);
      } catch (error) {
        throw new Error('휴대폰 인증번호 재요청 실패');
      }
    } catch (error) {
      throw new Error('휴대폰 인증번호 요청 실패');
    }
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
