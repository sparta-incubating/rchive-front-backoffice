import InputContainer from '@/components/atoms/InputContainer';
import React from 'react';
import InputField from '../InputField';
import Button from '@/components/atoms/button';

const EmailContainer = () => {
  return (
    <>
      <InputContainer>
        <InputField
          label="이메일"
          labelProps={{ htmlFor: 'email', className: 'text-sm' }}
          inputProps={{ type: 'text', placeholder: '이메일 입력', id: 'email' }}
        />
        <Button size="sm" variant="submit" disabled={true}>
          중복 확인
        </Button>
      </InputContainer>
      <InputContainer>
        <InputField
          label="이메일"
          labelProps={{
            htmlFor: 'email',
            className: 'text-primary-400 text-sm',
          }}
          inputProps={{ type: 'text', placeholder: '이메일 입력', id: 'email' }}
        />
      </InputContainer>
      <InputContainer>
        <InputField
          label="이메일"
          labelProps={{ htmlFor: 'email', className: 'text-sm' }}
          inputProps={{ type: 'text', placeholder: '이메일 입력', id: 'email' }}
        />
        <Button size="sm" variant="submit" disabled={false}>
          중복 확인
        </Button>
      </InputContainer>
      <p className="text-sm text-primary-400">이메일 중복확인은 필수입니다.</p>
      <br />
    </>
  );
};

export default EmailContainer;
