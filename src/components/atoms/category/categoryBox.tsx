import { InputHTMLAttributes } from 'react';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function CategoryBox({
  id,
  name,
  text,
  onChange,
  checked,
}: CheckBoxProps) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        checked={checked}
        className={`h-[20px] w-[20px] appearance-none ${
          checked
            ? "bg-[url('/assets/icons/Checkbox.svg')]"
            : "bg-[url('/assets/icons/unCheckbox.svg')]"
        }`}
      />
      <label htmlFor={id}>{text}</label>
    </>
  );
}
