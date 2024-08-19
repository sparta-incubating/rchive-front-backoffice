import { ReactNode } from 'react';
import Image from 'next/image';
import SelectItemSpan from '@/components/atoms/selectItemSpan';
import { cva, VariantProps } from 'class-variance-authority';

const SelectItemVariants = cva(
  'relative mx-3 flex cursor-pointer justify-between rounded-[12px] px-[14px] py-5 ',
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

interface SelectItemProps extends VariantProps<typeof SelectItemVariants> {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
}

const SelectItem = ({
  children,
  onClick,
  selected = false,
  variant = 'primary',
}: SelectItemProps) => {
  return (
    <div onClick={onClick} className={SelectItemVariants({ variant })}>
      <SelectItemSpan selected={selected} variant={variant}>
        {children}
      </SelectItemSpan>
      <div
        data-selected={selected}
        className="right-0 flex h-5 w-5 items-center justify-center data-[selected=true]:absolute data-[selected=false]:hidden"
      >
        <Image
          src={`${variant === 'primary' ? '/assets/icons/redCheck.svg' : '/assets/icons/blueCheck.svg'}`}
          alt={'select box check'}
          fill
        />
      </div>
    </div>
  );
};

export default SelectItem;
