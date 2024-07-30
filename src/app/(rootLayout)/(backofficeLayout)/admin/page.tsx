import BackOfficeButton from '@/components/atoms/backOfficeButton';
import InquiryButton from '@/components/atoms/inquiryButton';
import OfficeCategory from '@/components/atoms/officeCategory';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';

const Admin = () => {
  return (
    <>
      <main className="flex w-full flex-col items-center bg-blue-55 p-4">
        <section className="mx-auto">
          {/* 헤더 */}
          <section className="flex h-[96px] w-[1084px] items-center justify-between">
            <p className="pt-[40px] text-[28px] font-bold">권한 설정</p>
            <InquiryButton />
          </section>
          {/* 헤더 */}
          {/* 검색바 */}
          <section>
            <SearchBar />
          </section>
          {/* 검색바 */}
          <br />
          <section>
            {/* 게시판 */}
            <PermissionBoard>
              {/* 카테고리 */}
              <section>
                <OfficeCategory />
              </section>
              {/* 버튼 */}
              <section>
                <BackOfficeButton>승인</BackOfficeButton>
                <BackOfficeButton variant="secondary">거절</BackOfficeButton>
                <BackOfficeButton variant="nondisclosure">
                  비공개
                </BackOfficeButton>
              </section>
            </PermissionBoard>
            {/* 게시판 */}
          </section>
        </section>
      </main>
    </>
  );
};

export default Admin;
