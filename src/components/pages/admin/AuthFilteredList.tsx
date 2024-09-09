'use client';

import AdminSelectBoxCategory from '@/components/atoms/category/adminSelectBoxCategory';
import CategoryBox from '@/components/atoms/category/categoryBox';
import NoDataList from '@/components/atoms/category/noDataList';
import PageNation from '@/components/atoms/category/pageNation';
import { setAdminId } from '@/redux/slice/adminCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { FilteredListProps } from '@/types/admin.types';
import { useEffect, useState } from 'react';

const AuthFilteredList = ({ data }: FilteredListProps) => {
  const dispatch = useAppDispatch();
  const adminIds = useAppSelector((state) => state.adminCheckBoxSlice.adminIds);

  const [checked, setChecked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-[1012px] border-gray-300">
      {paginatedData.length > 0 ? (
        paginatedData.map((item, index) => (
          <div
            key={item.adminId + index}
            className={`flex flex-row hover:bg-blue-50 ${adminIds.includes(item.adminId) ? 'bg-secondary-55' : ''}`}
          >
            <div className="flex h-[64px] w-[92px] items-center pl-[24px]">
              <CategoryBox
                text=""
                onChange={handleCheckChange(item.adminId)}
                checked={adminIds.includes(item.adminId)}
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
      <div className="py-[24px]">
        <PageNation
          currentPage={currentPage}
          totalElements={data.length}
          size={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AuthFilteredList;
