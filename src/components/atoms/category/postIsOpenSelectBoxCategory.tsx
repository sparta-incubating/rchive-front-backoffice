'use client';

import gray from '@/../public/assets/icons/rectangle-gray.svg';
import green from '@/../public/assets/icons/rectangle-green.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import PostIsOpenDropDown from '@/components/atoms/category/postIsOpenDropDown';
import PostIsOpenSelectBoxContainer from '@/components/atoms/category/postIsOpenSelectBoxContainer';
import PostIsOpenSelectBoxLayout from '@/components/atoms/category/postIsOpenSelectBoxLayout';
import SelectLabel from '@/components/atoms/selectLabel';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
import usePostIsOpenUpdate from '@/hooks/usePostIsOpenUpdate';
import Image from 'next/image';

interface PostIsOpenSelectBoxCategoryProps {
  isOpen: boolean;
  postId: string;
}

const PostIsOpenSelectBoxCategory = ({
  isOpen,
  postId,
}: PostIsOpenSelectBoxCategoryProps) => {
  const {
    isOpen: showOptions,
    setIsOpen: setShowOptions,
    dropdownRef,
    handleClick: handleDropdownClick,
  } = useDropDownOutsideClick();

  const updatePostsIsOpen = usePostIsOpenUpdate();

  const handleClick = async (data: boolean) => {
    await updatePostsIsOpen([Number(postId)], data);
    setShowOptions(false);
  };

  return (
    <PostIsOpenSelectBoxContainer
      ref={dropdownRef}
      onClick={handleDropdownClick}
    >
      <PostIsOpenSelectBoxLayout>
        <Image
          src={isOpen ? green : gray}
          width={8}
          height={8}
          alt={isOpen ? '공개' : '비공개'}
        />
        <SelectLabel>{isOpen ? '공개' : '비공개'}</SelectLabel>
        <Image
          src={arrow}
          width={12}
          height={12}
          alt="화살표"
          className={`transition-transform duration-500 ${
            showOptions ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </PostIsOpenSelectBoxLayout>
      <PostIsOpenDropDown
        variant="permission"
        show={showOptions}
        className="bottom-0"
        backdropClassname="rounded-[8px]"
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
          <p className="text-sm text-gray-900">{isOpen ? '비공개' : '공개'}</p>
        </div>
      </PostIsOpenDropDown>
    </PostIsOpenSelectBoxContainer>
  );
};

export default PostIsOpenSelectBoxCategory;
