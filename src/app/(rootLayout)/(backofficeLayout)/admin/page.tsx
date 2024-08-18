'use client';

import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import BackofficePage from '@/components/pages/backofficePage';

const Admin = () => {
  return (
    <>
      <BackofficePage>
        {/* 검색바 */}
        <SearchBar />

        {/* 게시판 */}
        <PermissionBoard>
          <TapMenu />
        </PermissionBoard>
      </BackofficePage>
    </>
  );
};

export default Admin;
