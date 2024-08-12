'use client';

import gray from '@/../public/assets/icons/rectangle-gray.svg';
import green from '@/../public/assets/icons/rectangle-green.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import PostIsOpenDropDown from '@/components/atoms/category/postIsOpenDropDown';
import PostIsOpenSelectBoxContainer from '@/components/atoms/category/postIsOpenSelectBoxContainer';
import PostIsOpenSelectBoxLayout from '@/components/atoms/category/postIsOpenSelectBoxLayout';
import SelectLabel from '@/components/atoms/selectLabel';
import usePostIsOpenUpdate from '@/hooks/usePostIsOpenUpdate';
import { updateIsOpen } from '@/redux/slice/posts.slice';
import { useAppDispatch } from '@/redux/storeConfig';
import Image from 'next/image';
import { useState } from 'react';

interface PostIsOpenSelectBoxCategoryProps {
  isOpen: boolean;
  postId: string;
}

const PostIsOpenSelectBoxCategory = ({
  isOpen,
  postId,
}: PostIsOpenSelectBoxCategoryProps) => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const updatePostsIsOpen = usePostIsOpenUpdate();

  const handleClick = async (data: boolean) => {
    await updatePostsIsOpen([Number(postId)], data);
    dispatch(updateIsOpen({ postIds: [Number(postId)], isOpen: data }));
    setShowOptions(false);
  };

  return (
    <PostIsOpenSelectBoxContainer
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <PostIsOpenSelectBoxLayout>
        <Image
          src={isOpen ? green : gray}
          width={8}
          height={8}
          alt={isOpen ? '공개' : '비공개'}
        />
        <SelectLabel>{isOpen ? '공개' : '비공개'}</SelectLabel>
        <Image src={arrow} width={12} height={12} alt="화살표" />
      </PostIsOpenSelectBoxLayout>
      <PostIsOpenDropDown
        variant="permission"
        show={showOptions}
        className="bottom-0"
      >
        <div
          className="flex h-[36px] w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55"
          onClick={() => handleClick(!isOpen)}
        >
          <Image
            src={isOpen ? gray : green}
            alt={isOpen ? '비공개' : '공개'}
            width={8}
            height={8}
            className="mx-[14px]"
          />
          <p className="text-sm">{isOpen ? '비공개' : '공개'}</p>
        </div>
      </PostIsOpenDropDown>
    </PostIsOpenSelectBoxContainer>
  );
};

export default PostIsOpenSelectBoxCategory;
