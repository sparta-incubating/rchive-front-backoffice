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
        'group h-8 w-8 rounded-full border border-blue-100',
        disabled ? 'cursor-auto' : 'cursor-pointer',
      )}
      {...props}
    >
      <div
        className={classMerge(
          'relative m-auto h-3.5 w-3.5',
          disabled ? '' : 'group-hover:-rotate-180 group-hover:duration-500',
        )}
      >
        {children}
      </div>
    </button>
  );
};

export default RefreshButton;
