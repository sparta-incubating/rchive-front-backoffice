'use client';

import CloseButton from '@/components/atoms/closeButton';
import DropDownItem from '@/components/atoms/dropDownItem';
import TagInput from '@/components/atoms/tagInput';
import DropDownContainer from '@/components/molecules/dropDownContainer';
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
    <div className="relative">
      <label className="text-md my-2 font-normal">태그</label>
      <div
        ref={tagContainerRef}
        onClick={handleFocusTagInput}
        className="group relative flex w-1/2 space-x-2 overflow-x-auto rounded-[12px] border border-blue-100 p-2 scrollbar-hide"
      >
        {tags.map((tag) => (
          <TagCard key={tag.tagId} className="flex-shrink-0">
            {tag.tagName}
            <CloseButton onClick={() => deleteTag(tag.tagId)} />
          </TagCard>
        ))}
        <TagInput className="flex-shrink-0" placeholder={placeholder} />
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
    </div>
  );
};

export default TagContainer;
