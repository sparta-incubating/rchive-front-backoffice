'use client';

import { usePermissionDataQuery } from '@/api/admin/useQuery';
import AuthFilterCategory from '@/components/atoms/category/AuthCategory';
import NoDataList from '@/components/atoms/category/noDataList';
import PageNation from '@/components/atoms/category/pageNation';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import AuthFilteredList from '@/components/pages/admin/AuthFilteredList';
import BackofficePage from '@/components/pages/backofficePage';
import { useAppSelector } from '@/redux/storeConfig';
import { AdminDataInfoType } from '@/types/admin.types';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const Admin = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [filters, setFilters] = useState({
    trackRole: '',
    sort: 'DATE_LATELY',
    searchPeriod: '',
  });

  const { trackRole, period } = useAppSelector((state) => state.authSlice);

  const { boardList } = usePermissionDataQuery(filters);
  const viewList = boardList?.data?.content;

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const filteredData = viewList?.filter(
    (item: AdminDataInfoType) =>
      selectedTab === 'All' || item.auth === selectedTab,
  );

  /*페이지 네이션 */
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

  /*카테고리 */
  const roleCategory = [
    { id: 1, name: 'APM', value: 'APM' },
    { id: 2, name: '수강생', value: 'STUDENT' },
  ];

  const sortCategory = [
    { id: 1, name: '최신순', value: 'DATE_LATELY' },
    { id: 2, name: '가나다순', value: 'NAME_ALPHABETICALLY' },
  ];

  const periodCategory = [
    { id: 1, name: '1기', value: '1' },
    { id: 2, name: '2기', value: '2' },
  ];
  const handleCategoryChange = (category: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
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

          <div className="flex flex-row">
            <AuthFilterCategory
              label="직책"
              data={roleCategory}
              setValue={(value) => handleCategoryChange('trackRole', value)}
            />
            {trackRole === 'PM' && (
              <>
                <AuthFilterCategory
                  label="최신순"
                  data={sortCategory}
                  setValue={(value) => handleCategoryChange('sort', value)}
                />
                <AuthFilterCategory
                  label="기수"
                  data={periodCategory}
                  setValue={(value) =>
                    handleCategoryChange('searchPeriod', value)
                  }
                />
              </>
            )}
          </div>

          <br />
          {viewList?.length > 0 ? (
            <AuthFilteredList data={filteredData} />
          ) : (
            <NoDataList />
          )}

          <br />
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
