'use client';

import Button from '@/components/atoms/button';
import Calendar from '@/components/molecules/calendar';
import { createToast } from '@/utils/toast';

const Post = () => {
  return (
    <div>
      Post
      <Button
        size="sm"
        onClick={() => createToast('게시물 작성이 완료되었습니다.', 'primary')}
      >
        토스트 실험
      </Button>
      <div className="h-[40vh]"></div>
      <Calendar />
    </div>
  );
};
export default Post;
