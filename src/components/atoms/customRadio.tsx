import { radioType } from '@/types/radio.types';
import Image from 'next/image';
import { useState } from 'react';

interface CustomRadioProps {
  values: radioType[];
}

const CustomRadio = ({ values }: CustomRadioProps) => {
  const [selected, setSelected] = useState(values[0].value);

  const handleRadioChange = (value: string) => {
    setSelected(value);
  };

  return (
    <div className="flex space-x-4">
      {values.map((value) => (
        <label
          key={value.value}
          className="flex cursor-pointer items-center space-x-2"
        >
          <input
            type="radio"
            name="custom-radio"
            value={value.value}
            checked={selected === value.value}
            onChange={() => handleRadioChange(value.value)}
            className="hidden"
          />

          <div className="relative h-5 w-5">
            <Image
              src={
                selected === value.value
                  ? '/assets/icons/radioChecked.svg'
                  : '/assets/icons/radioUnchecked.svg'
              }
              alt="radio button"
              fill
            />
          </div>
          <span>{value.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadio;
