'use client';

import BackOfficeButton from '@/components/atoms/backOfficeButton';
import PageNation from '@/components/atoms/category/pageNation';
import PermissionList from '@/components/atoms/category/permissionList';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import BackofficePage from '@/components/pages/backofficePage';
import { useState } from 'react';

const Admin = () => {
  const [checkedNum, setCheckedNum] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabArr = [
    {
      id: 0,
      title: '전체',
      className: 'w-[104px]',
      count: 5,
    },
    {
      id: 1,
      title: '대기 중',
      className: 'w-[114px]',
      count: 2,
    },
    { id: 3, title: '승인', className: 'w-[104px]', count: 3 },
  ];

  return (
    <>
      <BackofficePage>
        {/* 검색바 */}
        <SearchBar />

        {/* 게시판 */}
        <PermissionBoard>
          {/* 탭메뉴*/}
          <TapMenu
            data={tabArr}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* 카테고리 */}
          <section className="mx-auto my-[24px] flex w-[1012px] flex-row justify-between border">
            {/* 카테고리 */}
            {/* <OfficeCategory /> */}
            <p>카테고리</p>

            {/* 버튼 */}
            <section className="flex flex-row gap-[8px]">
              {checkedNum ? (
                <p className="flex h-[37px] w-[83px] items-center text-secondary-400">
                  {checkedNum}개 선택
                </p>
              ) : (
                ''
              )}
              <BackOfficeButton>승인</BackOfficeButton>
              <BackOfficeButton variant="secondary">거절</BackOfficeButton>
            </section>
          </section>

          {/* 조회*/}
          <PermissionList
            activeTab={activeTab}
            onCheckedNumChange={setCheckedNum}
          />

          {/* 페이지네이션*/}
          <PageNation />
        </PermissionBoard>
      </BackofficePage>
    </>
  );
};

export default Admin;
