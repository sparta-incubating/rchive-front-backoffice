import NoDataList from '@/components/atoms/category/noDataList';
import { FilteredListProps } from '@/types/admin.types';

const AuthFilteredList = ({ data }: FilteredListProps) => {
  return (
    <div>
      {/*테이블 헤더*/}
      <div className="flex flex-row gap-[50px] border">
        <p className="w-[50px]">이름</p>
        <p className="w-[50px]">직책</p>
        <p className="w-[50px]">기수</p>
        <p className="w-[50px]">이메일</p>
        <p className="w-[50px]">요청날짜</p>
        <p className="w-[50px]">승인상태</p>
      </div>

      {data?.map((item, index) => (
        <>
          <div key={index} className="flex flex-row gap-[20px] border">
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
            </div>
          </div>
        </>
      )) ?? <NoDataList />}
    </div>
  );
};

export default AuthFilteredList;
