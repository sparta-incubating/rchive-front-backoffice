'use client';

import CategoryBox from '@/components/atoms/category/categoryBox';
import PostIsOpenSelectBoxCategory from '@/components/atoms/category/postIsOpenSelectBoxCategory';
import { setPostId } from '@/redux/slice/postCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { PostContentType } from '@/types/posts.types';
import { getNameCategory } from '@/utils/setAuthInfo/post.util';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface PostsTableRowProps {
  postData: PostContentType;
}

const PostsTableRow = ({ postData }: PostsTableRowProps) => {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector((state) => state.postCheckBoxSlice.postIds);

  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    dispatch(setPostId({ postId: postData.postId }));
  };

  useEffect(() => {
    setChecked(postIds.includes(postData.postId));
  }, [postIds, postData.postId]);

  return (
    <tr
      key={postData.postId}
      className="flex h-[64px] items-center border-b text-sm hover:bg-blue-50"
    >
      <td className="ml-6 mr-7 flex h-5 w-5 items-center justify-center">
        <CategoryBox text="" onChange={handleCheckChange} checked={checked} />
      </td>
      <td className="w-[65.5px] text-gray-400">
        <div className="relative h-[38px] w-full">
          <Image
            src={postData.thumbnailUrl || '/assets/icons/defaultThumbnail.png'}
            alt={postData.title}
            style={{ borderRadius: '4px' }}
            fill
          />
        </div>
      </td>
      <td className="w-60 px-4 text-gray-400">
        <Link href={'#'}>
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
            {postData.title}
          </span>
        </Link>
      </td>
      <td className="w-[153px] px-2.5 text-gray-400">
        {getNameCategory(postData.postType)}
      </td>
      <td className="w-[97px] px-2.5 text-gray-400">{postData.tutor}</td>
      <td className="w-[69px] text-gray-400">{postData.period}기</td>
      <td className="w-[137px] px-2.5 text-gray-400">
        <PostIsOpenSelectBoxCategory
          isOpen={postData.isOpened}
          postId={postData.postId}
        />
      </td>
      <td className="w-[106px] text-gray-400">{postData.uploadedAt}</td>
      <td className="w-[74px] text-gray-400"></td>
    </tr>
  );
};

export default PostsTableRow;
