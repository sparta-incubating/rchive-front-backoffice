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
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}
