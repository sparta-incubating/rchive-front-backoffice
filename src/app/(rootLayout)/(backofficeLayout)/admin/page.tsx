import BackOfficeButton from '@/components/atoms/backOfficeButton';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';

const Admin = () => {
  return (
    <>
      <main className="flex w-full flex-col items-center bg-blue-55 p-4">
        <section className="flex h-[96px] w-[1084px] items-center justify-between">
          <p className="pt-[40px] text-[28px] font-bold">권한 설정</p>
          <p>문의하기</p>
        </section>
        <section>
          <SearchBar />
        </section>
        <br />
        <section>
          <PermissionBoard>
            <BackOfficeButton>승인</BackOfficeButton>
            <BackOfficeButton variant="secondary">거절</BackOfficeButton>
            <BackOfficeButton variant="nondisclosure">비공개</BackOfficeButton>
          </PermissionBoard>
        </section>
      </main>
    </>
  );
};

export default Admin;
