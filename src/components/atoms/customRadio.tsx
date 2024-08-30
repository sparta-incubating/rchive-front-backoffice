import { radioType } from '@/types/radio.types';
import Image from 'next/image';

interface CustomRadioProps {
  values: radioType[];
  value: string;
  onChange: () => void;
}

const CustomRadio = ({ values, value, onChange }: CustomRadioProps) => {
  return (
    <div className="flex space-x-4">
      {values.map((radioValue) => (
        <label
          key={radioValue.value}
          className="flex cursor-pointer items-center space-x-2"
        >
          <input
            type="radio"
            name="custom-radio"
            value={radioValue.value}
            checked={value === radioValue.value}
            onChange={onChange}
            className="hidden"
          />

          <div className="relative h-5 w-5">
            <Image
              src={
                value === radioValue.value
                  ? '/backoffice/assets/icons/radioChecked.svg'
                  : '/backoffice/assets/icons/radioUnchecked.svg'
              }
              alt="radio button"
              fill
            />
          </div>
          <span>{radioValue.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadio;
