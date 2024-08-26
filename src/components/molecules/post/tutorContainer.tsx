import { getSearchTutor } from '@/api/client/postApi';
import CloseButton from '@/components/atoms/closeButton';
import DropDownItem from '@/components/atoms/dropDownItem';
import FormSpan from '@/components/atoms/formSpan';
import TutorInput from '@/components/atoms/tutorInput';
import DropDownContainer from '@/components/molecules/dropDownContainer';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TutorCard from '@/components/molecules/tutorCard';
import { useAppSelector } from '@/redux/storeConfig';
import { PostsFormSchema, TutorType } from '@/types/posts.types';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface TutorContainerProps {
  setValue: UseFormSetValue<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
  errors: FieldErrors<PostsFormSchema>;
}

const TutorContainer = ({ setValue, watch, errors }: TutorContainerProps) => {
  const { period: loginPeriod } = useAppSelector((state) => state.authSlice);
  const inputRef = useRef<HTMLDivElement>(null);
  const [periodError, setPeriodError] = useState<string>('');
  const [searchTutors, setSearchTutors] = useState<TutorType[] | null>(null);
  const tutor = watch('tutor');

  const handleInput = debounce(async () => {
    const period = watch('postPeriod');
    if (!period) {
      setPeriodError('기수를 먼저 선택해주세요.');
      return;
    }

    setPeriodError('');
    if (inputRef.current) {
      const keyword = inputRef.current.innerText;

      if (keyword.trim() === '') {
        setSearchTutors(null);
        return;
      }

      const response = await getSearchTutor(
        watch('trackName'),
        Number(loginPeriod),
        Number(period),
        keyword,
      );
      setSearchTutors(response.data);
    }
  }, 300);

  const deleteTutor = () => {
    setValue('tutor', null);
    if (inputRef.current) {
      inputRef.current.innerText = '';
    }
  };

  const selectTutor = (selectedTutor: TutorType) => {
    setValue('tutor', selectedTutor);
    setSearchTutors(null);
  };

  return (
    <TitleContainer title="튜터" className="w-full">
      <div className="group relative flex h-[61px] w-full items-center gap-2 rounded-[12px] border border-blue-100 px-5">
        {tutor ? (
          <TutorCard>
            {tutor.tutorName}
            <CloseButton onClick={deleteTutor} />
          </TutorCard>
        ) : (
          <TutorInput
            key="tutor"
            handleInput={handleInput}
            placeholder="튜터를 입력해주세요."
            ref={inputRef}
          />
        )}

        {searchTutors && searchTutors.length > 0 && (
          <DropDownContainer disable={false} className="ml-0">
            {searchTutors.map((tutorItem) => (
              <DropDownItem
                key={tutorItem.tutorId}
                variant="secondary"
                onClick={() => selectTutor(tutorItem)}
              >
                {tutorItem.tutorName}
              </DropDownItem>
            ))}
          </DropDownContainer>
        )}
      </div>
      {periodError && <FormSpan variant="error">{periodError}</FormSpan>}
      {errors.tutor?.message && (
        <FormSpan variant="error">{errors.tutor.message}</FormSpan>
      )}
    </TitleContainer>
  );
};

export default TutorContainer;
