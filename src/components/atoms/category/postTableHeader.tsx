import { TableHeaderItem } from '@/constants/permission.constant';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import CategoryBox from './categoryBox';

const TableHeaderVariants = cva(
  'flex h-[64px] items-center border-b border-blue-100 w-full pl-6 text-sm',
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

const PostTableHeader = ({
  variant,
  handleAllCheck,
  isAllChecked,
}: TableHeaderProps) => {
  return (
    <thead>
      <tr className={TableHeaderVariants({ variant })}>
        <td className="mr-7 flex h-5 w-5 items-center justify-center">
          <CategoryBox
            text=""
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={isAllChecked}
          />
        </td>
        <td key="tdumbnail" className="w-[65.5px] text-gray-400">
          썸네일
        </td>
        <td key="title" className="w-60 px-4 text-gray-400">
          제목
        </td>
        <td key="category" className="w-[153px] px-2.5 text-gray-400">
          카테고리
        </td>
        <td key="tutor" className="w-[97px] px-2.5 text-gray-400">
          튜터
        </td>
        <td key="track" className="w-[69px] text-gray-400">
          기수
        </td>
        <td key="isPublic" className="w-[137px] px-2.5 text-gray-400">
          공개여부
        </td>
        <td key="date" className="w-[106px] text-gray-400">
          날짜
        </td>
        <td key="update" className="w-[74px] text-gray-400">
          업데이트
        </td>
      </tr>
    </thead>
  );
};

export default PostTableHeader;
