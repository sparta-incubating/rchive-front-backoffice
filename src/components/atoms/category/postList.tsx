'use client';

import Button from '@/components/atoms/button';
import PostTableHeader from '@/components/atoms/category/postTableHeader';
import PostsTableRow from '@/components/atoms/postsTableRow';
import { postHeaders } from '@/constants/permission.constant';
import { PostListResponse } from '@/types/posts.types';
import { useState } from 'react';

interface PermissionListProps {
  onCheckedNumChange: (num: number) => void;
  activeTab: number;
  postListData: PostListResponse;
}

const PostList = ({
  onCheckedNumChange,
  activeTab,
  postListData,
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
    const newCheckedList = checked
      ? postListData.data.content.map((item) => item.postId)
      : [];
    setCheckedListById(newCheckedList);
    onCheckedNumChange(newCheckedList.length);
  };

  const isAllChecked =
    postListData.data.content.length > 0 &&
    checkedNum === postListData.data.content.length;

  return (
    <section className="mx-auto my-[24px] h-[568px] w-full">
      <table className="table-auto">
        <PostTableHeader
          variant="postList"
          headers={postHeaders}
          handleAllCheck={handleAllCheck}
          isAllChecked={isAllChecked}
        />
        <tbody>
          {postListData.data.content.length === 0 ? (
            <tr>
              <td colSpan={postHeaders.length}>
                <p>최근에 작성된 게시물이 없어요</p>
                <Button>작성하기</Button>
              </td>
            </tr>
          ) : (
            postListData.data.content.map((item) => (
              <PostsTableRow key={item.postId} postData={item} />
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default PostList;
