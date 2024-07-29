'use client';

import FormSpan from '@/components/atoms/formSpan';
import MoreLink from '@/components/atoms/moreLink';
import AcceptAllTerm from '@/components/molecules/acceptAllTerm';
import AcceptTerm from '@/components/molecules/acceptTerm';
import useSignupCheckBox from '@/hooks/useSignupCheckBox';
import { CheckListType, SignupFormSchema } from '@/types/signup.types';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface AcceptTermsGroupProps {
  register: UseFormRegister<SignupFormSchema>;
  setValue: UseFormSetValue<SignupFormSchema>;
  getValues: UseFormGetValues<SignupFormSchema>;
  errors: FieldErrors<SignupFormSchema>;
}

const AcceptTermsGroup = ({
  register,
  setValue,
  getValues,
  errors,
}: AcceptTermsGroupProps) => {
  const terms: CheckListType[] = [
    { id: 'age', label: '[필수]만 14세 이상', isChecked: getValues('age') },
    {
      id: 'service',
      label: '[필수]서비스 약관 동의',
      isChecked: getValues('service'),
      link: 'https://teamsparta.notion.site/247d57da1322424d8e8c551df21a048e',
    },
    {
      id: 'privacy',
      label: '[필수]개인정보처리방침 및 제3자 제공 동의',
      isChecked: getValues('privacy'),
      link: 'https://teamsparta.notion.site/7b1dc644460946f08bab08b794de685f',
    },
    {
      id: 'ad',
      label: '[선택]광고성 정보 수신 동의',
      isChecked: getValues('ad'),
    },
  ];

  const {
    state: checkList,
    handleCheck,
    handleCheckAll,
  } = useSignupCheckBox(terms, setValue);

  return (
    <div className="flex w-full flex-col gap-[18px] px-6 pb-6">
      <AcceptAllTerm
        checkBoxId={'all'}
        isChecked={checkList.every((check) => check.isChecked)}
        onChange={handleCheckAll}
      >
        전체 약관 동의
      </AcceptAllTerm>

      <div className="flex flex-col gap-4">
        {checkList.map((check) => (
          <div key={check.id} className="flex justify-between">
            <AcceptTerm
              checkBoxId={check.id}
              isChecked={check.isChecked}
              register={register}
              onChange={() => handleCheck(check.id)}
            >
              {check.label}
            </AcceptTerm>
            {(check.id === 'service' || check.id === 'privacy') && (
              <MoreLink href={check.link} />
            )}
          </div>
        ))}
      </div>
      {errors.age?.message && (
        <FormSpan variant="error">{errors.age.message}</FormSpan>
      )}
      {errors.service?.message && (
        <FormSpan variant="error">{errors.service.message}</FormSpan>
      )}
      {errors.privacy?.message && (
        <FormSpan variant="error">{errors.privacy.message}</FormSpan>
      )}
    </div>
  );
};

export default AcceptTermsGroup;
