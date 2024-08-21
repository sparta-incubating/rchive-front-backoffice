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
  // console.log(checked);

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
    <div>
      {/* 테이블 헤더 */}
      <div className="flex flex-row gap-[50px] border">
        <p className="w-[50px]">이름</p>
        <p className="w-[50px]">직책</p>
        <p className="w-[50px]">기수</p>
        <p className="w-[50px]">이메일</p>
        <p className="w-[50px]">요청날짜</p>
        <p className="w-[50px]">승인상태</p>
      </div>

      {/* 단건 체크 */}
      {data?.map((item) => (
        <div key={item.adminId} className="flex flex-row gap-[20px] border">
          <CategoryBox
            text=""
            onChange={handleCheckChange(item.adminId)}
            checked={adminIds.includes(item.adminId)}
          />
          <div>{item.username}</div>
          <div>{item.trackRole}</div>
          <div>{item.period}</div>
          <div>{item.email}</div>
          <div>{item.createdAt}</div>
          <div>
            <select>
              <option> {item.auth}</option>
              <option>승인</option>
              <option>거절</option>
            </select>

            <AdminSelectBoxCategory dataList={item} isStatus={item.auth} />
          </div>
        </div>
      )) ?? <NoDataList />}
    </div>
  );
};

export default AuthFilteredList;
