import { classMerge } from '@/utils/utils';
import { ComponentProps, ReactNode } from 'react';

interface CategoryLayoutProps extends ComponentProps<'div'> {
  children: ReactNode;
}

const PostIsOpenSelectBoxLayout = ({
  children,
  ...props
}: CategoryLayoutProps) => {
  const baseStyle = classMerge('flex flex-row gap-2.5');
  return (
    <div className={baseStyle} {...props}>
      {children}
    </div>
  );
};

export default PostIsOpenSelectBoxLayout;
