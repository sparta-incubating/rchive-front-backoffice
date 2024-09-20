'use client';

import { useProfileUpdate } from '@/api/profile/useMutation';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import { authCodeType } from '@/types/signup.types';
import { profilePhoneSchema } from '@/validators/auth/profile.validator';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

interface PhoneFieldProps {
  register: UseFormRegister<z.infer<typeof profilePhoneSchema>>;
  username: string;
  authCheck: (authInfo: authCodeType) => Promise<void>;
  setIsErrorMsg: Dispatch<SetStateAction<string | null>>;
  setRequestAuthNumber: React.Dispatch<React.SetStateAction<boolean>>;
  expire: boolean;
}

const PhoneChangeField = ({
  register,
  username,
  authCheck,
  setIsErrorMsg,
  setRequestAuthNumber,
  expire,
}: PhoneFieldProps) => {
  const [isInputFilled, setIsInputFilled] = useState<string>('');
  const [isAuthFilled, setIsAuthFilled] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const { postPhoneAuthNumberMutate } = useProfileUpdate();

  useEffect(() => {
    if (isInputFilled.length === 8) {
      setDisabled(false);
    } else if (isInputFilled.length >= 12) {
      setDisabled(true);
    }
  }, [isInputFilled]);

  const handleTest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 14) {
      setIsInputFilled(value);
    }
  };

  const handleAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setIsAuthFilled(value);
    }
  };

  const handleRequestAuth = () => {
    const userInfo = { username, phone: isInputFilled };

    try {
      postPhoneAuthNumberMutate.mutate(userInfo);
      setRequestAuthNumber(false);
      setIsErrorMsg(null);
      setIsAuthFilled('');
      setTimeout(() => {
        setRequestAuthNumber(true);
      }, 0);
    } catch (error) {
      setIsErrorMsg('휴대폰 인증번호 요청 실패');
    }
  };
  const authInfo = {
    username,
    phone: isInputFilled,
    authCode: isAuthFilled,
  };
  return (
    <>
      <InputContainer variant="secondary" className="relative">
        <Input
          className="mb-5 w-[233px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="휴대폰 번호 입력 (-) 제외"
          {...register('phone')}
          onChange={handleTest}
          type="text"
          value={isInputFilled}
        />
        {isInputFilled.length > 0 && (
          <Button
            size="sm"
            variant="submit"
            disabled={disabled}
            className="absolute -top-[11px] right-1 h-[44px] w-[87px] px-5 py-3 text-xs"
            type="button"
            onClick={handleRequestAuth}
          >
            {expire ? '재요청' : '인증요청'}
          </Button>
        )}
      </InputContainer>
      <div className="w-[320px] border" />
      <InputContainer variant="secondary">
        <Input
          {...register('authCode')}
          className="mb-[28px] mt-[44px] w-80 bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="인증번호 입력"
          onChange={handleAuth}
          value={isAuthFilled}
          type="text"
        />
        {isAuthFilled.length > 0 && (
          <button
            type="button"
            className={`h-[36px] w-[100px] text-xs ${isAuthFilled.length > 5 ? 'text-gray-900' : 'text-gray-300'} font-semibold`}
            onClick={() => authCheck(authInfo)}
          >
            확인
          </button>
        )}
      </InputContainer>
    </>
  );
};
export default PhoneChangeField;
