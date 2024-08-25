import { classMerge } from '@/utils/utils';
import { ComponentProps } from 'react';

interface userInfoItemProps extends ComponentProps<'div'> {
  label: string;
  data: string;
  className?: string;
}

const UserInfoContainer = ({ label, data, className }: userInfoItemProps) => {
  const baseStyle =
    'flex h-[62px] w-[402px] items-center rounded-[12px] py-[20px] border pl-[20px]';
  return (
    <div className="h-[100px] w-[404px]">
      <p className="h-[40px] w-[261px] py-[8px] text-base font-medium leading-6 text-gray-900">
        {label}
      </p>
      <div className={classMerge(baseStyle, className)}>
        <p className="text-sm font-medium leading-[21px] text-gray-900">
          {data}
        </p>
      </div>
    </div>
  );
};

export default UserInfoContainer;
