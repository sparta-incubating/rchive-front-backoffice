/*
'use client';

import green from '@/../public/assets/icons/rectangle-green.svg';
import orange from '@/../public/assets/icons/rectangle-orange.svg';
import red from '@/../public/assets/icons/rectangle-red.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import CategoryContainer from '../category/categoryContainer';
import CategoryDropDown from '../category/categoryDropDown';
import CategoryLayout from '../category/categoryLayout';
import SelectLabel from '../selectLabel';

type PermissionType = {
  key: number;
  value: string;
  imgSrc: string;
};

const permissionData = [
  { key: 1, value: '대기', imgSrc: orange },
  { key: 2, value: '거절', imgSrc: red },
  { key: 3, value: '승인', imgSrc: green },
];

const PermissionCategory = ({ currentPermission, onPermissionChange }: any) => {
  const [showOptions, setShowOptions] = useState(false);

  const currentPermissionData = useMemo(
    () =>
      permissionData.find((data) => data.value === currentPermission) ||
      permissionData[0],
    [currentPermission],
  );

  const handleClick = (data: PermissionType) => {
    onPermissionChange(data.value);
    setShowOptions(false);
  };

  const availableOptions = useMemo(() => {
    switch (currentPermission) {
      case '대기':
        return permissionData.filter((data) => data.value !== '대기');
      case '승인':
        return permissionData.filter((data) => data.value === '거절');
      case '거절':
        return permissionData.filter((data) => data.value === '승인');
      default:
        return permissionData.filter((data) => data.value !== '대기');
    }
  }, [currentPermission]);

  return (
    <CategoryContainer
      variant="submit"
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <CategoryLayout>
        <Image
          src={currentPermissionData.imgSrc}
          width={8}
          height={8}
          alt={currentPermissionData.value}
        />
        <SelectLabel>{currentPermissionData.value}</SelectLabel>
        <Image src={arrow} width={12} height={12} alt="화살표" />
      </CategoryLayout>
      <CategoryDropDown
        variant="category"
        show={showOptions}
        isClicked={currentPermission !== '대기'}
      >
        {availableOptions.map((data) => (
          <div
            className="flex h-[36px] w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55"
            key={data.key}
            onClick={() => handleClick(data)}
          >
            <Image
              src={data.imgSrc}
              alt={data.value}
              width={8}
              height={8}
              className="mx-[14px]"
            />
            <p className="text-sm">{data.value}</p>
          </div>
        ))}
      </CategoryDropDown>
    </CategoryContainer>
  );
};

export default PermissionCategory;
*/
