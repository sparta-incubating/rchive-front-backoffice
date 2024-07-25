'use client';

import Button from '@/components/atoms/button';
import TagContainer from '@/components/organisms/tagContainer';
import SignupTest from '@/components/pages/signupTest';
import { client } from '@/utils/clientAPI';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

const Home = () => {
  const router = useRouter();
  const Logout = async () => {
    try {
      const res = await client.delete('/api/v1/users/logout');
      console.log('로그아웃 응답:', res);
      if (res.status === 200) {
        console.log('로그아웃 성공');
        destroyCookie(null, 'accessToken', {
          path: '/', // 쿠키의 경로
        });
        router.push('/login');
      } else {
        console.log('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const handleTest = async () => {
    try {
      const response = await client.post('/api/v1/users/reissue');
      console.log('토큰 갱신 성공:', response.data);

      return response.data.accessToken;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      throw error;
    }
  };
  return (
    <>
      <div className="w-full">
        <h1>Home</h1>
        <SignupTest />
        <TagContainer placeholder="태그 입력 최대 개수는 10개까지 가능해요." />
        <Button variant="submit" size="sm" onClick={Logout}>
          로그아웃
        </Button>
        <button onClick={handleTest}>토큰 갱신 테스트 시작</button>
      </div>
    </>
  );
};

export default Home;
