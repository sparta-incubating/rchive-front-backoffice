import SelectContainer from '@/components/atoms/selectContainer';
import SelectLayout from '@/components/atoms/selectLayout';
import SelectLabel from '@/components/atoms/selectLabel';
import SelectInput from '@/components/atoms/selectInput';
import { SelectOptionType } from '@/types/signup.types';
import SelectDropDown from '@/components/atoms/selectDropDown';
import SelectItem from '@/components/atoms/selectItem';
import { useState } from 'react';

interface SelectBoxProps {
  options: SelectOptionType[];
  label: string;
  onSelect: (value: SelectOptionType['value']) => void;
}

/**
 * SelectBox 사용방법
 *
 * @constructor
 */
const SelectBox = ({ options, label, onSelect }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    options.find((option) => option.selected) || null,
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: SelectOptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <SelectContainer>
      <SelectLayout>
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
              key={option.value}
              data-value={option.value}
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

export default SelectBox;
