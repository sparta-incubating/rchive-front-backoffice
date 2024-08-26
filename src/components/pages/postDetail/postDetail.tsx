import { PostForm } from '@/class/postForm';

interface PostDetailProps {
  postData: PostForm;
}

const PostDetail = ({ postData }: PostDetailProps) => {
  return <div className="m-6 border border-gray-200"></div>;
};

export default PostDetail;
