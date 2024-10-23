'use client';

import select from '@/../public/assets/icons/select-blue.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
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
  const {
    isOpen,
    setIsOpen,
    dropdownRef,
    handleClick: handleDropdownClick,
  } = useDropDownOutsideClick();

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    data: SelectOptionType,
  ) => {
    e.stopPropagation();
    setSelectedItem(data);
    setValue(data.value);
    setIsOpen(false);
  };

  const handleToast = () => {
    createToast('기수를 먼저 선택해주세요.', 'warning');
  };

  useEffect(() => {
    if (defaultValue !== '0') {
      setSelectedItem(filterData.find((data) => data.value === defaultValue));
    }
  }, [defaultValue, filterData]);

  const initialLabel =
    selectedItem?.value === 'all' || !selectedItem ? label : selectedItem.label;

  return (
    <CategoryContainer
      ref={dropdownRef}
      onClick={(e) => (!disabled ? handleDropdownClick(e) : handleToast())}
    >
      <CategoryLayout>
        <SelectLabel>{initialLabel}</SelectLabel>
        <Image
          src={arrow}
          width={12}
          height={12}
          alt="화살표"
          className={`transition-transform duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </CategoryLayout>
      <CategoryDropDown show={isOpen}>
        <div
          className="flex h-[36px] w-[136px] flex-row items-center rounded-[8px] py-[9px] hover:bg-secondary-55"
          key={0}
          onClick={(e) =>
            handleClick(e, { value: 'all', label: '전체', selected: false })
          }
        >
          <p
            className={`mx-[14px] w-[84px] text-sm ${selectedItem?.value === 'all' ? 'text-secondary-500' : 'text-black'}`}
          >
            전체
          </p>
          {selectedItem?.value === 'all' && (
            <Image src={select} width={16} height={12} alt="선택됨" />
          )}
        </div>
        {filterData &&
          filterData.map((data, index) => (
            <div
              className="flex h-[36px] w-[136px] flex-row items-center rounded-[8px] py-[9px] hover:bg-secondary-55"
              key={data.value + index}
              onClick={(e) => handleClick(e, data)}
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
