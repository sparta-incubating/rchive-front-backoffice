import { useCallback, useState } from 'react';
import { SelectOptionType } from '@/types/signup.types';

const useSelectBox = (options: SelectOptionType[]) => {
  const [selectOptions, setSelectOptions] =
    useState<SelectOptionType[]>(options);

  const handleSelected = useCallback((value: SelectOptionType['value']) => {
    setSelectOptions((prev) =>
      prev.map((option) =>
        option.value === value
          ? { ...option, selected: true }
          : { ...option, selected: false },
      ),
    );
  }, []);

  return { selectOptions, handleSelected };
};

export default useSelectBox;
