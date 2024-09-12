'use client';

import AdminSelectBoxCategory from '@/components/atoms/category/adminSelectBoxCategory';
import CategoryBox from '@/components/atoms/category/categoryBox';
import NoDataList from '@/components/atoms/category/noDataList';
import { selectItem } from '@/redux/slice/adminCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { AdminDataInfoType, FilteredListProps } from '@/types/admin.types';
import { useEffect, useState } from 'react';

interface AdminItem {
  email: string;
  period: number;
}

const AuthFilteredList = ({ data }: FilteredListProps) => {
  const dispatch = useAppDispatch();
  const adminIds = useAppSelector(
    (state) => state.adminCheckBoxSlice.selectedItems,
  );

  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckChange =
    (adminId: AdminItem) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { email, period } = adminId;
      dispatch(selectItem({ email, period }));
    };

  useEffect(() => {
    setChecked(
      adminIds.length === data.length &&
        data.every(
          (item: AdminDataInfoType) =>
            adminIds.findIndex(
              (admin) =>
                admin.email === item.email && admin.period === item.period,
            ) !== -1,
        ),
    );
  }, [adminIds, data]);

  return (
    <div className="h-[471px] border-gray-300">
      {data.length > 0 ? (
        data.map((item) => (
          <tr
            key={item.email + item.period}
            className={`flex h-[64px] items-center border-b text-sm hover:bg-blue-50 ${
              adminIds.findIndex(
                (admin) =>
                  admin.email === item.email && admin.period === item.period,
              ) !== -1
                ? 'bg-secondary-55'
                : ''
            }`}
          >
            <td className="ml-6 mr-7 flex h-5 w-5 items-center justify-center">
              <CategoryBox
                text=""
                onChange={handleCheckChange({
                  email: item.email,
                  period: item.period,
                })}
                checked={
                  adminIds.findIndex(
                    (admin) =>
                      admin.email === item.email &&
                      admin.period === item.period,
                  ) !== -1
                }
              />
            </td>
            <td className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.username}
            </td>
            <td className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.trackRole === 'STUDENT' ? '수강생' : item.trackRole}
            </td>
            <td className="flex h-[64px] w-[118px] items-center pl-[10px] pr-[16px] text-sm font-medium text-gray-700">
              {item.period}
            </td>
            <td className="flex h-[64px] w-[268px] items-center px-[16px] py-[12px] text-sm font-medium text-gray-700">
              {item.email}
            </td>
            <td className="flex h-[64px] w-[171px] items-center text-sm font-medium text-gray-700">
              {item.createdAt}
            </td>
            <td className="flex h-[64px] w-[123px] items-center px-[10px] text-sm font-medium text-gray-700">
              <AdminSelectBoxCategory dataList={item} isStatus={item.auth} />
            </td>
          </tr>
        ))
      ) : (
        <NoDataList />
      )}
    </div>
  );
};

export default AuthFilteredList;
