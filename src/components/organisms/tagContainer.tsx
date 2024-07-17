'use client';

import CloseButton from '@/components/atoms/closeButton';
import DropDownItem from '@/components/atoms/dropDownItem';
import TagInput from '@/components/atoms/tagInput';
import DropDownContainer from '@/components/molecules/dropDownContainer';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TagCard from '@/components/molecules/tagCard';
import { useTagContext } from '@/context/tag.context';

interface TagContainerProps {
  placeholder: string;
}

const TagContainer = ({ placeholder }: TagContainerProps) => {
  const {
    tags,
    tagContainerRef,
    deleteTag,
    handleFocusTagInput,
    searchTags,
    handleClickBackDropData,
  } = useTagContext();

  return (
    <TitleContainer title="태그">
      <div
        ref={tagContainerRef}
        onClick={handleFocusTagInput}
        className="group relative flex h-auto w-full flex-wrap gap-2 space-x-2 rounded-[12px] border border-blue-100 p-5"
      >
        {tags.map((tag) => (
          <TagCard key={tag.tagId}>
            {tag.tagName}
            <CloseButton onClick={() => deleteTag(tag.tagId)} />
          </TagCard>
        ))}
        <TagInput placeholder={placeholder} />
      </div>

      {searchTags !== null && searchTags.length > 0 && (
        <DropDownContainer disable={false}>
          {searchTags?.map((tag) => (
            <DropDownItem
              key={tag.tagId}
              variant="secondary"
              onClick={() => handleClickBackDropData(tag.tagName)}
            >
              {tag.tagName}
            </DropDownItem>
          ))}
        </DropDownContainer>
      )}
    </TitleContainer>
  );
};

export default TagContainer;
