import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const dropDownItemVariants = cva(
  'relative mx-3 flex cursor-pointer justify-between rounded-[12px] px-[14px] py-[9px]',
  {
    variants: {
      variant: {
        primary: 'hover:bg-primary-50',
        secondary: 'hover:bg-secondary-55',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface DropDownItemProps extends VariantProps<typeof dropDownItemVariants> {
  children: ReactNode;
  onClick: () => void;
}

const DropDownItem = ({ children, onClick, variant }: DropDownItemProps) => {
  return (
    <div onClick={onClick} className={dropDownItemVariants({ variant })}>
      <span className="text-gary-900 text-xs font-normal">{children}</span>
    </div>
  );
};

export default DropDownItem;
