import { cva, VariantProps } from 'class-variance-authority';
import React, {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

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
  extends VariantProps<typeof CustomCheckBoxVariants>,
    ComponentProps<'input'> {
  id: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckBox = forwardRef<HTMLInputElement, CustomCheckBoxProps>(
  ({ id, checked, variant, onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    return (
      <div
        data-checked={checked}
        className={CustomCheckBoxVariants({ variant })}
        onClick={handleClick}
      >
        <input
          type="checkbox"
          className="hidden"
          id={id}
          ref={inputRef}
          checked={checked}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  },
);

export default CustomCheckBox;
