import SelectItemSpan from '@/components/atoms/selectItemSpan';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { ComponentProps, ReactNode } from 'react';

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

interface SelectItemProps
  extends VariantProps<typeof SelectItemVariants>,
    ComponentProps<'div'> {
  children: ReactNode;
  selected?: boolean;
}

const SelectItem = ({
  children,
  selected = false,
  variant = 'primary',
  ...props
}: SelectItemProps) => {
  return (
    <div {...props} className={SelectItemVariants({ variant })}>
      <SelectItemSpan selected={selected} variant={variant}>
        {children}
      </SelectItemSpan>
      <div
        data-selected={selected}
        className="right-0 flex h-5 w-5 items-center justify-center data-[selected=true]:absolute data-[selected=false]:hidden"
      >
        <Image
          src={`${variant === 'primary' ? '/backoffice/assets/icons/redCheck.svg' : '/backoffice/assets/icons/blueCheck.svg'}`}
          alt={'select box check'}
          fill
        />
      </div>
    </div>
  );
};

export default SelectItem;
