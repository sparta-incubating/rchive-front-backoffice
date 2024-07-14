import SelectContainer from '@/components/atoms/selectContainer';
import SelectDropDown from '@/components/atoms/selectDropDown';
import SelectInput from '@/components/atoms/selectInput';
import SelectItem from '@/components/atoms/selectItem';
import SelectLabel from '@/components/atoms/selectLabel';
import SelectLayout from '@/components/atoms/selectLayout';
import { SelectOptionType } from '@/types/signup.types';
import { useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface SelectBoxProps<T extends FieldValues> {
  options: SelectOptionType[];
  label: string;
  onSelect: (value: SelectOptionType['value']) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  field: ControllerRenderProps<T>;
}

const SelectFormBox = <T extends FieldValues>({
  options,
  label,
  onSelect,
  variant,
  className,
  field,
}: SelectBoxProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    options.find((option) => option.value === field.value) || null,
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: SelectOptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
    field.onChange(option.value);
  };

  return (
    <SelectContainer className={className}>
      <SelectLayout label={label}>
        <SelectLabel>{label}</SelectLabel>
        <SelectInput
          variant={selectedOption ? 'selected' : 'unSelected'}
          onClick={handleClick}
          clicked={isOpen}
        >
          {selectedOption ? selectedOption.label : '선택안함'}
        </SelectInput>
        <SelectDropDown clicked={isOpen}>
          {options.map((option) => (
            <SelectItem
              key={option.value + option.label}
              data-value={option.value}
              selected={option.value === selectedOption?.value}
              variant={variant}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectDropDown>
      </SelectLayout>
    </SelectContainer>
  );
};

export default SelectFormBox;
