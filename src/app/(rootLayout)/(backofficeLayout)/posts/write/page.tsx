import PostFormContainer from '@/components/organisms/postFormContainer';
import BackofficePage from '@/components/pages/backofficePage';
import { TagContextProvider } from '@/context/tag.context';

const Post = () => {
  return (
    <BackofficePage>
      <TagContextProvider>
        <PostFormContainer />
      </TagContextProvider>
    </BackofficePage>
  );
};
export default Post;
