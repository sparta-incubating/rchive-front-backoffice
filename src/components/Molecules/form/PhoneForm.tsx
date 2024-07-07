'use client';

import { useCallback, useState } from 'react';
import SelectBox from '@/components/organisms/selectBox';
import { SelectOptionType } from '@/types/signup.types';
import InputField from '../InputField';
import Input from '@/components/atoms/input';

const PhoneContainer = () => {
  const [selectOptions, setSelectOptions] = useState<SelectOptionType[]>([
    { value: '1', label: '대한민국 +82', selected: false },
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
      <div className="rounded-[12px]">
        <SelectBox
          options={selectOptions}
          label="휴대폰 번호"
          onSelect={handleSelected}
        />
        <div className="w-[320px] border" />
        <div className="flex flex-col">
          <Input
            className="relative w-80 bg-blue-50 p-5"
            placeholder="휴대폰 번호 입력 (-) 제외"
          />
          <div className="w-[320px] border" />
          <Input
            className="relative w-80 bg-blue-50 p-5"
            placeholder="인증번호 입력"
          />
        </div>
      </div>

      <br />
      <br />
      <br />
    </>
  );
};

export default PhoneContainer;
