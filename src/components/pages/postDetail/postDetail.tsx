import { PostForm } from '@/class/postForm';
import PostDetailHeader from '@/components/atoms/postDetail/postDetailHeader';
import VideoComponent from '@/components/molecules/postDetail/videoComponent';

interface PostDetailProps {
  postData: PostForm;
}

const PostDetail = ({ postData }: PostDetailProps) => {
  return (
    <div className="mx-auto min-w-[1392px]">
      <div className="m-6 w-full">
        <section className="flex flex-col">
          <div className="mx-auto my-2">
            <PostDetailHeader />
            {postData.videoLink && (
              <VideoComponent videoLink={postData.videoLink} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetail;
