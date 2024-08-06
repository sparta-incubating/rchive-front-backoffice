'use client';

import FilterCategory from '@/components/atoms/category/filterCategory';
import PageNation from '@/components/atoms/category/pageNation';
import PostList from '@/components/atoms/category/postList';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import BackofficePage from '@/components/pages/backofficePage';
import { tabArr } from '@/constants/permission.constant';
import { SearchParamsType } from '@/types/posts.types';
import React, { useCallback, useRef, useState } from 'react';

interface PostListProps {
  searchParams: SearchParamsType;
}

const PostListPage = ({ searchParams }: PostListProps) => {
  const [checkedNum, setCheckedNum] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const searchInputRef = useRef(null);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const inputElement = e.currentTarget;
        if (document.activeElement === inputElement) {
          setSearchKeyword(inputElement.value);
        }
      }
    },
    [],
  );

  return (
    <BackofficePage>
      <SearchBar
        placeholder="제목을 입력해주세요."
        ref={searchInputRef}
        onKeyDown={handleSearchKeyDown}
      />

      {/* 게시판 */}
      <PermissionBoard>
        {/* 탭메뉴*/}
        <TapMenu
          data={tabArr}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          listData={[]}
        />

        {/* 카테고리 */}
        <section className="mx-auto my-[24px] flex w-[1012px] flex-row justify-between">
          {/* 카테고리 */}
          <section className="flex flex-row gap-2.5">
            <FilterCategory />
            <FilterCategory />
          </section>
        </section>

        {/* 조회*/}
        <PostList activeTab={activeTab} onCheckedNumChange={setCheckedNum} />

        {/* 페이지네이션*/}
        <PageNation />
      </PermissionBoard>
    </BackofficePage>
  );
};

export default PostListPage;
