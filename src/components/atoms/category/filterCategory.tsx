'use client';

import select from '@/../public/assets/icons/select-blue.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import CategoryContainer from '../category/categoryContainer';
import CategoryDropDown from '../category/categoryDropDown';
import CategoryLayout from '../category/categoryLayout';
import SelectLabel from '../selectLabel';

type PermissionType = {
  key: number;
  value: string;
};

const categoryData1 = [
  { key: 1, value: 'APM' },
  { key: 2, value: '수강생' },
];

const FilterCategory = () => {
  const [selectedItem, setSelectedItem] = useState<PermissionType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (data: PermissionType) => {
    setSelectedItem(data);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <CategoryContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <CategoryLayout>
          <SelectLabel>
            {selectedItem ? selectedItem.value : '직책'}
          </SelectLabel>
          <Image src={arrow} width={12} height={12} alt="화살표" />
        </CategoryLayout>
        <CategoryDropDown show={isDropdownOpen}>
          {categoryData1.map((data) => (
            <div
              className="flex h-[36px] w-[136px] flex-row items-center rounded-[8px] py-[9px] hover:bg-secondary-55"
              key={data.key}
              onClick={() => handleClick(data)}
            >
              <p
                className={`mx-[14px] w-[84px] text-sm ${selectedItem?.key === data.key ? 'text-secondary-500' : 'text-black'}`}
              >
                {data.value}
              </p>
              {selectedItem?.key === data.key && (
                <Image src={select} width={16} height={12} alt="선택됨" />
              )}
            </div>
          ))}
        </CategoryDropDown>
      </CategoryContainer>
    </>
  );
};

export default FilterCategory;
