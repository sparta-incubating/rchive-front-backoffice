'use client';

import SignupContainer from '@/components/organisms/signupContainer';
import SignupHeader from '@/components/molecules/signupHeader';
import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import AcceptTermsGroup from '@/components/organisms/acceptTermsGroup';
import StepIndicatorGroup from '@/components/molecules/stepIndicatorGroup';
import SelectBox from '@/components/organisms/selectBox';
import { SelectOptionType } from '@/types/signup.types';
import { useCallback, useState } from 'react';

const SignupModal = () => {
  const [selectOptions, setSelectOptions] = useState<SelectOptionType[]>([
    { value: '1', label: 'AI 웹게발', selected: false },
    { value: '2', label: '데이터 분석', selected: false },
    { value: '3', label: '백엔드 개발(Java+Spring)', selected: false },
    { value: '4', label: '백엔드 개발(Node.js+Express)', selected: false },
    { value: '5', label: '프론트엔드 개발(React)', selected: false },
  ]);

  const handleSelected = useCallback((value: SelectOptionType['value']) => {
    setSelectOptions((prev) =>
      prev.map((option) =>
        option.value === value
          ? { ...option, selected: true }
          : { ...option, selected: false },
      ),
    );
  }, []);

  return (
    <Modal>
      <SignupContainer>
        {/*modal 헤더*/}
        <SignupHeader />
        {/*step 인디케이터*/}
        <StepIndicatorGroup />

        {/*select test*/}
        <SelectBox
          options={selectOptions}
          label="트랙"
          onSelect={handleSelected}
        />

        {/*약관*/}
        <AcceptTermsGroup />
        {/*button*/}
        <Button disabled={true} className="mb-5 w-80 px-7">
          다음
        </Button>
      </SignupContainer>
    </Modal>
  );
};

export default SignupModal;
