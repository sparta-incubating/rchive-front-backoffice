import BackOfficeButton from '@/components/atoms/backOfficeButton';
import SearchBar from '@/components/atoms/searchBar';

const Admin = () => {
  return (
    <div>
      <h1>권한 설정 </h1>
      <SearchBar />
      <br />
      <div className="flex w-[250px] justify-between">
        <BackOfficeButton>승인</BackOfficeButton>
        <BackOfficeButton variant="secondary">거절</BackOfficeButton>
        <BackOfficeButton variant="nondisclosure">비공개</BackOfficeButton>
      </div>

      <div>
        <span>전체</span>
        <span>대기중</span>
        <span>승인</span>
      </div>
    </div>
  );
};

export default Admin;
