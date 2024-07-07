import InputContainer from '@/components/atoms/InputContainer';
import React from 'react';
import InputField from '../InputField';

const BirthdayForm = () => {
  return (
    <>
      <InputContainer>
        <InputField
          label="생년월일"
          labelProps={{
            htmlFor: 'birthday',
            className: 'text-xs mb-[8px] group-focus-within:text-primary-400',
          }}
          inputProps={{
            type: 'text',
            placeholder: 'ex. 19990101',
            id: 'birthday',
          }}
          className="group"
        />
      </InputContainer>
    </>
  );
};

export default BirthdayForm;
