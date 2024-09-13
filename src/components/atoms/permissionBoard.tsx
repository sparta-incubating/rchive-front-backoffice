import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const ProfileBoardVariants = cva(
  ' mt-[29px] rounded-[14px] bg-white w-full px-9 border border-blue-100',

  {
    variants: {
      variant: {
        primary: 'h-[800px] py-[24px]',
        userInfo: 'h-[274px] py-[32px]',
        accountInfo: 'h-[238px] py-[32px]',
        post: 'flex flex-col gap-4 py-8',
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
