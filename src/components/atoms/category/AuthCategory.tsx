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
  label: string;
  id: number;
  name: string;
  value: string;
}

interface AuthCategoryProps {
  label: string;
  data: AdminCateoryType[];
  setValue: (value: string) => void;
}

const AuthFilterCategory = ({ label, data, setValue }: AuthCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(label);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (data: { label: string; value: string }) => {
    setSelectedCategory(data.label);
    setIsDropdownOpen(false);
    setValue(data.value);
  };

  return (
    <CategoryContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <CategoryLayout>
        <SelectLabel>{selectedCategory}</SelectLabel>
        <Image
          src={arrow}
          width={12}
          height={12}
          alt="화살표"
          className={`transition-transform duration-500 ${
            isDropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </CategoryLayout>
      <CategoryDropDown show={isDropdownOpen}>
        {data?.map((item) => (
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

export default AuthFilterCategory;
