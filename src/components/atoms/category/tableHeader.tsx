import { TableHeaderItem } from '@/constants/permission.constant';

interface TableHeaderProps {
  headers: TableHeaderItem[];
}

const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <thead>
      <tr className="flex h-[64px] flex-row items-center gap-[42px] border-b-2">
        <td className="w-[56px]">
          <input type="checkbox" />
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
