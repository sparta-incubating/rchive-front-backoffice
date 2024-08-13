import { SelectOptionType } from '@/types/signup.types';
import { useCallback, useEffect, useState } from 'react';

const useSelectBox = (options: SelectOptionType[]) => {
  const [selectOptions, setSelectOptions] =
    useState<SelectOptionType[]>(options);

  useEffect(() => {
    setSelectOptions((prevOptions) => {
      // 초기 옵션이 이전 상태와 다를 때만 업데이트
      if (JSON.stringify(prevOptions) !== JSON.stringify(options)) {
        return options;
      }
      return prevOptions;
    });
  }, [options]);

  const handleSelected = useCallback((value: SelectOptionType['value']) => {
    setSelectOptions((prev) =>
      prev.map((option) => ({
        ...option,
        selected: option.value === value,
      })),
    );
  }, []);

  return { selectOptions, handleSelected };
};

export default useSelectBox;
