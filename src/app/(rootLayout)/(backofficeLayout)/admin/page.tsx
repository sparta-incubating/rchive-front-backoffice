import BackOfficeButton from '@/components/atoms/backOfficeButton';
import PageNation from '@/components/atoms/category/pageNation';
import PermissionList from '@/components/atoms/category/permissionList';
import TapMenu from '@/components/atoms/category/tapMenu';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import PermissionHeader from '@/components/molecules/permissionHeader';

const Admin = () => {
  return (
    <>
      <main className="flex w-full flex-col items-center bg-blue-55 p-4">
        <section className="mx-auto">
          {/* 헤더 */}
          <PermissionHeader />

          {/* 검색바 */}

          <SearchBar />

          {/* 게시판 */}
          <PermissionBoard>
            {/* 탭메뉴*/}
            <TapMenu />
            {/* 카테고리 */}
            <section className="mx-auto my-[24px] flex w-[1012px] flex-row justify-between border">
              {/* 카테고리 */}
              {/* <OfficeCategory /> */}
              <p>카테고리</p>
              {/* 버튼 */}
              <section className="flex flex-row gap-[8px]">
                <p className="flex h-[37px] w-[83px] items-center text-secondary-500">
                  1개 선택됨
                </p>
                <BackOfficeButton>승인</BackOfficeButton>
                <BackOfficeButton variant="secondary">거절</BackOfficeButton>
              </section>
            </section>

            {/* 조회*/}
            <PermissionList />

            {/* 페이지네이션*/}
            <PageNation />
          </PermissionBoard>
        </section>
      </main>
    </>
  );
};

export default Admin;
