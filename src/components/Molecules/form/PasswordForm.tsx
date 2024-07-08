import React from 'react';
import InputField from '../InputField';
import Input from '@/components/atoms/input';
import PasswordContainer from '../../atoms/PasswordContainer';

const PasswordForm = () => {
  return (
    <>
      <PasswordContainer>
        <InputField
          label="비밀번호"
          labelProps={{
            htmlFor: 'password',
            className: 'text-xs mb-[24px] group-focus-within:text-primary-400',
          }}
          inputProps={{
            type: 'text',
            placeholder: '6자 이상, 숫자와 영문자 조합',
            id: 'password',
            className:
              'h-[20px] w-[236px] bg-blue-50 focus:outline-none text-sm',
          }}
          variant="secondary"
          className="group"
        />
        <div className="border" />
        <Input
          type="text"
          placeholder="비밀번호 재입력"
          className="my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
        />
      </PasswordContainer>
    </>
  );
};

export default PasswordForm;
