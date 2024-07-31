import { TableHeaderItem } from '@/constants/permission.constant';
import CategoryBox from './categoryBox';

interface TableRowProps {
  data: Record<string, any>;
  headers: TableHeaderItem[];
  checkedListById: number[];
  onCheckChange: (id: number) => void;
}

const TableRow = ({
  data,
  headers,
  checkedListById,
  onCheckChange,
}: TableRowProps) => {
  const isChecked = checkedListById.includes(data.id);

  return (
    <tr
      className={`flex h-[64px] flex-row items-center gap-[42px] border-b-2 hover:bg-blue-50 ${
        isChecked ? 'bg-secondary-55' : ''
      }`}
    >
      <td className="w-[56px]">
        <CategoryBox
          onChange={() => onCheckChange(data.id)}
          checked={checkedListById.includes(data.id)}
          data-checked={isChecked}
        />
      </td>
      {headers.map((header, index) => (
        <td
          key={index}
          className={`${header.className} text-gray-700 ${
            isChecked ? 'font-semibold' : ''
          }`}
        >
          {data[header.key]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
