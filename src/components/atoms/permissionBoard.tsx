import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const ProfileBoardVariants = cva(
  'blue-500 mb-[24px] mt-[20px]  rounded-[14px] border border-2 bg-white w-[1084px]',
  {
    variants: {
      variant: {
        primary: 'h-[797px] ',
        userInfo: 'h-[306px]',
        accountInfo: 'h-[236px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface PermissionBoardProps
  extends VariantProps<typeof ProfileBoardVariants>,
    ComponentProps<'div'> {
  children: ReactNode;
}

const PermissionBoard: React.FC<PermissionBoardProps> = ({
  children,
  variant,
  ...props
}: PermissionBoardProps) => {
  return (
    <div {...props} className={ProfileBoardVariants({ variant })}>
      {children}
    </div>
  );
};

export default PermissionBoard;
