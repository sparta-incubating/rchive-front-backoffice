'use client';

import { useProfileUpdate } from '@/api/profile/useMutation';
import AuthTimer from '@/components/atoms/authTimer';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import { SignupFormSchema } from '@/types/signup.types';

import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface PhoneFieldProps {
  register: UseFormRegister<SignupFormSchema>;
  usernameCheck: string;
}

const PhoneField = ({ register, usernameCheck }: PhoneFieldProps) => {
  const [isInputFilled, setIsInputFilled] = useState<string>('');
  const [isAuthFilled, setisAuthFilled] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const { postPhoneAuthNumberMutate } = useProfileUpdate();

  const [requestAuthNumber, setRequestAuthNumber] = useState<boolean>(false);
  const [expire, setExpire] = useState<boolean>(false);
  const [pwErrorMsg, setpwErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setDisabled(isInputFilled.length <= 10);
  }, [isInputFilled]);

  const handleRequestAuth = () => {
    const userInfo = { username: usernameCheck, phone: isInputFilled };
    console.log(userInfo, 'userInfo');
    try {
      postPhoneAuthNumberMutate.mutate(userInfo);
      setRequestAuthNumber(false);
      setpwErrorMsg(null);
      setTimeout(() => {
        setRequestAuthNumber(true);
      }, 0);
    } catch (error) {
      setpwErrorMsg('휴대폰 인증번호 요청 실패');
    }
  };

  const { checkPhoneAuthMutate } = useProfileUpdate();

  const authCheck = async () => {
    const userInfo = {
      username: usernameCheck,
      phone: isInputFilled,
      authCode: isAuthFilled,
    };
    try {
      await checkPhoneAuthMutate.mutateAsync(userInfo);
      setpwErrorMsg('인증이 완료됐습니다.');
    } catch (error) {
      setpwErrorMsg('인증 번호가 일치하지 않습니다.');
    }
  };

  console.log(pwErrorMsg, '현재 메시지');

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
          className="w-80 bg-blue-50 py-5 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="인증번호 입력"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setisAuthFilled(e.target.value)
          }
        />
        {isAuthFilled.length > 0 && (
          <button
            type="button"
            className="h-[36px] w-[56px]"
            onClick={authCheck}
          >
            확인
          </button>
        )}
      </InputContainer>
      {pwErrorMsg && (
        <span
          className={
            pwErrorMsg.includes('일치하지 않습니다')
              ? 'text-primary-400'
              : 'text-success-green'
          }
        >
          {pwErrorMsg}
        </span>
      )}
      {requestAuthNumber && <AuthTimer setExpire={setExpire} />}
    </>
  );
};

export default PhoneField;
