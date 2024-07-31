'use client';

import { usePermissionDataQuery } from '@/api/permission/useQuery';
import { permissionHeaders } from '@/constants/permission.constant';
import NoDataList from './noDataList';
import TableHeader from './tableHeader';

const PermissionList = () => {
  const { boardList, isError, isPending } = usePermissionDataQuery();

  if (isError) {
    return <div>에러입니다</div>;
  }

  if (isPending) {
    return <div>대기중</div>;
  }

  console.log(boardList, 'List');
  const listData = boardList.data.content;
  console.log(listData);

  return (
    <>
      <section className="mx-auto my-[24px] h-[568px] w-[1012px]">
        <table>
          <thead>
            <TableHeader headers={permissionHeaders} />
          </thead>
          <tbody>
            <tr>
              {listData ? (
                <>
                  <tr className="flex h-[64px] flex-row items-center gap-[42px] border-b-2 hover:bg-blue-50">
                    <td className="w-[56px]">
                      <input type="checkbox" />
                    </td>
                    <td className="w-[88px] pl-[10px]">김대길</td>
                    <td className="w-[88px] pl-[10px]">수강생</td>
                    <td className="w-[88px] pl-[10px]">1기</td>
                    <td className="w-[200px] pl-[16px]">1234@gmail.com</td>
                    <td className="w-[128px]">2024-07-05</td>
                    <td className="w-[112px] pl-[10px]">승인상태</td>
                  </tr>
                  <tr className="flex h-[64px] flex-row items-center gap-[42px] border-b-2 hover:bg-blue-50">
                    <td className="w-[56px]">
                      <input type="checkbox" />
                    </td>
                    <td className="w-[88px] pl-[10px]">김대길</td>
                    <td className="w-[88px] pl-[10px]">수강생</td>
                    <td className="w-[88px] pl-[10px]">1기</td>
                    <td className="w-[200px] pl-[16px]">1234@gmail.com</td>
                    <td className="w-[128px]">2024-07-05</td>
                    <td className="w-[112px] pl-[10px]">승인상태</td>
                  </tr>
                </>
              ) : (
                <NoDataList />
              )}
            </tr>
          </tbody>
        </table>
      </section>

      {/* api연결 후 사용할 ui */}
      {/* <section className="mx-auto my-[24px] h-[568px] w-[1012px]">
      <table>
        <TableHeader headers={permissionHeaders} />
        <tbody>
          {listData ? (
            listData.map(post => (
              <TableRow key={post.id} data={post} headers={permissionHeaders} />
            ))
          ) : (
            <NoDataList />
          )}
        </tbody>
      </table>
    </section> */}
    </>
  );
};

export default PermissionList;
