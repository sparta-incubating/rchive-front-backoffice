import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const ProfileBoardVariants = cva(
  'blue-500 mt-[24px] rounded-[14px] border bg-white w-[1086px] px-[36px]',
  {
    variants: {
      variant: {
        primary: 'h-[800px] py-[24px]',
        userInfo: 'h-[274px] py-[32px]',
        accountInfo: 'h-[238px] py-[32px]',
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
