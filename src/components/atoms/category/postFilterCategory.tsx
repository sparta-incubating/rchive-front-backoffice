'use client';

import select from '@/../public/assets/icons/select-blue.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import { SelectOptionType } from '@/types/signup.types';
import { createToast } from '@/utils/toast';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CategoryContainer from '../category/categoryContainer';
import CategoryDropDown from '../category/categoryDropDown';
import CategoryLayout from '../category/categoryLayout';
import SelectLabel from '../selectLabel';

interface FilterCategoryProps {
  label: string;
  filterData: SelectOptionType[];
  disabled?: boolean;
  setValue: (value: SelectOptionType['value']) => void;
  defaultValue: string;
}

const FilterCategory = ({
  label,
  filterData,
  disabled = false,
  setValue,
  defaultValue,
}: FilterCategoryProps) => {
  const [selectedItem, setSelectedItem] = useState<SelectOptionType | null>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (data: SelectOptionType) => {
    setSelectedItem(data);
    setValue(data.value);
    setIsDropdownOpen(false);
  };

  const handleToast = () => {
    createToast('기수를 먼저 선택해주세요.', 'primary');
  };

  useEffect(() => {
    if (defaultValue !== '0') {
      setSelectedItem(filterData.find((data) => data.value === defaultValue));
    }
  }, [defaultValue]);

  return (
    <CategoryContainer
      onClick={() =>
        !disabled ? setIsDropdownOpen(!isDropdownOpen) : handleToast()
      }
    >
      <CategoryLayout>
        <SelectLabel>{selectedItem ? selectedItem.label : label}</SelectLabel>
        <Image src={arrow} width={12} height={12} alt="화살표" />
      </CategoryLayout>
      <CategoryDropDown show={isDropdownOpen}>
        {filterData &&
          filterData.map((data) => (
            <div
              className="flex h-[36px] w-[136px] flex-row items-center rounded-[8px] py-[9px] hover:bg-secondary-55"
              key={data.value}
              onClick={() => handleClick(data)}
            >
              <p
                className={`mx-[14px] w-[84px] text-sm ${selectedItem?.value === data.value ? 'text-secondary-500' : 'text-black'}`}
              >
                {data.label}
              </p>
              {selectedItem?.value === data.value && (
                <Image src={select} width={16} height={12} alt="선택됨" />
              )}
            </div>
          ))}
      </CategoryDropDown>
    </CategoryContainer>
  );
};

export default FilterCategory;
