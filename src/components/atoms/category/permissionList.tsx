'use client';

import { permissionHeaders } from '@/constants/permission.constant';
import { useState } from 'react';
import NoDataList from './noDataList';
import TableHeader from './tableHeader';
import TableRow from './tableRow';

const mockData = [
  {
    id: 1,
    name: '홍길동',
    job: '팀장',
    track: '1기',
    email: 'hong@example.com',
    date: '2024-07-31',
    permission: '승인',
  },
  {
    id: 2,
    name: '김철수',
    job: '사원',
    track: '2기',
    email: 'kim@example.com',
    date: '2024-07-30',
    permission: '대기',
  },
  {
    id: 3,
    name: '이영희',
    job: '부장',
    track: '3기',
    email: 'lee@example.com',
    date: '2024-07-29',
    permission: '거부',
  },
  {
    id: 4,
    name: '박지민',
    job: '대리',
    track: '4기',
    email: 'park@example.com',
    date: '2024-07-28',
    permission: '승인',
  },
  {
    id: 5,
    name: '최수빈',
    job: '사원',
    track: '5기',
    email: 'choi@example.com',
    date: '2024-07-27',
    permission: '대기',
  },
];
interface PermissionListProps {
  onCheckedNumChange: (num: number) => void;
}

const PermissionList = ({ onCheckedNumChange }: PermissionListProps) => {
  const [listData, setListData] = useState(mockData);
  const [checkedListById, setCheckedListById] = useState<number[]>([]);
  const checkedNum = checkedListById.length;

  const handleCheckChange = (id: number) => {
    setCheckedListById((prev) => {
      const newCheckedList = prev.includes(id)
        ? prev.filter((el) => el !== id)
        : [...prev, id];
      onCheckedNumChange(newCheckedList.length);
      return newCheckedList;
    });
  };

  const handleAllCheck = (checked: boolean) => {
    const newCheckedList = checked ? listData?.map((item: any) => item.id) : [];
    setCheckedListById(newCheckedList);
    onCheckedNumChange(newCheckedList.length);
  };

  console.log(checkedNum, '???');

  // const { boardList, isError, isPending } = usePermissionDataQuery();

  // if (isError) {
  //   return <div>에러입니다</div>;
  // }

  // if (isPending) {
  //   return <div>대기중</div>;
  // }

  // console.log(boardList, 'List');
  // const listData = boardList.data.content;
  // console.log(listData);
  return (
    <>
      <section className="mx-auto my-[24px] h-[568px] w-[1012px]">
        <table>
          <TableHeader
            headers={permissionHeaders}
            handleAllCheck={handleAllCheck}
            isAllChecked={checkedNum === listData.length}
          />
          <tbody>
            {listData ? (
              listData.map((item) => (
                <TableRow
                  key={item.id}
                  data={item}
                  headers={permissionHeaders}
                  checkedListById={checkedListById}
                  onCheckChange={handleCheckChange}
                />
              ))
            ) : (
              <NoDataList />
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default PermissionList;
