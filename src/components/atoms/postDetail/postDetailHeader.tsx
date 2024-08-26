import PostDetailHeaderCategory from '@/components/atoms/postDetail/postDetailHeaderCategory';
import { Dispatch, SetStateAction } from 'react';

const TITLE_OPTIONS = {
  VIDEO: '영상자료',
  CONTENT: '노션자료',
};

interface PostDetailHeaderProps {
  currentState: string;
  setCurrentState: Dispatch<SetStateAction<string>>;
}

const PostDetailHeader = ({
  currentState,
  setCurrentState,
}: PostDetailHeaderProps) => {
  return (
    <header className="mx-auto mb-[62px] flex">
      <PostDetailHeaderCategory
        title={TITLE_OPTIONS.VIDEO}
        currentState={currentState}
        setCurrentState={setCurrentState}
      />
      <PostDetailHeaderCategory
        title={TITLE_OPTIONS.CONTENT}
        currentState={currentState}
        setCurrentState={setCurrentState}
      />
    </header>
  );
};

export default PostDetailHeader;
