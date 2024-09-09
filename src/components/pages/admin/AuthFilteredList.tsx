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
        data.every((item) => adminIds.includes(item.email)),
    );
  }, [adminIds, data]);

  return (
    <div className="w-[1012px] border-gray-300">
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.email}
            className={`flex flex-row hover:bg-blue-50 ${adminIds.includes(item.email) ? 'bg-secondary-55' : ''}`}
          >
            <div className="flex h-[64px] w-[92px] items-center pl-[24px]">
              <CategoryBox
                text=""
                onChange={handleCheckChange(item.email)}
                checked={adminIds.includes(item.email)}
              />
            </div>
            <div className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.username}
            </div>
            <div className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.trackRole === 'STUDENT' ? '수강생' : item.trackRole}
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
          </div>
        ))
      ) : (
        <NoDataList />
      )}
    </div>
  );
};

export default AuthFilteredList;
