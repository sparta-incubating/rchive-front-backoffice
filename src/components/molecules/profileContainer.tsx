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
  const baseStyle = 'text-sm text-gray-900';
  return (
    <div className="h-[108px] w-[326.67px]">
      <p className="flex h-[40px] w-[348px] items-center">{label}</p>
      <div className="flex h-[60px] w-[332px] items-center justify-between rounded-[12px] border-2 px-[20px]">
        <p className={classMerge(baseStyle, className)}>{data}</p>
        {showButton && (
          <button
            className="h-[36px] w-[80px] rounded-full bg-gray-900"
            onClick={onClick}
          >
            <p className="text-white">변경</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileContainer;
