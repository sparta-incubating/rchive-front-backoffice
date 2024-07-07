import React from 'react';
import InputContainer from '../../atoms/InputContainer';
import InputField from '../InputField';

const NameContainer = () => {
  return (
    <>
      <p>이름</p>
      <InputContainer>
        <InputField
          label="이름"
          labelProps={{
            htmlFor: 'userName',
            className: 'text-primary-400 text-sm mb-[8px]',
          }}
          inputProps={{
            type: 'text',
            placeholder: '이름 입력',
            id: 'userName',
          }}
        />
      </InputContainer>
      <InputContainer>
        <InputField
          label="이름"
          labelProps={{
            htmlFor: 'userName',
            className: 'text-sm mb-[8px]',
          }}
          inputProps={{
            type: 'text',
            placeholder: '이름 입력',
            id: 'userName',
            className: 'peer',
          }}
        />
      </InputContainer>
      <br />
    </>
  );
};

export default NameContainer;
