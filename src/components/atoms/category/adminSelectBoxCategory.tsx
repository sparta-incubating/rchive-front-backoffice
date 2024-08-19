'use client';

import green from '@/../public/assets/icons/rectangle-green.svg';
import orange from '@/../public/assets/icons/rectangle-orange.svg';
import red from '@/../public/assets/icons/rectangle-red.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import PostIsOpenDropDown from '@/components/atoms/category/postIsOpenDropDown';
import PostIsOpenSelectBoxContainer from '@/components/atoms/category/postIsOpenSelectBoxContainer';
import PostIsOpenSelectBoxLayout from '@/components/atoms/category/postIsOpenSelectBoxLayout';
import SelectLabel from '@/components/atoms/selectLabel';
import usePostIsOpenUpdate from '@/hooks/usePostIsOpenUpdate';
import Image from 'next/image';
import { useState } from 'react';

interface PostIsOpenSelectBoxCategoryProps {
  isStatus: string;
  statusId: number;
}

const AdminSelectBoxCategory = ({
  isStatus,
  statusId,
}: PostIsOpenSelectBoxCategoryProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const updatePostsIsOpen = usePostIsOpenUpdate();

  const handleClick = async (data: boolean) => {
    // await updatePostsIsOpen([Number(postId)], data);
    alert(statusId);
    setShowOptions(false);
  };

  return (
    <PostIsOpenSelectBoxContainer
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <PostIsOpenSelectBoxLayout>
        <Image
          src={isStatus === 'WAIT' ? orange : green}
          width={8}
          height={8}
          alt=""
        />
        <SelectLabel>{isStatus === 'WAIT' ? '대기' : '승인'}</SelectLabel>
        <Image src={arrow} width={12} height={12} alt="화살표" />
      </PostIsOpenSelectBoxLayout>
      <PostIsOpenDropDown
        variant="permission"
        show={showOptions}
        className="bottom-0"
      >
        <div
          className="flex h-[36px] w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55"
          onClick={() => handleClick(!isStatus)}
        >
          <Image
            src={isStatus === 'WAIT' ? green : red}
            alt=""
            width={8}
            height={8}
            className="mx-[14px]"
          />
          <p className="text-sm">
            {isStatus === 'WAIT' ? (
              <p onClick={() => alert('승인')}>승인</p>
            ) : (
              <p onClick={() => alert('거절')}>거절</p>
            )}
          </p>
        </div>
        {isStatus === 'WAIT' && (
          <div
            className="flex h-[36px] w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55"
            onClick={() => handleClick(!isStatus)}
          >
            <Image
              src={isStatus === 'WAIT' ? red : green}
              alt=""
              width={8}
              height={8}
              className="mx-[14px]"
            />
            <p className="text-sm">
              {isStatus === 'WAIT' ? (
                <p onClick={() => alert('거절')}>거절</p>
              ) : (
                <p onClick={() => alert('승인')}>승인</p>
              )}
            </p>
          </div>
        )}
      </PostIsOpenDropDown>
    </PostIsOpenSelectBoxContainer>
  );
};

export default AdminSelectBoxCategory;
