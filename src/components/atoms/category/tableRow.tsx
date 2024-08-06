import { TableHeaderItem } from '@/constants/permission.constant';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import CategoryBox from './categoryBox';
import PermissionCategory from './permissionCategory';

const TableRowVariants = cva(
  'flex h-[64px] flex-row items-center border-b-2 hover:bg-blue-50',
  {
    variants: {
      variant: {
        permissionList: 'gap-[42px]',
        postList: '',
      },
    },
    defaultVariants: {
      variant: 'permissionList',
    },
  },
);

interface TableRowProps
  extends VariantProps<typeof TableRowVariants>,
    ComponentProps<'div'> {
  data: Record<string, any>;
  headers: TableHeaderItem[];
  checkedListById: number[];
  onCheckChange: (id: number) => void;
  onPermissionChange: (id: number, newPermission: string) => void; // 새로운 prop 추가
}

const TableRow = ({
  data,
  headers,
  checkedListById,
  variant,
  onCheckChange,
  onPermissionChange, // 새로운 prop 사용
}: TableRowProps) => {
  const isChecked = checkedListById.includes(data.id);

  return (
    <tr
      className={`${TableRowVariants({ variant })} ${isChecked ? 'bg-secondary-55' : ''}`}
    >
      <td className="flex w-[56px] items-center justify-center">
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
          {header.key === 'permission' ? (
            <PermissionCategory
              currentPermission={data[header.key]}
              onPermissionChange={(newPermission) =>
                onPermissionChange(data.id, newPermission)
              }
            />
          ) : (
            data[header.key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
