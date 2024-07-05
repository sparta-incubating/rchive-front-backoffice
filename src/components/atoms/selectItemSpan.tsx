import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const SelectItemSpanVariants = cva('data-[selected=false]:text-gray-900', {
  variants: {
    variant: {
      primary: 'data-[selected=true]:text-primary-400',
      secondary: 'data-[selected=true]:text-secondary-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface SelectItemSpanProps
  extends VariantProps<typeof SelectItemSpanVariants> {
  children: ReactNode;
  selected: boolean;
}

const SelectItemSpan = ({
  children,
  variant,
  selected,
}: SelectItemSpanProps) => {
  return (
    <span
      data-selected={selected}
      className={SelectItemSpanVariants({ variant })}
    >
      {children}
    </span>
  );
};

export default SelectItemSpan;
