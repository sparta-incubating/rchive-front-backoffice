'use client';

import InputContainer from '@/components/atoms/InputContainer';
import React, { useState } from 'react';
import InputField from '../InputField';
import Button from '@/components/atoms/button';

const EmailForm = () => {
  const [isInputFilled, setIsInputFilled] = useState<string>('');

  return (
    <>
      <InputContainer>
        <InputField
          label="이메일"
          labelProps={{
            htmlFor: 'email',
            className: 'text-xs mb-[8px] group-focus-within:text-primary-400',
          }}
          inputProps={{
            type: 'text',
            placeholder: '이메일 입력',
            id: 'email',
            value: isInputFilled,
          }}
          className="group"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIsInputFilled(e.target.value)
          }
        />
        {isInputFilled.length > 0 && (
          <Button
            size="sm"
            variant="submit"
            disabled={true}
            className="h-[42px] w-[85px] p-2 text-xs"
          >
            중복 확인
          </Button>
        )}
      </InputContainer>
    </>
  );
};

export default EmailForm;
