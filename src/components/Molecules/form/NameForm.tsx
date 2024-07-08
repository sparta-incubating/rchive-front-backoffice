import React from 'react';
import InputContainer from '../../atoms/InputContainer';
import InputField from '../InputField';

const NameForm = () => {
  return (
    <>
      <InputContainer>
        <InputField
          label="이름"
          labelProps={{
            htmlFor: 'userName',
            className: 'text-xs mb-[8px] group-focus-within:text-primary-400',
          }}
          inputProps={{
            type: 'text',
            placeholder: '이름 입력',
            id: 'userName',
            className: 'group ',
          }}
          className="group"
        />
      </InputContainer>
    </>
  );
};

export default NameForm;
