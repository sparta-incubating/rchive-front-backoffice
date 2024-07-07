import React from 'react';
import PasswordField from '../../atoms/PasswordField';
import InputField from '../InputField';
import Input from '@/components/atoms/input';

const PasswordContainer = () => {
  return (
    <>
      <PasswordField>
        <InputField
          label="비밀번호"
          labelProps={{ htmlFor: 'password', className: 'mb-[24px] text-sm ' }}
          inputProps={{
            type: 'text',
            placeholder: '6자 이상, 숫자와 영문자 조합',
            id: 'password',
            className:
              'peer h-[20px] w-[236px] bg-blue-50 focus:outline-none text-sm',
          }}
          variant="secondary"
        />
        <div className="border" />
        <Input
          type="text"
          placeholder="비밀번호 재입력"
          className="peer my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm focus:outline-none"
        />
      </PasswordField>
      <br />
    </>
  );
};

export default PasswordContainer;
