import CustomDropDown from '@/components/atoms/customDropDown';
import SelectContainer from '@/components/atoms/selectContainer';
import SelectDumyItem from '@/components/atoms/selectDumyItem';
import SelectInput from '@/components/atoms/selectInput';
import SelectItem from '@/components/atoms/selectItem';
import SelectLabel from '@/components/atoms/selectLabel';
import SelectLayout from '@/components/atoms/selectLayout';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
import { SelectOptionType } from '@/types/signup.types';
import { Fragment, useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface SelectBoxProps<T extends FieldValues> {
  options: SelectOptionType[];
  label: string;
  onSelect: (value: SelectOptionType['value']) => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  field: ControllerRenderProps<T>;
}

const SelectCategoryFormBox = <T extends FieldValues>({
  options,
  label,
  onSelect,
  variant,
  className,
  field,
}: SelectBoxProps<T>) => {
  const { isOpen, setIsOpen, dropdownRef, handleClick } =
    useDropDownOutsideClick();

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    options.find((option) => option.value === field.value) || null,
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
          variant={selectedOption ? 'selected' : 'unSelected'}
          onClick={handleClick}
          clicked={isOpen}
        >
          {selectedOption ? selectedOption.label : '선택안함'}
        </SelectInput>
        <CustomDropDown clicked={isOpen} ref={dropdownRef}>
          {options.map((option, index) => (
            <Fragment key={option.value}>
              {index === 1 && <SelectDumyItem title="수준별 강의" />}
              {index === 4 && <SelectDumyItem />}

              <SelectItem
                data-value={option.value}
                selected={option.value === selectedOption?.value}
                variant={variant}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </SelectItem>
            </Fragment>
          ))}
        </CustomDropDown>
      </SelectLayout>
    </SelectContainer>
  );
};

export default SelectCategoryFormBox;
