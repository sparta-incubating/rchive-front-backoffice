'use client';

import Button from '@/components/atoms/button';
import Calendar from '@/components/molecules/calendar';
import { client } from '@/utils/clientAPI';
import { createToast } from '@/utils/toast';
import { signOut } from 'next-auth/react';

const Post = () => {
  const Logout = async () => {
    alert('???');
    const res = await client.delete('/api/vi/users/logout');
    console.log(res.status, 'res.status');
    signOut();
  };
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
      {/* <button onDoubleClick={() => signOut()}>auth 로그아웃</button> */}
      <button onClick={Logout}>api 로그아웃</button>
    </div>
  );
};
export default Post;
