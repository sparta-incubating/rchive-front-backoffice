import { classMerge } from '@/utils/utils';
import { ComponentProps, forwardRef, ReactNode } from 'react';

interface CategoryContainerProps extends ComponentProps<'div'> {
  children: ReactNode;
  className?: string;
}

const PostIsOpenSelectBoxContainer = forwardRef<
  HTMLDivElement,
  CategoryContainerProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classMerge(
        'relative inline-flex h-[32px] min-w-[69px] items-center justify-center rounded-full border px-2.5 hover:cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export default PostIsOpenSelectBoxContainer;
