'use client';

import InputContainer from '@/components/atoms/InputContainer';
import React, { useState } from 'react';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';

const PhoneField = () => {
  const [test, setTest] = useState<string>('');
  return (
    <>
      <InputContainer variant="secondary">
        <Input
          className="w-80 bg-blue-50 p-5 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="휴대폰 번호 입력 (-) 제외"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTest(e.target.value)
          }
        />
        {test.length > 0 && (
          <Button size="sm" variant="submit" disabled={true}>
            인증 요청
          </Button>
        )}
      </InputContainer>
    </>
  );
};

export default PhoneField;
