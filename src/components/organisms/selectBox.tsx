'use client';

import CustomDropDown from '@/components/atoms/customDropDown';
import SelectContainer from '@/components/atoms/selectContainer';
import SelectInput, {
  SelectInputVariants,
} from '@/components/atoms/selectInput';
import SelectItem from '@/components/atoms/selectItem';
import SelectLabel from '@/components/atoms/selectLabel';
import SelectLayout from '@/components/atoms/selectLayout';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
import { SelectOptionType } from '@/types/signup.types';
import { VariantProps } from 'class-variance-authority';
import { useState } from 'react';

interface SelectBoxProps {
  options: SelectOptionType[];
  label: string;
  onSelect: (value: SelectOptionType['value']) => void;
  selectInputVariant: VariantProps<typeof SelectInputVariants>['variant'];
  variant?: 'primary' | 'secondary';
  className?: string;
}

const SelectBox = ({
  options,
  label,
  onSelect,
  variant,
  selectInputVariant,
  className,
}: SelectBoxProps) => {
  const { isOpen, setIsOpen, dropdownRef, handleClick } =
    useDropDownOutsideClick();

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    options.find((option) => option.value === '0') || null,
  );

  const handleSelect = (option: SelectOptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <SelectContainer className={className}>
      <SelectLayout label={label}>
        <SelectLabel>{label}</SelectLabel>
        <SelectInput
          variant={selectInputVariant}
          onClick={handleClick}
          clicked={isOpen}
        >
          {selectedOption ? selectedOption.label : options[0].label}
        </SelectInput>
        <CustomDropDown clicked={isOpen} ref={dropdownRef}>
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
        </CustomDropDown>
      </SelectLayout>
    </SelectContainer>
  );
};

export default SelectBox;
