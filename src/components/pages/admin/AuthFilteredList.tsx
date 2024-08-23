'use client';

import AdminSelectBoxCategory from '@/components/atoms/category/adminSelectBoxCategory';
import CategoryBox from '@/components/atoms/category/categoryBox';
import NoDataList from '@/components/atoms/category/noDataList';
import { setAdminId } from '@/redux/slice/adminCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { FilteredListProps } from '@/types/admin.types';
import { useEffect, useState } from 'react';

const AuthFilteredList = ({ data }: FilteredListProps) => {
  const dispatch = useAppDispatch();
  const adminIds = useAppSelector((state) => state.adminCheckBoxSlice.adminIds);

  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckChange =
    (adminId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      // 개별 체크박스 상태 변경
      if (checked) {
        dispatch(setAdminId({ adminId }));
      } else {
        dispatch(setAdminId({ adminId }));
      }
    };

  useEffect(() => {
    setChecked(
      adminIds.length === data.length &&
        data.every((item) => adminIds.includes(item.adminId)),
    );
  }, [adminIds, data]);

  return (
    <table className="w-[1012px]">
      <tr className="h-full w-full">
        {/* 단건 체크 */}
        {data?.map((item) => (
          <tr
            key={item.adminId}
            className={`flex flex-row hover:bg-blue-50 ${adminIds.includes(item.adminId) ? `bg-secondary-55` : ''}`}
          >
            <td className="flex h-[64px] w-[92px] items-center pl-[24px]">
              <CategoryBox
                text=""
                onChange={handleCheckChange(item.adminId)}
                checked={adminIds.includes(item.adminId)}
              />
            </td>
            <div className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.username}
            </div>
            <div className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.trackRole}
            </div>
            <div className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.period}
            </div>
            <div className="flex h-[64px] w-[268px] items-center px-[16px] py-[12px] text-sm font-medium text-gray-700">
              {item.email}
            </div>
            <div className="flex h-[64px] w-[171px] items-center text-sm font-medium text-gray-700">
              {item.createdAt}
            </div>
            <div className="flex h-[64px] w-[123px] items-center px-[10px] text-sm font-medium text-gray-700">
              <AdminSelectBoxCategory dataList={item} isStatus={item.auth} />
            </div>
          </tr>
        )) ?? <NoDataList />}
      </tr>
    </table>
  );
};

export default AuthFilteredList;
