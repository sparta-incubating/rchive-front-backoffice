'use client';

import { useCallback, useState } from 'react';
import SelectBox from '@/components/organisms/selectBox';
import { SelectOptionType } from '@/types/signup.types';
import Input from '@/components/atoms/input';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import PhoneField from './PhoneField';

const PhoneForm = () => {
  const [selectOptions, setSelectOptions] = useState<SelectOptionType[]>([
    { value: '1', label: '대한민국 +82', selected: true },
    { value: '2', label: 'Afghanistan +93', selected: false },
    { value: '3', label: 'ALbania +355', selected: false },
    { value: '4', label: 'Algeria +213', selected: false },
    { value: '5', label: 'American Samoa +1', selected: false },
    { value: '6', label: 'Andorra +376', selected: false },
  ]);

  const handleSelected = useCallback((value: SelectOptionType['value']) => {
    setSelectOptions((prev) =>
      prev.map((option) =>
        option.value === value
          ? { ...option, selected: true }
          : { ...option, selected: false },
      ),
    );
  }, []);

  return (
    <>
      <PasswordContainer variant="secondary">
        <SelectBox
          options={selectOptions}
          label="휴대폰 번호"
          onSelect={handleSelected}
        />
        <div className="w-[320px] border" />
        <PhoneField />
        <div className="w-[320px] border" />
        <Input
          className="w-80 bg-blue-50 p-5 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
          placeholder="인증번호 입력"
        />
      </PasswordContainer>
    </>
  );
};

export default PhoneForm;
