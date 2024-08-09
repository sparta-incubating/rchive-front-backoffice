'use client';

import PageNation from '@/components/atoms/category/pageNation';
import PostFilterCategory from '@/components/atoms/category/postFilterCategory';
import PostList from '@/components/atoms/category/postList';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import { DateRangePicker } from '@/components/molecules/dateRangePicker';
import BackofficePage from '@/components/pages/backofficePage';
import { tabArr } from '@/constants/permission.constant';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import useSearchTutor from '@/hooks/useSearchTutor';
import { useAppSelector } from '@/redux/storeConfig';
import { PostListResponse, SearchParamsType } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface PostListProps {
  searchParams: SearchParamsType;
  postListData: PostListResponse;
  periodData: SelectOptionType[];
}

const PostListPage = ({
  searchParams,
  postListData,
  periodData,
}: PostListProps) => {
  const router = useRouter();

  const {
    trackName,
    period: loginPeriod,
    trackRole: loginTrackRole,
  } = useAppSelector((state) => state.authSlice);

  const [checkedNum, setCheckedNum] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  // 기수
  const [searchPeriod, setSearchPeriod] = useState<string>(
    searchParams?.searchPeriod ||
      (loginTrackRole === 'APM' ? loginPeriod : '0'),
  );

  // 튜터
  const getFetchTutors = useSearchTutor(trackName, loginPeriod, searchPeriod);

  // 공개여부
  const isOpenedOptionsData: SelectOptionType[] = [
    { value: 'all', label: '전체', selected: true },
    { value: 'true', label: '공개', selected: false },
    { value: 'false', label: '비공개', selected: false },
  ];

  // 제목
  const { searchInputRef, searchKeyword, handleSearchKeyDown } =
    useSearchKeyword(searchParams?.title);

  // 기간 조회
  const [date, setDate] = useState<DateRange | undefined>();

  const handleDateChange = (date: DateRange | undefined) => {
    setDate(date);
    updateQueryParams('date', date);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams('page', page);
  };

  // URL 파라미터를 유지하면서 업데이트하는 함수
  const updateQueryParams = (
    key: string,
    value: string | number | DateRange | undefined,
  ) => {
    const query = new URLSearchParams(window.location.search);

    if (key === 'date' && value) {
      const dateRange = value as DateRange;
      if (dateRange.from)
        query.set('startDate', dayjs(dateRange.from).format('YYYY-MM-DD'));
      if (dateRange.to)
        query.set('endDate', dayjs(dateRange.to).format('YYYY-MM-DD'));
    } else if (value) {
      query.set(key, String(value));
    } else {
      query.delete(key);
    }

    if (key !== 'page') {
      setCurrentPage(1);
      query.set('page', '1'); // 필터 변경 시 페이지를 1로 초기화
    }

    router.push(`/posts?${query.toString()}`);
  };

  return (
    <BackofficePage>
      <SearchBar
        placeholder="제목을 입력해주세요."
        ref={searchInputRef}
        onKeyDown={(e) => {
          handleSearchKeyDown(e);
          if (e.key === 'Enter') {
            updateQueryParams('title', e.currentTarget.value);
          }
        }}
      />

      {/* 게시판 */}
      <PermissionBoard>
        {/* 탭메뉴 */}
        <TapMenu
          data={tabArr}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          listData={[]}
        />

        <section className="px-9 py-6">
          {/* 카테고리 */}
          <section className="mx-auto my-[24px] flex w-[1012px] flex-row justify-between">
            <section className="flex flex-row gap-2.5">
              {/* period */}
              {loginTrackRole === 'PM' && (
                <PostFilterCategory
                  label="기수"
                  filterData={periodData}
                  defaultValue={searchParams?.searchPeriod || '0'}
                  setValue={(value) => {
                    setSearchPeriod(value);
                    updateQueryParams('searchPeriod', value);
                  }}
                />
              )}

              {/* tutor */}
              <PostFilterCategory
                label="튜터"
                filterData={getFetchTutors || []}
                defaultValue={searchParams?.tutorId || '0'}
                setValue={(value) => {
                  updateQueryParams('tutorId', value);
                }}
                disabled={
                  loginTrackRole === 'PM' ? searchPeriod === '0' : false
                }
              />

              {/* range date */}
              <DateRangePicker date={date} setDate={handleDateChange} />

              {/* isOpened */}
              <PostFilterCategory
                label="공개여부"
                filterData={isOpenedOptionsData}
                defaultValue={searchParams?.isOpened || '0'}
                setValue={(value) => {
                  updateQueryParams('isOpened', value);
                }}
              />
            </section>
          </section>

          {/* 조회 */}
          <PostList
            activeTab={activeTab}
            onCheckedNumChange={setCheckedNum}
            postListData={postListData}
          />

          {/* 페이지네이션 */}
          <PageNation
            currentPage={currentPage}
            totalElements={postListData.data.totalElements}
            size={postListData.data.size}
            onPageChange={handlePageChange}
          />
        </section>
      </PermissionBoard>
    </BackofficePage>
  );
};

export default PostListPage;
