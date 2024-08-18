'use client';

import BackOfficeButton from '@/components/atoms/backOfficeButton';
import PostList from '@/components/atoms/category/postList';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import BackofficePage from '@/components/pages/backofficePage';
import { useState } from 'react';

const Post = () => {
  const [checkedNum, setCheckedNum] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // updateQueryParams('page', page);
  };

  return (
    <>
      <BackofficePage>
        <SearchBar />

        {/* 게시판 */}
        <PermissionBoard>
          {/* 탭메뉴*/}
          <TapMenu
            data={subArr || ''}
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
              <BackOfficeButton>공개</BackOfficeButton>
              <BackOfficeButton variant="nondisclosure">
                비공개
              </BackOfficeButton>
            </section>
          </section>

          {/* 조회*/}
          <PostList activeTab={activeTab} onCheckedNumChange={setCheckedNum} />

          {/* 페이지네이션*/}
        </PermissionBoard>
      </BackofficePage>
    </>
  );
};
export default Post;
