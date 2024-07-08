'use client';

import InputContainer from '@/components/atoms/InputContainer';
import React, { useState } from 'react';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';

const PhoneField = () => {
  const [isInputFilled, setIsInputFilled] = useState<string>('');

  return (
    <>
      <InputContainer variant="secondary">
        <Input
          className="my-5 w-[233px] bg-blue-50 pl-5 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="휴대폰 번호 입력 (-) 제외"
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
