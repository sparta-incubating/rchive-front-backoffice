'use client';

import Button from '@/components/atoms/button';
import TagContainer from '@/components/organisms/tagContainer';
import SignupTest from '@/components/pages/signupTest';
import { client } from '@/utils/clientAPI';
import { getSession, signOut } from 'next-auth/react';

const Home = () => {
  const Logout = async () => {
    const session = await getSession();
    const isLogin = session?.accessToken;
    if (isLogin) {
      const res = await client.delete('/api/v1/users/logout');
      if (res.status === 200) {
        signOut();
      } else {
        console.log('로그아웃 실패');
      }
    }
  };
  return (
    <div className="w-full">
      <h1>Home</h1>
      <SignupTest />
      <TagContainer placeholder="태그 입력 최대 개수는 10개까지 가능해요." />
      <Button variant="submit" size="sm" onClick={Logout}>
        로그아웃
      </Button>
    </div>
  );
};

export default Home;
