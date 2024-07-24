import { getTags } from '@/api/postApi';
import DropDownItem from '@/components/atoms/dropDownItem';
import TutorInput from '@/components/atoms/tutorInput';
import DropDownContainer from '@/components/molecules/dropDownContainer';
import TitleContainer from '@/components/molecules/post/titleContainer';
import { TutorType } from '@/types/posts.types';
import { TagType } from '@/types/tag.types';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';

const TutorContainer = () => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchTags, setSearchTags] = useState<TagType[] | null>(null);
  const [searchTutors, setSearchTutors] = useState<TutorType[]>();

  const handleInput = debounce(async () => {
    if (inputRef.current) {
      const keyword = inputRef.current.innerText;

      // text가 없을때 backDrop 숨김
      if (keyword.trim() === '') {
        setIsOpened(false);
        return;
      }

      const data = await getTags(keyword);
      setSearchTags(data);
    }
  }, 300);

  return (
    <TitleContainer title="튜터">
      <div className="group relative flex h-auto w-full flex-wrap gap-2 rounded-[12px] border border-blue-100 p-5">
        <TutorInput
          key="tutor"
          handleInput={handleInput}
          placeholder="튜터를 입력해주세요."
          ref={inputRef}
        />
        {searchTags !== null && searchTags.length > 0 && (
          <DropDownContainer disable={false} className="ml-0">
            {searchTags?.map((tag) => (
              <DropDownItem
                key={tag.tagId}
                variant="secondary"
                onClick={() => {}}
              >
                {tag.tagName}
              </DropDownItem>
            ))}
          </DropDownContainer>
        )}
      </div>
    </TitleContainer>
  );
};

export default TutorContainer;
