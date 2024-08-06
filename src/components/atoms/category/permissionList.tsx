'use client';

import { permissionHeaders } from '@/constants/permission.constant';
import { useState } from 'react';
import NoDataList from './noDataList';
import TableHeader from './tableHeader';
import TableRow from './tableRow';

interface PermissionListProps {
  onCheckedNumChange: (num: number) => void;
  activeTab: number;
  listData: any[];
  setListData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PermissionList = ({
  onCheckedNumChange,
  activeTab,
  listData,
  setListData,
}: PermissionListProps) => {
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

  const handlePermissionChange = (id: number, newPermission: string) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, permission: newPermission } : item,
      ),
    );
  };

  const isAllChecked = listData.length > 0 && checkedNum === listData.length;

  const filteredListData = listData.filter((item) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return item.permission === '대기';
    if (activeTab === 2) return item.permission === '승인';
    return false;
  });
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
            isAllChecked={isAllChecked}
          />
          <tbody>
            {filteredListData.length > 0 ? (
              filteredListData.map((item) => (
                <TableRow
                  key={item.id}
                  data={item}
                  headers={permissionHeaders}
                  checkedListById={checkedListById}
                  onCheckChange={handleCheckChange}
                  onPermissionChange={handlePermissionChange}
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
