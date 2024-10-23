import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const ProfileBoardVariants = cva(
  'rounded-[14px] border border-blue-100 bg-white w-[1086px] px-9 mt-6 py-6',
  {
    variants: {
      variant: {
        primary: 'min-h-[800px] h-auto',
        userInfo: 'h-[306px]',
        accountInfo: 'h-[238px]',
        post: 'h-[882px] gap-6  flex flex-col',
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
