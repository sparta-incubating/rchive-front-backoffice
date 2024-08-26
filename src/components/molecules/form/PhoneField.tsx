'use client';

import { useProfileUpdate } from '@/api/profile/useMutation';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import { SignupFormSchema } from '@/types/signup.types';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface PhoneFieldProps {
  register: UseFormRegister<SignupFormSchema>;
  setpwErrorMsg: Dispatch<SetStateAction<boolean>>;
  setRequestAuthNumber: Dispatch<SetStateAction<boolean>>;
  expire: boolean;
  usernameCheck: string;
}

const PhoneField = ({
  register,
  setpwErrorMsg,
  setRequestAuthNumber,
  expire,
  usernameCheck,
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
    const userInfo = { username: usernameCheck, phone: isInputFilled };
    console.log(userInfo, 'userInfo');
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
        {isInputFilled.length > 0 && (
          <Button
            size="sm"
            variant="submit"
            disabled={disabled}
            className="h-[44px] w-[87px] px-5 py-3 text-xs"
            type="button"
            onClick={handleRequestAuth}
          >
            {expire ? '재요청' : '인증요청'}
          </Button>
        )}
      </InputContainer>
    </>
  );
};

export default PhoneField;
