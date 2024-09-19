'use client';

import green from '@/../public/assets/icons/rectangle-green.svg';
import orange from '@/../public/assets/icons/rectangle-orange.svg';
import red from '@/../public/assets/icons/rectangle-red.svg';
import arrow from '@/../public/assets/icons/selectArrow.svg';
import { usePermissionList } from '@/api/admin/useMutation';
import PostIsOpenSelectBoxContainer from '@/components/atoms/category/postIsOpenSelectBoxContainer';
import PostIsOpenSelectBoxLayout from '@/components/atoms/category/postIsOpenSelectBoxLayout';
import SelectLabel from '@/components/atoms/selectLabel';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
import { useAppSelector } from '@/redux/storeConfig';
import { AdminDataInfoType } from '@/types/admin.types';
import { createToast } from '@/utils/toast';
import Image from 'next/image';
import AdminIsOpenDropDown from '../admin/adminIsOpenDropDown';

interface PostIsOpenSelectBoxCategoryProps {
  isStatus: string;
  dataList: AdminDataInfoType;
}

const AdminSelectBoxCategory = ({
  isStatus,
  dataList,
}: PostIsOpenSelectBoxCategoryProps) => {
  const {
    isOpen,
    setIsOpen,
    dropdownRef,
    handleClick: handleDropdownClick,
  } = useDropDownOutsideClick();

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
    try {
      if (isStatus === 'APPROVE') {
        await postUserApproveMutate.mutate(userInfo);
        setIsOpen(false);
        createToast(`1건의 요청이 승인되었습니다.`, 'primary', false);
      } else if (isStatus === 'REJECT') {
        await deleteUsrRoleMutate.mutate(userInfo);
        setIsOpen(false);
        createToast(`1건의 요청이 거절되었습니다.`, 'primary', false);
      }
    } catch (error) {
      throw new Error('권한 요청 응답 실패!');
    }
  };

  return (
    <PostIsOpenSelectBoxContainer
      ref={dropdownRef}
      onClick={handleDropdownClick}
    >
      <PostIsOpenSelectBoxLayout>
        <Image
          src={isStatus === 'WAIT' ? orange : green}
          width={8}
          height={8}
          alt="권한"
        />
        <SelectLabel>{isStatus === 'WAIT' ? '대기' : '승인'}</SelectLabel>
        <Image
          src={arrow}
          width={12}
          height={12}
          alt="화살표"
          className={`transition-transform duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </PostIsOpenSelectBoxLayout>

      <AdminIsOpenDropDown show={isOpen} isLargeSize={isStatus === 'WAIT'}>
        <div
          onClick={() =>
            handleClick(isStatus === 'WAIT' ? 'APPROVE' : 'REJECT')
          }
          className="flex w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55"
        >
          <Image
            src={isStatus === 'WAIT' ? green : red}
            alt=""
            width={8}
            height={8}
            className="mx-[14px]"
          />
          <div className="text-sm">{isStatus === 'WAIT' ? '승인' : '거절'}</div>
        </div>
        {isStatus === 'WAIT' && (
          <div
            onClick={() => handleClick('REJECT')}
            className="flex h-[36px] w-[136px] flex-row rounded-[8px] py-[9px] hover:bg-secondary-55"
          >
            <Image
              src={red}
              alt=""
              width={8}
              height={8}
              className="mx-[14px]"
            />
            <div className="text-sm">거절</div>
          </div>
        )}
      </AdminIsOpenDropDown>
    </PostIsOpenSelectBoxContainer>
  );
};

export default AdminSelectBoxCategory;
