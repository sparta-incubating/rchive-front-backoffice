'use client';

import select from '@/../public/assets/icons/select-blue.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import SelectLabel from '../selectLabel';
import CategoryContainer from './categoryContainer';
import CategoryDropDown from './categoryDropDown';
import CategoryLayout from './categoryLayout';

interface AdminCateoryType {
  id: number;
  name: string;
  value: string;
}

interface AuthCategoryProps {
  label: string;
  data: AdminCateoryType[];
  setValue: (value: string) => void;
}

const AuthCategory = ({ label, data, setValue }: AuthCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(label);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (data: { name: string; value: string }) => {
    setSelectedCategory(data.name);
    setIsDropdownOpen(false);
    setValue(data.value);
  };

  return (
    <CategoryContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <CategoryLayout>
        <SelectLabel>{selectedCategory}</SelectLabel>
        <Image src={arrow} width={12} height={12} alt="화살표" />
      </CategoryLayout>
      <CategoryDropDown show={isDropdownOpen}>
        {data.map((item) => (
          <div
            className="flex h-[36px] w-[136px] flex-row items-center rounded-[8px] py-[9px] hover:bg-secondary-55"
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <p
              className={`mx-[14px] w-[84px] text-sm ${
                selectedCategory === item.value
                  ? 'text-secondary-500'
                  : 'text-black'
              }`}
            >
              {item.name}
            </p>
            {selectedCategory === item.value && (
              <Image src={select} width={16} height={12} alt="선택됨" />
            )}
          </div>
        ))}
      </CategoryDropDown>
    </CategoryContainer>
  );
};

export default AuthCategory;
