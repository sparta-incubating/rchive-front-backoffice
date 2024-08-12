import { classMerge } from '@/utils/utils';
import { ComponentProps, ReactNode } from 'react';

interface RefreshButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  disabled: boolean;
}

const RefreshButton = ({
  children,
  disabled,
  ...props
}: RefreshButtonProps) => {
  return (
    <button
      className={classMerge(
        'h-8 w-8 rounded-full border border-blue-100',
        disabled ? 'cursor-auto' : 'cursor-pointer',
      )}
      {...props}
    >
      <div className="relative m-auto h-4 w-4">{children}</div>
    </button>
  );
};

export default RefreshButton;
