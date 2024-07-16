'use client';

import ThumbnailContainer from '@/components/molecules/thumbnailContainer';
import TagContainer from '@/components/organisms/tagContainer';
import BackofficePage from '@/components/pages/backofficePage';

const Post = () => {
  return (
    <BackofficePage>
      <div className="m-4 flex flex-col gap-4 rounded-[14px] bg-white px-9 py-8">
        <ThumbnailContainer />
      </div>
      <TagContainer placeholder="태그 입력 최대 개수는 10개까지 가능해요." />
    </BackofficePage>
  );
};
export default Post;
