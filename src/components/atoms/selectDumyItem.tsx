import SelectDumyItemSpan from '@/components/atoms/selectDumyItemSpan';
import { cva, VariantProps } from 'class-variance-authority';

const SelectItemVariants = cva(
  'mx-3 flex items-center justify-between gap-2.5 rounded-[12px] px-1 py-2',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface SelectItemProps extends VariantProps<typeof SelectItemVariants> {
  title?: string;
}

const SelectItem = ({ title = '', variant = 'primary' }: SelectItemProps) => {
  return (
    <div onClick={() => {}} className={SelectItemVariants({ variant })}>
      {title !== '' && (
        <>
          <div className="flex w-[55px] items-center justify-center">
            <SelectDumyItemSpan selected={false} size="xs">
              {title}
            </SelectDumyItemSpan>
          </div>
          <div className="h-[1px] w-[75%] bg-gray-100"></div>
        </>
      )}

      {title === '' && <div className="h-[1px] w-[100%] bg-gray-100"></div>}
    </div>
  );
};

export default SelectItem;
