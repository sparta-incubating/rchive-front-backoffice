import { classMerge } from '@/utils/utils';
import { ComponentProps } from 'react';

interface userInfoItemProps extends ComponentProps<'div'> {
  label: string;
  data: string;
  className?: string;
}

const UserInfoContainer = ({ label, data, className }: userInfoItemProps) => {
  const baseStyle =
    'flex h-[60px] w-[404px] items-center rounded-[12px] border-2 p-[20px]';
  return (
    <div className="h-[100px] w-[404px]">
      <p className="font-base h-[40px] w-[264px]">{label}</p>
      <div className={classMerge(baseStyle, className)}>
        <p> {data}</p>
      </div>
    </div>
  );
};

export default UserInfoContainer;
