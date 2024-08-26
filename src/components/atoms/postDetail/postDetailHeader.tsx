import PostDetailHeaderCategory from '@/components/atoms/postDetail/postDetailHeaderCategory';
import { useState } from 'react';

const TITLE_OPTIONS = {
  VIDEO: '영상자료',
  CONTENT: '노션자료',
};

const PostDetailHeader = () => {
  const [currentState, setCurrentState] = useState(TITLE_OPTIONS.VIDEO);
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
