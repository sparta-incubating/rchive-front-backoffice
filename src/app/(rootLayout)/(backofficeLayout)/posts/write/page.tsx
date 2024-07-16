'use client';

import ThumbnailContainer from '@/components/molecules/thumbnailContainer';
import BackofficePage from '@/components/pages/backofficePage';

const Post = () => {
  return (
    <BackofficePage>
      <div className="m-4 flex flex-col gap-4 rounded-[14px] bg-white px-9 py-8">
        <ThumbnailContainer />
      </div>
    </BackofficePage>
  );
};
export default Post;
