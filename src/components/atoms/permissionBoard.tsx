import { ComponentProps, ReactNode } from 'react';

interface PermissionBoardProps extends ComponentProps<'div'> {
  children: ReactNode;
}

const PermissionBoard: React.FC<PermissionBoardProps> = ({
  children,
  ...props
}: PermissionBoardProps) => {
  return (
    <div
      {...props}
      className="blue-500 mt-[20px] h-[797px] w-[1084px] rounded-[14px] border border-2 bg-white"
    >
      {children}
    </div>
  );
};

export default PermissionBoard;
