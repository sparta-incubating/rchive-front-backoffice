'use client';

import green from '@/../public/assets/icons/rectangle-green.svg';
import orange from '@/../public/assets/icons/rectangle-orange.svg';
import red from '@/../public/assets/icons/rectangle-red.svg';
import select from '@/../public/assets/icons/select-blue.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import CategoryContainer from './category/categoryContainer';
import CategoryDropDown from './category/categoryDropDown';
import CategoryLayout from './category/categoryLayout';
import SelectLabel from './selectLabel';

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

const categoryData = [
  { key: 1, value: 'APM' },
  { key: 2, value: 'PM' },
];

const OfficeCategory = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(permissionData[0].value);
  const [currentImg, setCurrentImg] = useState(permissionData[0].imgSrc);
  const handleClick = (data: PermissionType) => {
    setCurrentValue(data.value);
    setCurrentImg(data.imgSrc);
    setIsClicked(!isClicked);
  };
  return (
    <>
      ddd
      <section className="mb-8 flex items-center justify-center">
        <div className="flex flex-col">
          {/* 카테고리1 */}
          <CategoryContainer>
            <CategoryLayout>
              <SelectLabel>직책</SelectLabel>
              <Image src={arrow} width={12} height={12} alt="화살표" />
            </CategoryLayout>
            {/* 드롭다운 컨테이너 */}
            <CategoryDropDown show={true}>
              {categoryData.map((data) => (
                <div
                  className="flex h-[36px] w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55"
                  data-clicked={isClicked}
                >
                  <p className="mx-[14px] w-[84px] text-sm data-[clicked=false]:text-black data-[clicked=true]:text-secondary-500">
                    {data.value}
                  </p>
                  {isClicked ? (
                    <Image src={select} width={16} height={12} alt="선택됨" />
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </CategoryDropDown>
          </CategoryContainer>
          <br />
          <br />
          <br />
          <br />
          <br />
          {/* 카테고리2 */}
          <CategoryContainer
            variant="submit"
            onClick={() => setShowOptions((prev) => !prev)}
          >
            <CategoryLayout>
              <Image src={currentImg} width={8} height={8} alt="레드" />
              <SelectLabel> {currentValue}</SelectLabel>
              <Image src={arrow} width={12} height={12} alt="화살표" />
            </CategoryLayout>
            {/* 드롭다운 컨테이너 */}
            <CategoryDropDown variant="category" show={showOptions}>
              {permissionData
                .filter((data) => data.value !== permissionData[0].value)
                .map((data) => (
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
        </div>
      </section>
    </>
  );
};
export default OfficeCategory;
