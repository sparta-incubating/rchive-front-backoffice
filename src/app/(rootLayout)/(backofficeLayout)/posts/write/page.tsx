import PostFormContainer from '@/components/organisms/postFormContainer';
import { TagContextProvider } from '@/context/tag.context';

const Post = () => {
  return (
    <>
      <TagContextProvider>
        <PostFormContainer />
      </TagContextProvider>
    </>
  );
};
export default Post;
