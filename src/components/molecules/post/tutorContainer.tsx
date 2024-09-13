import { getSearchTutor } from '@/api/client/postApi';
import CloseButton from '@/components/atoms/closeButton';
import CustomDropDown from '@/components/atoms/customDropDown';
import FormSpan from '@/components/atoms/formSpan';
import SelectItem from '@/components/atoms/selectItem';
import TutorInput from '@/components/atoms/tutorInput';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TutorCard from '@/components/molecules/tutorCard';
import useDropDownOutsideClick from '@/hooks/useDropDownOutsideClick';
import { useAppSelector } from '@/redux/storeConfig';
import { PostsFormSchema } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface TutorContainerProps {
  setValue: UseFormSetValue<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
  errors: FieldErrors<PostsFormSchema>;
}

const TutorContainer = ({ setValue, watch, errors }: TutorContainerProps) => {
  const { isOpen, setIsOpen, dropdownRef, handleClick } =
    useDropDownOutsideClick();
  const [placeHolder, setPlaceHolder] =
    useState<string>('기수를 먼저 선택해주세요.');
  const { period: loginPeriod } = useAppSelector((state) => state.authSlice);
  const inputRef = useRef<HTMLDivElement>(null);
  const [periodError, setPeriodError] = useState<string>('');

  const [searchTutors, setSearchTutors] = useState<SelectOptionType[] | null>(
    null,
  );

  const tutor = watch('tutor');
  const period = watch('postPeriod');

  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(
    searchTutors?.find((option) => option.value === '') || null,
  );

  const handleSelect = (option: SelectOptionType) => {
    setSelectedOption(option);
    setValue(
      'tutor',
      {
        tutorId: Number(option.value),
        tutorName: option.label,
      },
      { shouldValidate: true },
    );
    setIsOpen(false);
  };

  const handleInputClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const period = watch('postPeriod');

    if (!isOpen) {
      if (!period) {
        setPeriodError('기수를 먼저 선택해주세요.');
        return;
      }
    }

    setPeriodError('');
    let response;
    if (!isOpen) {
      response = await getSearchTutor(
        watch('trackName'),
        Number(loginPeriod),
        Number(period),
        '',
      );
    }

    let tutors: SelectOptionType[] = [];

    if (response?.data) {
      tutors = response.data.map((tutor) => ({
        value: String(tutor.tutorId),
        label: tutor.tutorName,
        selected: false,
      })) as SelectOptionType[];
    }

    setSearchTutors(tutors);
    handleClick(e);
  };

  const deleteTutor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue('tutor', undefined, { shouldValidate: true });
    setSelectedOption(null);
    if (inputRef.current) {
      inputRef.current.innerText = '';
    }
  };

  return (
    <TitleContainer title="튜터" className="w-full">
      <div
        onClick={handleInputClick}
        className="group relative flex h-[61px] w-full items-center justify-between gap-2 rounded-[12px] border border-blue-100 px-5"
      >
        {tutor ? (
          <TutorCard>
            {tutor.tutorName}
            <CloseButton onClick={deleteTutor} />
          </TutorCard>
        ) : (
          <TutorInput key="tutor" placeholder={placeHolder} ref={inputRef} />
        )}
        {period && (
          <div
            data-clicked={isOpen}
            className="flex h-6 w-6 rotate-180 items-center justify-center transition-transform duration-500 ease-in-out data-[clicked=false]:rotate-0"
          >
            <Image
              src={'/backoffice/assets/icons/selectArrow.svg'}
              alt={'select arrow icon'}
              fill
            />
          </div>
        )}

        <CustomDropDown clicked={isOpen} ref={dropdownRef}>
          {searchTutors && searchTutors?.length > 0 ? (
            searchTutors?.map((tutorItem) => (
              <SelectItem
                key={tutorItem.value}
                data-value={tutorItem.value}
                selected={tutorItem.value === selectedOption?.value}
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(tutorItem);
                }}
              >
                {tutorItem.label}
              </SelectItem>
            ))
          ) : (
            <div className="flex w-full">
              <span className="mx-auto text-sm">튜터 데이터가 없습니다.</span>
            </div>
          )}
        </CustomDropDown>
      </div>
      {periodError && <FormSpan variant="error">{periodError}</FormSpan>}
      {errors.tutor?.message && (
        <FormSpan variant="error">{errors.tutor.message}</FormSpan>
      )}
    </TitleContainer>
  );
};

export default TutorContainer;
