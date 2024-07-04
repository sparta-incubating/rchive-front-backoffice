'use client';

import CustomCheckBox from '@/components/atoms/customCheckBox';
import { useState } from 'react';

const AcceptAllTerm = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className="items-top flex space-x-2">
      <CustomCheckBox
        id={'allTerms'}
        variant={'all'}
        checked={isChecked}
        onChange={handleCheck}
      />
      <label htmlFor={'allTerms'}>전체 약관 동의</label>
    </div>
  );
};
export default AcceptAllTerm;
