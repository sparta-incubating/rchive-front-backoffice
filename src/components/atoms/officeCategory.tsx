'use client';

import green from '@/../public/assets/icons/rectangle-green.svg';
import orange from '@/../public/assets/icons/rectangle-orange.svg';
import red from '@/../public/assets/icons/rectangle-red.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import CategoryContainer from './category/categoryContainer';
import CategoryLayout from './category/categoryLayout';

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

const categoryData1 = [
  { key: 1, value: 'APM' },
  { key: 2, value: '수강생' },
];

const categoryData2 = [
  { key: 1, value: '최신순' },
  { key: 2, value: '가나다순' },
];

const categoryData3 = [
  { key: 1, value: '1기' },
  { key: 2, value: '2기' },
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
      <section className="mb-8 flex items-center justify-center">
        <div className="flex flex-col">
          {/* 카테고리1 */}
          <CategoryContainer>
            <CategoryLayout>
              <p className="w-[25px] border">기수</p>
              <Image src={arrow} width={12} height={12} alt="화살표" />
            </CategoryLayout>
          </CategoryContainer>

          {/* 카테고리2 */}
          <CategoryContainer>
            <CategoryLayout>
              <p className="w-[37px] border">최신순</p>
              <Image src={arrow} width={12} height={12} alt="화살표" />
            </CategoryLayout>
          </CategoryContainer>

          {/* 카테고리3 */}
          <CategoryContainer>
            <CategoryLayout>
              <p className="w-[49px] border">공개여부</p>
              <Image src={arrow} width={12} height={12} alt="화살표" />
            </CategoryLayout>
          </CategoryContainer>
        </div>
      </section>
    </>
  );
};
export default OfficeCategory;
