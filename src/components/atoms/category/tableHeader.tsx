import { TableHeaderItem } from '@/constants/permission.constant';
import CategoryBox from './categoryBox';

interface TableHeaderProps {
  headers: TableHeaderItem[];
  handleAllCheck: (checked: boolean) => void;
  isAllChecked: boolean;
}

const TableHeader = ({
  headers,
  handleAllCheck,
  isAllChecked,
}: TableHeaderProps) => {
  return (
    <thead>
      <tr className="flex h-[64px] flex-row items-center gap-[42px] border-b-2">
        <td className="w-[56px]">
          <CategoryBox
            text=""
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={isAllChecked}
          />
        </td>
        {headers.map((header, index) => (
          <td key={index} className={header.className}>
            {header.label}
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
