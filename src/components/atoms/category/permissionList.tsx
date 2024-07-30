'use client';

import { usePermissionDataQuery } from '@/api/permission/useQuery';
import NoDataList from './noDataList';

const headers = [
  { label: '이름', key: 'name', className: 'w-[88px] pl-[10px] text-gray-400' },
  { label: '직책', key: 'job', className: 'w-[88px] pl-[10px] text-gray-400' },
  {
    label: '기수',
    key: 'track',
    className: 'w-[88px] pl-[10px] text-gray-400',
  },
  {
    label: '이메일',
    key: 'email',
    className: 'w-[200px] pl-[16px] text-gray-400',
  },
  { label: '요청날짜', key: 'date', className: 'w-[128px] text-gray-400' },
  {
    label: '승인상태',
    key: 'permission',
    className: 'w-[112px] pl-[10px] text-gray-400',
  },
];

const PermissionList = () => {
  const { boardList, isError, isPending } = usePermissionDataQuery();

  if (isError) {
    return <div>에러입니다</div>;
  }

  if (isPending) {
    return <div>대기중</div>;
  }

  console.log(boardList, 'List');
  const listData = boardList.data.content;
  console.log(listData);

  return (
    <section className="mx-auto my-[24px] h-[568px] w-[1012px]">
      <table>
        <thead>
          <tr className="flex h-[64px] flex-row items-center gap-[42px] border-b-2">
            <td className="w-[56px]">체크</td>
            {headers.map((header, index) => (
              <td key={index} className={`${header.className}`}>
                {header.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {data.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.created_at).toLocaleDateString()}</td>
            </tr>
          ))} */}
          <tr>
            {listData ? (
              <>
                <tr className="flex h-[64px] flex-row items-center gap-[42px] border-b-2 hover:bg-blue-50">
                  <td className="w-[56px]">체크</td>
                  <td className="w-[88px] pl-[10px]">김대길</td>
                  <td className="w-[88px] pl-[10px]">수강생</td>
                  <td className="w-[88px] pl-[10px]">1기</td>
                  <td className="w-[200px] pl-[16px]">1234@gmail.com</td>
                  <td className="w-[128px]">2024-07-05</td>
                  <td className="w-[112px] pl-[10px]">승인상태</td>
                </tr>
              </>
            ) : (
              <NoDataList />
            )}
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default PermissionList;
