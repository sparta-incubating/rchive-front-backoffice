'use client';

import { Button } from '@/components/ui/button';
import { postHeaders } from '@/constants/permission.constant';
import { useState } from 'react';
import TableHeader from './tableHeader';
import TableRow from './tableRow';

interface PermissionListProps {
  onCheckedNumChange: (num: number) => void;
  activeTab: number;
}

const PostList = ({ onCheckedNumChange, activeTab }: PermissionListProps) => {
  const [listData, setListData] = useState('');
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

  const isAllChecked = listData.length > 0 && checkedNum === listData.length;

  return (
    <>
      <section className="mx-auto my-[24px] h-[568px] w-[1012px]">
        <table>
          <TableHeader
            variant="postList"
            headers={postHeaders}
            handleAllCheck={handleAllCheck}
            isAllChecked={isAllChecked}
          />
          <tbody>
            {listData ? (
              listData.map((item) => (
                <TableRow
                  key={item.id}
                  data={item}
                  headers={postHeaders}
                  checkedListById={checkedListById}
                  onCheckChange={handleCheckChange}
                  variant="postList"
                />
              ))
            ) : (
              <>
                <p>최근에 작성된 게시물이 없어요</p>
                <Button>작성하기</Button>
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default PostList;
