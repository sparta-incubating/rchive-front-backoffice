'use client';

import Button from '@/components/atoms/button';
import PostTableHeader from '@/components/atoms/category/postTableHeader';
import PostsTableRow from '@/components/atoms/postsTableRow';
import { postHeaders } from '@/constants/permission.constant';
import { setAllPostIds } from '@/redux/slice/postCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';

const PostList = () => {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector((state) => state.postCheckBoxSlice.postIds);
  const postListData = useAppSelector((state) => state.postsSlice.posts);

  const handleAllCheck = (checked: boolean) => {
    const currentPagePostIds = postListData.map((item) => item.postId);
    dispatch(setAllPostIds({ postIds: currentPagePostIds, checked }));
  };

  const isAllChecked =
    postListData.length > 0 &&
    postListData.every((item) => postIds.includes(item.postId));

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
          {postListData.length === 0 ? (
            <tr>
              <td colSpan={postHeaders.length}>
                <p>최근에 작성된 게시물이 없어요</p>
                <Button>작성하기</Button>
              </td>
            </tr>
          ) : (
            postListData.map((item) => (
              <PostsTableRow key={item.postId} postData={item} />
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default PostList;
