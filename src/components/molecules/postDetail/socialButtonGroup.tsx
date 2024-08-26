import SocialButton from '@/components/atoms/postDetail/socialButton';

const SocialButtonGroup = () => {
  return (
    <div className="flex flex-col gap-5">
      <SocialButton image="/assets/icons/bookmark.svg" />
      <SocialButton image="/assets/icons/comment.svg" />
    </div>
  );
};

export default SocialButtonGroup;
