'use client';

import AdminSelectBoxCategory from '@/components/atoms/category/adminSelectBoxCategory';
import CategoryBox from '@/components/atoms/category/categoryBox';
import NoDataList from '@/components/atoms/category/noDataList';
import { setAdminId } from '@/redux/slice/adminCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { FilteredListProps } from '@/types/admin.types';
import { useCallback, useEffect, useState } from 'react';

const AuthFilteredList = ({ data }: FilteredListProps) => {
  const dispatch = useAppDispatch();
  const adminIds = useAppSelector((state) => state.adminCheckBoxSlice.adminIds);

  //id 추가
  // const dataList = data.map((item) => ({
  //   ...item,
  //   adminId: item.email,
  // }));

  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckChange = useCallback(
    (adminId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      console.log(checked, '체크상태');
      dispatch(setAdminId({ adminId: adminId }));
    },
    [dispatch],
  );

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
            checked={checked}
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

            <AdminSelectBoxCategory
              isStatus={item.auth}
              adminId={item.adminId}
            />
          </div>
        </div>
      )) ?? <NoDataList />}
    </div>
  );
};

export default AuthFilteredList;
