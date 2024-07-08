'use client';

import SelectBox from '@/components/organisms/selectBox';
import Input from '@/components/atoms/input';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import PhoneField from './PhoneField';
import useSelectBox from '@/hooks/useSelectBox';
import { phoneCountries } from '@/utils/phoneCountry';

const PhoneForm = () => {
  const { selectOptions, handleSelected } = useSelectBox(phoneCountries);
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
