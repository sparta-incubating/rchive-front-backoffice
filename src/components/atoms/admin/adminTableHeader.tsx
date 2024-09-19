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
    <div>
      <div className="flex h-[64px] w-[1012px] items-center border-b border-blue-100 pl-6 text-sm">
        <div className="mr-7 flex h-5 w-5 items-center justify-center">
          <CategoryBox
            text=""
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={isAllChecked}
          />
        </div>
        <div className="flex h-[56px] w-[118px] items-center px-[10px] text-sm font-medium text-gray-400">
          이름
        </div>
        <div className="flex h-[56px] w-[118px] items-center px-[10px] text-sm font-medium text-gray-400">
          직책
        </div>
        <div className="flex h-[56px] w-[118px] items-center px-[10px] text-sm font-medium text-gray-400">
          기수
        </div>
        <div className="flex h-[56px] w-[268px] items-center px-[16px] text-sm font-medium text-gray-400">
          이메일
        </div>
        <div className="flex h-[56px] w-[171px] items-center text-sm font-medium text-gray-400">
          요청날짜
        </div>
        <div className="flex h-[56px] w-[123px] items-center px-[10px] text-sm font-medium text-gray-400">
          승인상태
        </div>
      </div>
    </div>
  );
};

export default AdminTableHeader;
