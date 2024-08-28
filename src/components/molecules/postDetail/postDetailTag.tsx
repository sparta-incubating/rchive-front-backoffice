import TagCard from '@/components/molecules/tagCard';

const PostDetailTag = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-[7.73px]">
      {tags.map((tag, index) => (
        <TagCard key={index} className="pr-3">
          {tag}
        </TagCard>
      ))}
    </div>
  );
};

export default PostDetailTag;
