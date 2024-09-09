import CategoryBox from '../category/categoryBox';

interface TableHeaderProps {
  handleAllCheck: (checked: boolean) => void;
  isAllChecked: boolean;
}

const AdminTableHeader = ({
  handleAllCheck,
  isAllChecked,
}: TableHeaderProps) => {
  return (
    <table className="w-[1012px]">
      <thead>
        <tr className="h-full w-full border-b">
          <th className="h-[56px] w-[56px] px-[24px]">
            <CategoryBox
              text=""
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={isAllChecked}
            />
          </th>
          <th className="h-[56px] w-[88px] px-[10px] text-sm font-medium text-gray-400">
            이름
          </th>
          <th className="h-[56px] w-[88px] px-[10px] text-sm font-medium text-gray-400">
            직책
          </th>
          <th className="h-[56px] w-[88px] px-[10px] text-sm font-medium text-gray-400">
            기수
          </th>
          <th className="h-[48px] w-[200px] px-[16px] py-[8px] text-sm font-medium text-gray-400">
            이메일
          </th>
          <th className="h-[56px] w-[128px] text-sm font-medium text-gray-400">
            요청날짜
          </th>
          <th className="h-[56px] w-[92px] px-[10px] text-sm font-medium text-gray-400">
            승인상태
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default AdminTableHeader;
