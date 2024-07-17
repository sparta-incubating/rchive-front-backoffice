'use client';

import Input from '@/components/atoms/input';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import SelectFormBox from '@/components/organisms/selectFormBox';
import useSelectBox from '@/hooks/useSelectBox';
import { SignupFormSchema } from '@/types/signup.types';
import { phoneCountries } from '@/utils/phoneCountry';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import PhoneField from './PhoneField';

interface PhoneFormProps {
  control: Control<SignupFormSchema>;
  register: UseFormRegister<SignupFormSchema>;
}

const PhoneForm = ({ control, register }: PhoneFormProps) => {
  const { selectOptions, handleSelected } = useSelectBox(phoneCountries);

  return (
    <>
      {/*TODO: margin 맞추기*/}
      <PasswordContainer variant="secondary">
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <SelectFormBox<SignupFormSchema>
              options={selectOptions}
              label="휴대폰 번호"
              onSelect={(value) => {
                handleSelected(value);
                field.onChange(value);
              }}
              field={field}
            />
          )}
        />
        <div className="w-[320px] border" />
        <PhoneField register={register} />

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
