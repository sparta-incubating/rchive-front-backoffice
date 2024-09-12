'use client';

import Button from '@/components/atoms/button';
import PostTableHeader from '@/components/atoms/category/postTableHeader';
import PostsTableRow from '@/components/atoms/postsTableRow';
import { postHeaders } from '@/constants/permission.constant';
import { setAllPostIds } from '@/redux/slice/postCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { PostContentType } from '@/types/posts.types';
import { useRouter } from 'next/navigation';

interface PostListProps {
  postListData: PostContentType[];
}

const PostList = ({ postListData }: PostListProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const postIds = useAppSelector((state) => state.postCheckBoxSlice.postIds);

  const handleAllCheck = (checked: boolean) => {
    const currentPagePostIds = postListData.map((item) => item.postId);
    dispatch(setAllPostIds({ postIds: currentPagePostIds, checked }));
  };

  const isAllChecked =
    postListData.length > 0 &&
    postListData.every((item) => postIds.includes(item.postId));

  return (
    <section className="mx-auto my-[24px] h-[512px] w-full">
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
                <div className="flex h-[568px] w-[1012px]">
                  <div className="m-auto flex flex-col gap-6">
                    <p className="text-center text-lg font-semibold">
                      최근에 작성된 게시물이 없어요
                    </p>
                    <Button
                      className="mx-auto"
                      variant="submit"
                      size="sm"
                      onClick={() => router.push('/posts/write')}
                    >
                      게시물 작성하기
                    </Button>
                  </div>
                </div>
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
