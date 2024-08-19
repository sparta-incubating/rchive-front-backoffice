import { classMerge } from '@/utils/utils';
import { ComponentProps, ReactNode } from 'react';

interface CategoryContainerProps extends ComponentProps<'div'> {
  children: ReactNode;
  className?: string;
}

const PostIsOpenSelectBoxContainer = ({
  children,
  className,
  ...props
}: CategoryContainerProps) => {
  return (
    <div
      className={classMerge(
        'relative inline-flex h-[32px] min-w-[69px] items-center justify-center rounded-full border px-2.5 hover:cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PostIsOpenSelectBoxContainer;
