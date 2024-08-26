import { classMerge } from '@/utils/utils';
import { Dispatch, SetStateAction } from 'react';

interface PostDetailHeaderCategoryProps {
  title: string;
  currentState: string;
  setCurrentState: Dispatch<SetStateAction<string>>;
}

const PostDetailHeaderCategory = ({
  title,
  currentState,
  setCurrentState,
}: PostDetailHeaderCategoryProps) => {
  return (
    <div
      onClick={() => setCurrentState(title)}
      className={classMerge(
        'flex h-[72.5px] w-[392px] cursor-pointer items-center justify-center border-b border-gray-400',
        title === currentState && 'border-b-2 border-gray-900',
      )}
    >
      <h1
        className={classMerge(
          'text-[17.4px] font-bold text-gray-400',
          title === currentState && 'text-gary-900',
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default PostDetailHeaderCategory;
