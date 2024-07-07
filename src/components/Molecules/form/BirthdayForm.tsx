import InputContainer from '@/components/atoms/InputContainer';
import React from 'react';
import InputField from '../InputField';

const BirthdayForm = () => {
  return (
    <>
      <p>생년월일</p>
      <InputContainer>
        <InputField
          label="생년월일"
          labelProps={{ htmlFor: 'birthday', className: 'text-sm' }}
          inputProps={{
            type: 'text',
            placeholder: 'ex. 19990101',
            id: 'birthday',
          }}
        />
      </InputContainer>
      <InputContainer>
        <InputField
          label="생년월일"
          labelProps={{
            htmlFor: 'birthDay',
            className: 'text-primary-400 text-sm',
          }}
          inputProps={{
            type: 'text',
            placeholder: 'ex. 19990101',
            id: 'birthday',
          }}
        />
      </InputContainer>{' '}
      <br />
    </>
  );
};

export default BirthdayForm;
