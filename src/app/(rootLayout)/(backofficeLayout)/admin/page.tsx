'use client';

import { usePermissionDataQuery } from '@/api/admin/useQuery';
import BackOfficeButton from '@/components/atoms/backOfficeButton';
import AuthFilterCategory from '@/components/atoms/category/AuthCategory';
import CategoryBox from '@/components/atoms/category/categoryBox';
import NoDataList from '@/components/atoms/category/noDataList';
import PageNation from '@/components/atoms/category/pageNation';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import AuthFilteredList from '@/components/pages/admin/AuthFilteredList';
import BackofficePage from '@/components/pages/backofficePage';
import { setAllAdminIds } from '@/redux/slice/adminCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { AdminDataInfoType, AdminListInfoType } from '@/types/admin.types';
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

  // const filteredData = viewList?.filter(
  //   (item: AdminDataInfoType) =>
  //     selectedTab === 'All' || item.auth === selectedTab,
  // );

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
