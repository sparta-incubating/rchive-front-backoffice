import CloseButton from '@/components/atoms/closeButton';
import TagInput from '@/components/atoms/tagInput';
import TagCard from '@/components/molecules/tagCard';
import { useTagContext } from '@/context/tag.context';

const TagContainer = () => {
  const { tags, deleteTag, inputRef, handleFocusTagInput } = useTagContext();

  return (
    <div
      onClick={handleFocusTagInput}
      className="group mx-auto min-h-60 w-1/2 rounded-md border border-black/50 p-2"
    >
      {tags.map((tag) => (
        <TagCard key={tag.id}>
          {tag.name}
          <CloseButton onClick={() => deleteTag(tag.id)} />
        </TagCard>
      ))}
      <TagInput ref={inputRef} />
    </div>
  );
};

export default TagContainer;
