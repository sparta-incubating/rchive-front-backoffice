const Admin = () => {
  return (
    <div>
      <h1>권한 설정 </h1>
      <input type="text" placeholder="이름 또는 이메일로 사용자 검색" />
      <div>
        <span>전체</span>
        <span>대기중</span>
        <span>승인</span>
      </div>
    </div>
  );
};

export default Admin;
