import { PostForm } from '@/class/postForm';
import PostDetailHeader from '@/components/atoms/postDetail/postDetailHeader';
import NotionContainer from '@/components/molecules/postDetail/notionContainer';
import PostDetailTag from '@/components/molecules/postDetail/postDetailTag';
import SocialButtonGroup from '@/components/molecules/postDetail/socialButtonGroup';
import VideoContainer from '@/components/molecules/postDetail/videoContainer';
import useSocialButtonPosition from '@/hooks/useSocialButtonPosition';
import { useMemo, useState } from 'react';

interface PostDetailProps {
  postData: PostForm;
}

const TITLE_OPTIONS = {
  VIDEO: '영상자료',
  CONTENT: '노션자료',
};

const PostDetail = ({ postData }: PostDetailProps) => {
  const initialView = useMemo(() => {
    if (postData.videoLink && postData.contentLink) {
      return TITLE_OPTIONS.VIDEO;
    } else if (postData.videoLink) {
      return TITLE_OPTIONS.VIDEO;
    } else {
      return TITLE_OPTIONS.CONTENT;
    }
  }, [postData.videoLink, postData.contentLink]);

  const [currentView, setCurrentView] = useState(initialView);
  const { containerRef, fixedPosition } = useSocialButtonPosition();

  return (
    <div className="mx-auto min-w-[1392px]">
      <div className="relative m-6 w-full" ref={containerRef}>
        <section className="flex flex-col">
          <div className="mx-auto my-2 min-w-[800px]">
            {postData.videoLink && postData.contentLink && (
              <PostDetailHeader
                currentState={currentView}
                setCurrentState={setCurrentView}
              />
            )}

            {postData.videoLink && (
              <div
                className={
                  currentView === TITLE_OPTIONS.VIDEO ? 'block' : 'hidden'
                }
              >
                <div className="flex flex-col gap-[35px]">
                  <VideoContainer videoLink={postData.videoLink} />
                  {!!postData.tagNameList && (
                    <PostDetailTag tags={postData.tagNameList!} />
                  )}
                </div>
              </div>
            )}
            {postData.contentLink && (
              <div
                className={
                  currentView === TITLE_OPTIONS.CONTENT ? 'block' : 'hidden'
                }
              >
                <NotionContainer notionLink={postData.contentLink!} />
              </div>
            )}
          </div>
        </section>

        <div
          className="fixed"
          style={{
            top: `${fixedPosition.top}px`,
            left: `${fixedPosition.left}px`,
          }}
        >
          <SocialButtonGroup />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
