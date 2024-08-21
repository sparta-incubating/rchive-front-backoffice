'use client';

import green from '@/../public/assets/icons/rectangle-green.svg';
import orange from '@/../public/assets/icons/rectangle-orange.svg';
import red from '@/../public/assets/icons/rectangle-red.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import { usePermissionList } from '@/api/admin/useMutation';
import PostIsOpenDropDown from '@/components/atoms/category/postIsOpenDropDown';
import PostIsOpenSelectBoxContainer from '@/components/atoms/category/postIsOpenSelectBoxContainer';
import PostIsOpenSelectBoxLayout from '@/components/atoms/category/postIsOpenSelectBoxLayout';
import SelectLabel from '@/components/atoms/selectLabel';
import { useAppSelector } from '@/redux/storeConfig';
import { AdminDataInfoType } from '@/types/admin.types';
import Image from 'next/image';

import { useState } from 'react';

interface PostIsOpenSelectBoxCategoryProps {
  isStatus: string;

  dataList: AdminDataInfoType;
}

const AdminSelectBoxCategory = ({
  isStatus,
  dataList,
}: PostIsOpenSelectBoxCategoryProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const { trackName: statusTrackName } = useAppSelector(
    (state) => state.authSlice,
  );

  const { postUserApproveMutate, deleteUsrRoleMutate } = usePermissionList();

  const handleClick = async (isStatus: string) => {
    const { period, trackRole, email } = dataList;

    const userInfo = {
      trackName: statusTrackName,
      period,
      trackRole,
      email,
    };
    console.log(isStatus, 'isStatus');
    console.log(userInfo, 'userInfo');
    if (isStatus === 'APPROVE') {
      try {
        postUserApproveMutate.mutate(userInfo);
      } catch (error) {
        console.log(error, '에러');
      }
    } else if (isStatus === 'REJECT') {
      deleteUsrRoleMutate.mutate(userInfo);
    }
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
        <div className="flex w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55">
          <Image
            src={isStatus === 'WAIT' ? green : red}
            alt=""
            width={8}
            height={8}
            className="mx-[14px]"
          />
          <p className="text-sm">
            {isStatus === 'WAIT' ? (
              <p onClick={() => handleClick('APPROVE')}>승인</p>
            ) : (
              <p onClick={() => handleClick('REJECT')}>거절</p>
            )}
          </p>
        </div>
        {isStatus === 'WAIT' && (
          <div className="flex h-[36px] w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55">
            <Image
              src={isStatus === 'WAIT' ? red : green}
              alt=""
              width={8}
              height={8}
              className="mx-[14px]"
            />
            <p className="text-sm">
              {isStatus === 'WAIT' ? (
                <p onClick={() => handleClick('REJECT')}>거절</p>
              ) : (
                <p onClick={() => handleClick('APPROVE')}>승인</p>
              )}
            </p>
          </div>
        )}
      </PostIsOpenDropDown>
    </PostIsOpenSelectBoxContainer>
  );
};

export default AdminSelectBoxCategory;
