'use client';

import { Dispatch, SetStateAction } from 'react';
import { CheckListType } from '@/types/signup.types';

const useCheckBox = (
  checkList: CheckListType[],
  setCheckList: Dispatch<SetStateAction<CheckListType[]>>,
) => {
  const handleCheck = (id: string) => {
    setCheckList((prev) =>
      prev.map((check) =>
        check.id === id
          ? {
              ...check,
              isChecked: !check.isChecked,
            }
          : check,
      ),
    );
  };

  const handleCheckAll = () => {
    const allChecked = checkList.every((check) => check.isChecked);
    setCheckList((prev) =>
      prev.map((check) => ({ ...check, isChecked: !allChecked })),
    );
  };

  const handleAllCheckClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLLabelElement>,
  ) => {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      handleCheckAll();
    }
  };

  return { handleCheck, handleCheckAll, handleAllCheckClick };
};

export default useCheckBox;
