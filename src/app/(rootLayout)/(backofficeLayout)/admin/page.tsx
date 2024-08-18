'use client';

import { AdminDataInfoType } from '@/api/admin/adminApi';
import { usePermissionDataQuery } from '@/api/admin/useQuery';
import PageNation from '@/components/atoms/category/pageNation';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import AuthFilteredList from '@/components/pages/admin/AuthFilteredList';
import BackofficePage from '@/components/pages/backofficePage';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const { boardList } = usePermissionDataQuery();
  const viewList = boardList?.data?.content;

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const filteredData = viewList?.filter(
    (item: AdminDataInfoType) =>
      selectedTab === 'All' || item.auth === selectedTab,
  );

  {
    /*페이지 네이션 */
  }
  const router = useRouter();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page);
  };

  const updateQueryParams = (
    key: string,
    value: string | number | DateRange | undefined,
  ) => {
    const query = new URLSearchParams(window.location.search);

    if (key === 'date' && value) {
      const dateRange = value as DateRange;
      console.log({ dateRange });
      if (dateRange.from)
        query.set('startDate', dayjs(dateRange.from).format('YYYY-MM-DD'));
      if (dateRange.to)
        query.set('endDate', dayjs(dateRange.to).format('YYYY-MM-DD'));
    } else if (key === 'date' && !value) {
      query.delete('startDate');
      query.delete('endDate');
    } else if (value) {
      query.set(key, String(value));
    } else {
      query.delete(key);
    }
    if (key !== 'page') {
      setCurrentPage(1);
      query.set('page', '1');
    }

    router.push(`/admin?${query.toString()}`);
  };

  return (
    <>
      <BackofficePage>
        {/* 검색바 */}
        <SearchBar />

        {/* 게시판 */}
        <PermissionBoard>
          <TapMenu onTabChange={handleTabChange} />
          <br />

          <AuthFilteredList data={filteredData} />
          {/* <FilterCategory /> */}
          {/* <AuthCategory label="직책" data={roleCategory} />
          <AuthCategory label="최신순" data={sortCategory} /> */}

          <PageNation
            currentPage={currentPage}
            totalElements={boardList?.data?.totalElements}
            size={boardList?.data?.size}
            onPageChange={handlePageChange}
          />
        </PermissionBoard>
      </BackofficePage>
    </>
  );
};

export default Admin;
