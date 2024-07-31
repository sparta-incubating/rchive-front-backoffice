import { TableHeaderItem } from '@/constants/permission.constant';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import CategoryBox from './categoryBox';

const TableHeaderVariants = cva(
  'flex h-[64px] flex-row items-center border-b-2',
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

interface TableHeaderProps
  extends VariantProps<typeof TableHeaderVariants>,
    ComponentProps<'div'> {
  headers: TableHeaderItem[];
  handleAllCheck: (checked: boolean) => void;
  isAllChecked: boolean;
}

const TableHeader = ({
  headers,
  variant,
  handleAllCheck,
  isAllChecked,
}: TableHeaderProps) => {
  return (
    <thead>
      <tr className={TableHeaderVariants({ variant })}>
        <td className="flex w-[56px] items-center justify-center">
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
