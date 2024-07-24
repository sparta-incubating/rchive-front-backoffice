import { getSearchTutor } from '@/api/postApi';
import CloseButton from '@/components/atoms/closeButton';
import DropDownItem from '@/components/atoms/dropDownItem';
import TutorInput from '@/components/atoms/tutorInput';
import DropDownContainer from '@/components/molecules/dropDownContainer';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TutorCard from '@/components/molecules/tutorCard';
import { TutorType } from '@/types/posts.types';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';

const TutorContainer = () => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchTuTors, setSearchTuTors] = useState<TutorType[] | null>(null);
  const [selectTutor, setSelectTutor] = useState<TutorType | null>(null);

  const handleInput = debounce(async () => {
    if (inputRef.current) {
      const keyword = inputRef.current.innerText;

      if (keyword.trim() === '') {
        setIsOpened(false);
        return;
      }

      const data = await getSearchTutor(keyword);
      setSearchTuTors(data);
    }
  }, 300);

  const deleteTutor = () => {
    setSelectTutor(null);
  };

  return (
    <TitleContainer title="튜터">
      <div className="group relative flex h-[61px] w-[293px] flex-wrap gap-2 rounded-[12px] border border-blue-100 p-5">
        {!!selectTutor && (
          <TutorCard>
            {selectTutor.tutorName}
            <CloseButton onClick={() => deleteTutor()} />
          </TutorCard>
        )}

        {!selectTutor && (
          <TutorInput
            key="tutor"
            handleInput={handleInput}
            placeholder="튜터를 입력해주세요."
            ref={inputRef}
          />
        )}

        {searchTuTors !== null && searchTuTors.length > 0 && (
          <DropDownContainer disable={false} className="ml-0">
            {searchTuTors?.map((tutor) => (
              <DropDownItem
                key={tutor.tutorId}
                variant="secondary"
                onClick={() => {
                  setSelectTutor(tutor);
                  setSearchTuTors(null);
                }}
              >
                {tutor.tutorName}
              </DropDownItem>
            ))}
          </DropDownContainer>
        )}
      </div>
    </TitleContainer>
  );
};

export default TutorContainer;
