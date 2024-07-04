'use client';

import CustomCheckBox from '@/components/atoms/customCheckBox';
import { useState } from 'react';

const AcceptAllTerms = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className="items-top flex space-x-2">
      <CustomCheckBox
        id={'ageCut'}
        variant={'checked'}
        checked={isChecked}
        onChange={handleCheck}
      />
      <label htmlFor={'ageCut'}>[필수]만 14세 이상</label>
    </div>
  );
};
export default AcceptAllTerms;
