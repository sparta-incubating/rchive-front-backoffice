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
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

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
  const [tutor, setTutor] = useState<string>(searchParams?.tutorId || '0');

  // 공개여부
  const isOpenedOptionsData: SelectOptionType[] = [
    { value: 'all', label: '전체', selected: true },
    { value: 'true', label: '공개', selected: false },
    { value: 'false', label: '비공개', selected: false },
  ];

  const [isOpened, setIsOpened] = useState<string>(
    searchParams?.isOpened || '0',
  );
  // 제목
  const { searchInputRef, searchKeyword, handleSearchKeyDown } =
    useSearchKeyword(searchParams?.title);

  // 기간 조회
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const handleDateChange = useCallback((start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  const updateQueryParams = useCallback(() => {
    const query = new URLSearchParams();

    if (searchPeriod !== '0') query.set('searchPeriod', searchPeriod);
    if (tutor !== '0') query.set('tutor', tutor);
    if (isOpened !== '0') query.set('isOpened', isOpened);
    if (searchKeyword) query.set('title', searchKeyword);
    if (startDate) query.set('startDate', startDate);
    if (endDate) query.set('endDate', endDate);

    router.push(`/posts?${query.toString()}`);
  }, [
    searchPeriod,
    tutor,
    isOpened,
    searchKeyword,
    startDate,
    endDate,
    router,
  ]);

  useEffect(() => {
    updateQueryParams();
  }, [searchPeriod, tutor, isOpened, startDate, endDate, updateQueryParams]);

  return (
    <BackofficePage>
      <SearchBar
        placeholder="제목을 입력해주세요."
        ref={searchInputRef}
        onKeyDown={(e) => {
          handleSearchKeyDown(e);
          updateQueryParams();
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
                  }}
                />
              )}

              {/* tutor */}
              <PostFilterCategory
                label="튜터"
                filterData={getFetchTutors || []}
                defaultValue={searchParams?.tutorId || '0'}
                setValue={(value) => {
                  setTutor(value);
                }}
                disabled={
                  loginTrackRole === 'PM' ? searchPeriod === '0' : false
                }
              />

              {/* range date */}
              <DateRangePicker
                handleDateChange={handleDateChange}
                startDate={searchParams?.startDate}
                endDate={searchParams?.endDate}
              />

              {/* isOpened */}
              <PostFilterCategory
                label="공개여부"
                filterData={isOpenedOptionsData}
                defaultValue={searchParams?.isOpened || '0'}
                setValue={(value) => {
                  setIsOpened(value);
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
          <PageNation />
        </section>
      </PermissionBoard>
    </BackofficePage>
  );
};

export default PostListPage;
