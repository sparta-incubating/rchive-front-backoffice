import { cva, VariantProps } from 'class-variance-authority';

const CustomCheckBoxVariants = cva('h-5 w-5 bg-center bg-no-repeat', {
  variants: {
    variant: {
      all: "data-[checked=true]:bg-[url('/assets/icons/Checkbox.svg')] bg-[url('/assets/icons/unCheckbox.svg')]",
      checked:
        "data-[checked=true]:bg-[url('/assets/icons/Checked.svg')] bg-[url('/assets/icons/unCheck.svg')]",
    },
  },
  defaultVariants: {
    variant: 'checked',
  },
});

interface CustomCheckBoxProps
  extends VariantProps<typeof CustomCheckBoxVariants> {
  id: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  checked: boolean;
}

const CustomCheckBox = ({
  id,
  checked,
  variant,
  onClick,
  ...props
}: CustomCheckBoxProps) => {
  return (
    <div
      data-checked={checked}
      onClick={onClick}
      className={CustomCheckBoxVariants({ variant })}
    >
      <input type="checkbox" className="hidden" id={id} {...props} />
    </div>
  );
};

export default CustomCheckBox;
