import SearchBar from '@/components/atoms/searchBar';

const Admin = () => {
  return (
    <div>
      <h1>권한 설정 </h1>
      <SearchBar />
      <div>
        <span>전체</span>
        <span>대기중</span>
        <span>승인</span>
      </div>
    </div>
  );
};

export default Admin;
