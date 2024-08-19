'use client';

import { usePermissionDataQuery } from '@/api/admin/useQuery';
import BackOfficeButton from '@/components/atoms/backOfficeButton';
import CategoryBox from '@/components/atoms/category/categoryBox';
import NoDataList from '@/components/atoms/category/noDataList';
import PageNation from '@/components/atoms/category/pageNation';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import AuthFilteredList from '@/components/pages/admin/AuthFilteredList';
import CategoryFiltered from '@/components/pages/admin/categoryFiltered';
import BackofficePage from '@/components/pages/backofficePage';
import { setAllAdminIds } from '@/redux/slice/adminCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { AdminDataInfoType, AdminListInfoType } from '@/types/admin.types';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';

const Admin = () => {
  /*이름 검색 */
  // const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [filters, setFilters] = useState({
    trackRole: '',
    sort: 'DATE_LATELY',
    searchPeriod: '',
    email: '',
  });

  const { trackRole } = useAppSelector((state) => state.authSlice);

  const { boardList } = usePermissionDataQuery(filters);
  const viewList = boardList?.data?.content;

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  /*검색 */
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = () => {
    const value = inputRef.current?.value ?? '';
    // setSearchTerm(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      email: value,
    }));
  };

  /*이름 검색*/
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     handleSearchChange();
  //   }
  // };

  // const namefiltered = viewList?.filter((item: AdminListInfoType) =>
  //   item?.username?.includes(searchTerm.toLowerCase()),
  // );

  /*이름 검색*/

  const handleCategoryChange = (category: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  /*체크박스*/
  const dispatch = useAppDispatch();
  const adminIds = useAppSelector((state) => state.adminCheckBoxSlice.adminIds);
  //id 추가
  const dataList = viewList?.map((item: AdminListInfoType) => ({
    ...item,
    adminId: item.email,
  }));

  const filteredData = dataList?.filter(
    (item: AdminDataInfoType) =>
      selectedTab === 'All' || item.auth === selectedTab,
  );

  const handleAllCheck = (checked: boolean) => {
    //체크한 id 목록들
    const currentPagePostIds = dataList.map(
      (item: AdminDataInfoType) => item.adminId,
    );
    dispatch(setAllAdminIds({ adminIds: currentPagePostIds, checked }));
  };

  const isAllChecked =
    dataList?.length > 0 &&
    dataList?.every((item: AdminDataInfoType) =>
      adminIds.includes(item.adminId),
    );

  const { adminIds: checkedAdminIds } = useAppSelector(
    (state) => state.adminCheckBoxSlice,
  );
  /*체크박스*/

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

  useEffect(() => {
    handleSearchChange();
  }, [filters.email]);

  return (
    <>
      <BackofficePage>
        {/* 검색바 */}
        <SearchBar
          ref={inputRef}
          onChange={handleSearchChange}
          // onKeyDown={handleKeyDown}
        />

        {/* 게시판 */}
        <PermissionBoard>
          {/* 탭 메뉴 */}
          <TapMenu onTabChange={handleTabChange} />

          {/* 카테고리 */}
          <CategoryFiltered
            trackRole={trackRole}
            handleCategoryChange={handleCategoryChange}
          />

          {/* 조회 리스트 */}
          <div>
            {checkedAdminIds.length > 0 && (
              <section className="flex flex-row gap-[8px]">
                <p className="flex h-[37px] w-[83px] items-center text-secondary-400">
                  {checkedAdminIds.length}개 선택
                </p>
                <BackOfficeButton>승인</BackOfficeButton>
                <BackOfficeButton variant="secondary">거절</BackOfficeButton>
              </section>
            )}
          </div>
          <CategoryBox
            text=""
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={isAllChecked}
          />
          <br />
          {viewList?.length > 0 ? (
            <AuthFilteredList data={filteredData} />
          ) : (
            <NoDataList />
          )}

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
