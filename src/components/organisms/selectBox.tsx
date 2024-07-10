import SelectContainer from '@/components/atoms/selectContainer';
import SelectLayout from '@/components/atoms/selectLayout';
import SelectLabel from '@/components/atoms/selectLabel';
import SelectInput from '@/components/atoms/selectInput';
import { SelectOptionType } from '@/types/signup.types';
import SelectDropDown from '@/components/atoms/selectDropDown';
import SelectItem from '@/components/atoms/selectItem';
import { useEffect, useState } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

interface SelectBoxProps<T extends FieldValues> {
  options: SelectOptionType[];
  label: string;
  onSelect: (value: SelectOptionType['value']) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  setValue: UseFormSetValue<T>;
  setValueName: Path<T>;
}

const SelectBox = <T extends FieldValues>({
  options,
  label,
  onSelect,
  variant,
  className,
  setValue,
  setValueName,
}: SelectBoxProps<T>) => {
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
    setValue(setValueName, option.value as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const selected = options.find((option) => option.selected);
    if (selected) {
      setSelectedOption(selected);
      setValue(setValueName, selected.value as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
    }
  }, []);

  return (
    <SelectContainer className={className}>
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
              key={option.value + option.label}
              data-value={option.value}
              selected={option.selected}
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

export default SelectBox;
