import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const SelectItemSpanVariants = cva('', {
  variants: {
    variant: {
      primary: '',
    },
    size: {
      lg: 'text-lg',
      xs: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});

interface SelectItemSpanProps
  extends VariantProps<typeof SelectItemSpanVariants> {
  children: ReactNode;
  selected: boolean;
}

const SelectDumyItemSpan = ({ children, selected }: SelectItemSpanProps) => {
  return (
    <span
      data-selected={selected}
      className="text-xs font-normal text-gray-400"
    >
      {children}
    </span>
  );
};

export default SelectDumyItemSpan;
