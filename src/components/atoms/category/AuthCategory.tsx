'use client';

import select from '@/../public/assets/icons/select-blue.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import SelectLabel from '../selectLabel';
import CategoryContainer from './categoryContainer';
import CategoryDropDown from './categoryDropDown';
import CategoryLayout from './categoryLayout';

// interface FilterCategoryProps {
//   label: string;
//   data;
// }

const AuthCategory = ({ label, data }) => {
  const [selectedItem, setSelectedItem] = useState<string>(label);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log(data.value, '???');

  const handleClick = (data) => {
    setSelectedItem(data);
    setIsDropdownOpen(false);
  };
  console.log(selectedItem, 'selectedItem');

  return (
    <CategoryContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <CategoryLayout>
        <SelectLabel>{selectedItem}</SelectLabel>
        <Image src={arrow} width={12} height={12} alt="화살표" />
      </CategoryLayout>
      <CategoryDropDown show={isDropdownOpen}>
        {data &&
          data.map((data, index) => (
            <div
              className="flex h-[36px] w-[136px] flex-row items-center rounded-[8px] py-[9px] hover:bg-secondary-55"
              key={index}
              onClick={() => handleClick(data)}
            >
              <p
                className={`mx-[14px] w-[84px] text-sm ${selectedItem?.valueOf === data.value ? 'text-secondary-500' : 'text-black'}`}
              >
                {data.label}
              </p>
              {selectedItem?.valueOf === data.value && (
                <Image src={select} width={16} height={12} alt="선택됨" />
              )}
            </div>
          ))}
      </CategoryDropDown>
    </CategoryContainer>
  );
};

export default AuthCategory;
