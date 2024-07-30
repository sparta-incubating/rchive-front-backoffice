'use client';

import green from '@/../public/assets/icons/rectangle-green.svg';
import orange from '@/../public/assets/icons/rectangle-orange.svg';
import red from '@/../public/assets/icons/rectangle-red.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import Image from 'next/image';
import CategoryContainer from './categoryContainer';
import CategoryLayout from './categoryLayout';
import SelectLabel from './selectLabel';

const optionData = [
  { key: 1, value: 'Option 1', imgSrc: red },
  { key: 2, value: 'Option 2', imgSrc: green },
  { key: 3, value: 'Option 3', imgSrc: orange },
];

const OfficeCategory = () => {
  const handleClick = () => {
    alert('test');
  };
  return (
    <>
      ddd
      <section className="mb-8 flex items-center justify-center">
        <div className="flex flex-col">
          {/* 카테고리1 */}
          <CategoryContainer onClick={handleClick}>
            <CategoryLayout>
              <SelectLabel>최신순</SelectLabel>
              <Image src={arrow} width={13} height={15} alt="화살표" />
            </CategoryLayout>

            {optionData.map((e) => (
              <p>{e.value}</p>
            ))}
            <div className="absolute right-0 top-[35px] data-[clicked=false]:hidden">
              <div className="flex h-[100px] w-[160px] flex-col items-center justify-center rounded-[14px] border">
                {/* 드롭다운아이템 */}
                <div className="h-[36px] w-[136px] rounded-[8px] hover:bg-secondary-55">
                  1
                </div>
                <div className="h-[36px] w-[136px] rounded-[8px] hover:bg-secondary-55">
                  2
                </div>
              </div>
            </div>
          </CategoryContainer>
          <br />
          <br /> <br /> <br /> <br /> <br />
          {/* 카테고리2 */}
          <CategoryContainer variant="submit">
            <CategoryLayout>
              <Image src={red} width={8} height={8} alt="레드" />
              <SelectLabel>대기</SelectLabel>
              <Image src={arrow} width={12} height={12} alt="화살표" />
            </CategoryLayout>
            {/* 드롭다운 컨테이너 */}
            <div className="absolute right-0 top-[26px]">
              <div className="flex h-[100px] w-[160px] flex-col items-center justify-center rounded-[14px] border">
                {/* 드롭다운아이템 */}
                <div className="h-[36px] w-[136px] rounded-[8px] hover:bg-secondary-55">
                  <span className="text-center">1</span>
                </div>
                <div className="h-[36px] w-[136px] rounded-[8px] hover:bg-secondary-55">
                  2
                </div>
              </div>
            </div>
          </CategoryContainer>
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
          {/* 카테고리3 */}
          <CategoryContainer onClick={handleClick}>
            <CategoryLayout>
              <SelectLabel>최신순</SelectLabel>
              <Image src={arrow} width={13} height={15} alt="화살표" />
            </CategoryLayout>

            <div className="absolute right-0 top-[35px] data-[clicked=false]:hidden">
              <div className="flex h-[100px] w-[160px] flex-col items-center justify-center rounded-[14px] border">
                {/* 드롭다운아이템 */}
                {optionData.map((data) => (
                  <div
                    className="h-[36px] w-[136px] rounded-[8px] hover:bg-secondary-55"
                    key={data.key}
                  >
                    <Image
                      src={data.imgSrc}
                      alt={data.value}
                      className="mr-2 h-6 w-6"
                      width={8}
                      height={8}
                    />
                    {data.value}
                  </div>
                ))}
              </div>
            </div>
          </CategoryContainer>
        </div>
      </section>
    </>
  );
};
export default OfficeCategory;
