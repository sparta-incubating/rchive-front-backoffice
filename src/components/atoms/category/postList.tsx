'use client';

import Button from '@/components/atoms/button';
import PostTableHeader from '@/components/atoms/category/postTableHeader';
import PostsTableRow from '@/components/atoms/postsTableRow';
import { postHeaders } from '@/constants/permission.constant';
import { setAllPostIds } from '@/redux/slice/postCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { PostListResponse } from '@/types/posts.types';

interface PermissionListProps {
  postListData: PostListResponse;
}

const PostList = ({ postListData }: PermissionListProps) => {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector((state) => state.postCheckBoxSlice.postIds);

  const handleAllCheck = (checked: boolean) => {
    const currentPagePostIds = postListData.data.content.map(
      (item) => item.postId,
    );
    dispatch(setAllPostIds({ postIds: currentPagePostIds, checked }));
  };

  const isAllChecked =
    postListData.data.content.length > 0 &&
    postListData.data.content.every((item) => postIds.includes(item.postId));

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
