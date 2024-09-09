'use client';

import { useProfileUpdate } from '@/api/profile/useMutation';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import { authCodeType, SignupFormSchema } from '@/types/signup.types';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface PhoneFieldProps {
  register: UseFormRegister<SignupFormSchema>;
  usernameCheck: string;
  authCheck: (authInfo: authCodeType) => Promise<void>;
  setIsErrorMsg: Dispatch<SetStateAction<string | null>>;
  setRequestAuthNumber: React.Dispatch<React.SetStateAction<boolean>>;
  expire: boolean;
}

const PhoneField = ({
  register,
  usernameCheck,
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
    setDisabled(isInputFilled.length <= 10);
  }, [isInputFilled]);

  const handleRequestAuth = () => {
    const userInfo = { username: usernameCheck, phone: isInputFilled };

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
    username: usernameCheck,
    phone: isInputFilled,
    authCode: isAuthFilled,
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
      <div className="w-[320px] border" />
      <InputContainer variant="secondary">
        <Input
          {...register('authCode')}
          className="w-80 bg-blue-50 pb-5 pt-[24px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="인증번호 입력"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIsAuthFilled(e.target.value)
          }
          value={isAuthFilled}
        />
        {isAuthFilled.length > 0 && (
          <button
            type="button"
            className={`h-[36px] w-[100px] ${isAuthFilled.length > 5 ? 'text-gray-900' : 'text-gray-300'} font-semibold`}
            onClick={() => authCheck(authInfo)}
          >
            확인
          </button>
        )}
      </InputContainer>
    </>
  );
};

export default PhoneField;
