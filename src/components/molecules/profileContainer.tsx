import { classMerge } from '@/utils/utils';
import { ComponentProps } from 'react';

interface ProfileItemProps extends ComponentProps<'div'> {
  onClick?: () => void;
  label: string;
  data: string;
  className?: string;
  showButton?: boolean;
}

const ProfileContainer = ({
  onClick,
  label,
  data,
  className,
  showButton = true,
}: ProfileItemProps) => {
  const baseStyle = 'text-base text-gray-900 font-medium';
  return (
    <div className="h-[40px] w-[327px]">
      <p className="flex h-[40px] w-[300px] items-center">{label}</p>
      <div className="flex h-[62px] w-[334px] items-center justify-between rounded-[12px] border py-[20px] pl-[20px] pr-[9px]">
        <p className={classMerge(baseStyle, className)}>{data}</p>
        {showButton && (
          <button
            className="h-[36px] w-[80px] rounded-[26px] bg-gray-900"
            onClick={onClick}
          >
            <p className="text-xs text-white">변경</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileContainer;
