'use client';

import Button from '@/components/atoms/button';
import BackofficePage from '@/components/pages/backofficePage';
import { createToast } from '@/utils/toast';

const Post = () => {
  return (
    <BackofficePage>
      <Button
        size="sm"
        onClick={() => createToast('게시물 작성이 완료되었습니다.', 'primary')}
      >
        토스트 실험
      </Button>
      <div className="h-[40vh]"></div>
    </BackofficePage>
  );
};
export default Post;
