import { TableHeaderItem } from '@/constants/permission.constant';

interface TableRowProps {
  data: Record<string, any>;
  headers: TableHeaderItem[];
}

const TableRow = ({ data, headers }: TableRowProps) => {
  return (
    <tr className="flex h-[64px] flex-row items-center gap-[42px] border-b-2 hover:bg-blue-50">
      <td className="w-[56px]">
        <input type="checkbox" />
      </td>
      {headers.map((header, index) => (
        <td key={index} className={header.className}>
          {data[header.key]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
