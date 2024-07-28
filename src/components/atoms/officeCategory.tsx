'use client';

import SelectBox from '@/components/organisms/selectBox';
import { SelectOptionType } from '@/types/signup.types';

const options: SelectOptionType[] = [
  { value: '0', label: '최신순', selected: false },
  { value: '1', label: '옵션1', selected: false },
  { value: '2', label: '옵션2', selected: false },
  { value: '3', label: '옵션3', selected: false },
];

const OfficeCategory = () => {
  const handleSelect = (value: SelectOptionType['value']) => {
    console.log({ value });
  };
  return (
    <>
      <section className="mb-8 flex items-center justify-center">
        <SelectBox
          options={options}
          label={''}
          onSelect={handleSelect}
          selectInputVariant={'menubar'}
          className="w-[67px] px-4"
        />
      </section>
    </>
  );
};

export default OfficeCategory;
