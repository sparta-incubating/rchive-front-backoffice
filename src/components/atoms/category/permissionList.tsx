'use client';

import { usePermissionDataQuery } from '@/api/permission/useQuery';

const PermissionList = () => {
  const { boardList, isError, isPending } = usePermissionDataQuery(); // isPending 대신 isLoading 사용

  if (isError) {
    return <div>에러입니다</div>;
  }

  if (isPending) {
    return <div>대기중</div>;
  }

  console.log(boardList, 'List');

  return (
    <section className="mx-auto my-[24px] h-[568px] w-[1012px] border">
      <p>조회 목록</p>

      {/* {boardList.map((data) => console.log(data))} */}
    </section>
  );
};

export default PermissionList;
