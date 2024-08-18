'use client';

import { PermissionInfoType } from '@/api/permission/permissionApi';
import {
  usePermissionDataQuery,
  useRoleCountDataQuery,
} from '@/api/permission/useQuery';
import PermissionBoard from '@/components/atoms/permissionBoard';
import SearchBar from '@/components/atoms/searchBar';
import BackofficePage from '@/components/pages/backofficePage';

const Admin = () => {
  const { boardList } = usePermissionDataQuery();
  const { countList } = useRoleCountDataQuery();

  const testData = boardList?.data?.content;
  const countData = countList?.data;
  const allCount = countData?.statusAll;
  const approveCount = countData?.statusApprove;
  const waitCount = countData?.statusWait;

  const handleChangeAuth = () => {
    console.log('??');
    alert('안녕');
  };

  return (
    <>
      <BackofficePage>
        {/* 검색바 */}
        <SearchBar />
        <div className="flex flex-row gap-[50px] border">
          <p className="w-[50px]">이름</p>
          <p className="w-[50px]">직책</p>
          <p className="w-[50px]">기수</p>
          <p className="w-[50px]">이메일</p>
          <p className="w-[50px]">요청날짜</p>
          <p className="w-[50px]">승인상태</p>
        </div>

        {/* 게시판 */}
        <PermissionBoard>
          <div className="border">
            <p>전체 :{allCount}</p>
            <p>대기 중:{waitCount}</p>
            <p>승인 :{approveCount}</p>
            {testData?.map((item: PermissionInfoType, index: string) => (
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
                      <option>
                        <button onClick={handleChangeAuth}>승인ㅇㅇㅇ</button>
                      </option>
                      <option>
                        <button onClick={handleChangeAuth}>거절</button>
                      </option>
                    </select>
                  </div>
                </div>
              </>
            ))}
            <br />
            <br />
            <p>대기중</p>
            {testData
              ?.filter((item: PermissionInfoType) => item.auth === 'WAIT')
              .map((item: PermissionInfoType, index: string) => (
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
              ))}

            <br />
            <br />
            <p>승인</p>
            {testData
              ?.filter((item: PermissionInfoType) => item.auth === 'APPROVE')
              .map((item: PermissionInfoType, index: string) => (
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
              ))}
          </div>
        </PermissionBoard>
      </BackofficePage>
    </>
  );
};

export default Admin;
