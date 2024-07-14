'use client';

import CloseButton from '@/components/atoms/closeButton';
import TagInput from '@/components/atoms/tagInput';
import TagCard from '@/components/molecules/tagCard';
import { useTagContext } from '@/context/tag.context';

interface TagContainerProps {
  placeholder: string;
}

const TagContainer = ({ placeholder }: TagContainerProps) => {
  const { tags, deleteTag, handleFocusTagInput } = useTagContext();

  return (
    <div>
      <label className="text-md my-2 font-normal">태그</label>
      <div
        onClick={handleFocusTagInput}
        className="group flex w-1/2 space-x-2 overflow-x-auto rounded-[12px] border border-blue-100 p-2 scrollbar-hide"
      >
        {tags.map((tag) => (
          <TagCard key={tag.id} className="flex-shrink-0">
            {tag.name}
            <CloseButton onClick={() => deleteTag(tag.id)} />
          </TagCard>
        ))}
        <TagInput className="flex-shrink-0" placeholder={placeholder} />
      </div>
    </div>
  );
};

export default TagContainer;
