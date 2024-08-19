'use client';

import AdminSelectBoxCategory from '@/components/atoms/category/adminSelectBoxCategory';
import CategoryBox from '@/components/atoms/category/categoryBox';
import NoDataList from '@/components/atoms/category/noDataList';
import { setAllPostIds, setPostId } from '@/redux/slice/postCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { FilteredListProps } from '@/types/admin.types';
import { useCallback, useEffect, useState } from 'react';

const AuthFilteredList = ({ data }: FilteredListProps) => {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector((state) => state.postCheckBoxSlice.postIds);

  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(data.length).fill(false),
  );

  const handleCheckChange = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCheckedState = checkedState.map((item, idx) =>
        idx === index ? e.target.checked : item,
      );

      setCheckedState(updatedCheckedState);
      if (e.target.checked) {
        dispatch(setPostId({ postId: index }));
      }
    },
    [dispatch, checkedState],
  );

  const handleAllCheck = (checked: boolean) => {
    const currentPagePostIds = data.map((_, index) => index);
    dispatch(setAllPostIds({ postIds: currentPagePostIds, checked }));
  };

  const isAllChecked =
    data.length > 0 && data.every((_, index) => postIds.includes(index));

  useEffect(() => {
    const updatedCheckedState = data.map((_, index) => postIds.includes(index));
    setCheckedState(updatedCheckedState);
  }, [postIds, data]);

  return (
    <div>
      {/* 테이블 헤더 */}
      <div className="flex flex-row gap-[50px] border">
        <CategoryBox
          text=""
          onChange={(e) => handleAllCheck(e.target.checked)}
          checked={isAllChecked}
        />
        <p className="w-[50px]">이름</p>
        <p className="w-[50px]">직책</p>
        <p className="w-[50px]">기수</p>
        <p className="w-[50px]">이메일</p>
        <p className="w-[50px]">요청날짜</p>
        <p className="w-[50px]">승인상태</p>
      </div>

      {data?.map((item, index) => (
        <div key={index} className="flex flex-row gap-[20px] border">
          <CategoryBox
            text=""
            onChange={handleCheckChange(index)}
            checked={checkedState[index]}
            id={index.toString()}
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

            <AdminSelectBoxCategory isStatus={item.auth} statusId={index} />
          </div>
        </div>
      )) ?? <NoDataList />}
    </div>
  );
};

export default AuthFilteredList;
