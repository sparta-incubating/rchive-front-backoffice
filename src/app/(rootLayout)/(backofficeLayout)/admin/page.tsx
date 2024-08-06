'use client';

import BackOfficeButton from '@/components/atoms/backOfficeButton';
import FilterCategory from '@/components/atoms/category/filterCategory';
import PageNation from '@/components/atoms/category/pageNation';
import PermissionList from '@/components/atoms/category/permissionList';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import BackofficePage from '@/components/pages/backofficePage';
import { mockData, tabArr } from '@/constants/permission.constant';
import { useMemo, useState } from 'react';

const Admin = () => {
  const [checkedNum, setCheckedNum] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [listData, setListData] = useState(mockData);

  const filteredListData = useMemo(() => {
    if (activeTab === 0) return listData;
    if (activeTab === 1)
      return listData.filter((item) => item.permission === '대기');
    if (activeTab === 2)
      return listData.filter((item) => item.permission === '승인');
    return [];
  }, [listData, activeTab]);

  const currentTabTotal = filteredListData.length;

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
            listData={listData}
          />
          {/* 카테고리 */}
          <section className="mx-auto my-[24px] flex w-[1012px] flex-row justify-between">
            <section className="flex flex-row gap-[10px]">
              <FilterCategory />
              <FilterCategory />
              <FilterCategory />
            </section>

            {/* 버튼 */}
            <section className="flex flex-row gap-[8px]">
              {checkedNum > 0 && (
                <>
                  <p className="flex h-[37px] w-[83px] items-center text-secondary-400">
                    {currentTabTotal}개 선택
                  </p>
                  <BackOfficeButton>승인</BackOfficeButton>
                  <BackOfficeButton variant="secondary">거절</BackOfficeButton>
                </>
              )}
            </section>
          </section>

          {/* 조회*/}
          <PermissionList
            activeTab={activeTab}
            onCheckedNumChange={setCheckedNum}
            listData={filteredListData}
            setListData={setListData}
          />

          {/* 페이지네이션*/}
          <PageNation />
        </PermissionBoard>
      </BackofficePage>
    </>
  );
};

export default Admin;
