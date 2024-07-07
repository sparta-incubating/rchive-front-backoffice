'use client';

import AcceptAllTerm from '@/components/molecules/acceptAllTerm';
import AcceptTerm from '@/components/molecules/acceptTerm';
import MoreLink from '@/components/atoms/moreLink';
import useCheckBox from '@/hooks/useCheckBox';
import { useState } from 'react';
import { CheckListType } from '@/types/signup.types';

const AcceptTermsGroup = () => {
  const [checkList, setCheckList] = useState<CheckListType[]>([
    { id: 'age', label: '[필수]만 14세 이상', isChecked: false },
    {
      id: 'service',
      label: '[필수]서비스 약관 동의',
      isChecked: false,
      //TODO: 각 약관에 맞는 링크로 변경해야함.
      link: 'https://teamsparta.notion.site/247d57da1322424d8e8c551df21a048e',
    },
    {
      id: 'privacy',
      label: '[필수]개인정보처리방침 및 제3자 제공 동의',
      isChecked: false,
      //TODO: 각 약관에 맞는 링크로 변경해야함.
      link: 'https://teamsparta.notion.site/7b1dc644460946f08bab08b794de685f',
    },
    { id: 'ad', label: '[선택]광고성 정보 수신 동의', isChecked: false },
  ]);

  const { handleCheck, handleCheckAll, handleAllCheckClick } = useCheckBox(
    checkList,
    setCheckList,
  );

  return (
    <div className="flex w-full flex-col gap-[18px] px-6 pb-6">
      <AcceptAllTerm
        checkBoxId={'all'}
        isChecked={checkList.every((check) => {
          return check.isChecked;
        })}
        onChange={handleCheckAll}
        onClick={handleAllCheckClick}
      >
        전체 약관 동의
      </AcceptAllTerm>

      <div className="flex flex-col gap-4">
        {checkList.map((check) => {
          return (
            <div className="flex justify-between">
              <AcceptTerm
                key={check.id}
                checkBoxId={check.id}
                isChecked={check.isChecked}
                onChange={() => handleCheck(check.id)}
              >
                {check.label}
              </AcceptTerm>
              {check.id === 'service' || check.id === 'privacy' ? (
                <MoreLink href={check.link} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AcceptTermsGroup;
