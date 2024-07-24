'use client';

import Button from '@/components/atoms/button';
import TagContainer from '@/components/organisms/tagContainer';
import SignupTest from '@/components/pages/signupTest';
import { client } from '@/utils/clientAPI';
import { signOut } from 'next-auth/react';

const Home = () => {
  const Logout = async () => {
    try {
      const res = await client.delete('/api/v1/users/logout');
      console.log('로그아웃 응답:', res);
      if (res.status === 200) {
        await signOut();
        console.log('로그아웃 성공');
      } else {
        console.log('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      // 오류가 발생해도 클라이언트 측에서 로그아웃
      await signOut();
      console.log('오류 발생으로 인한 강제 로그아웃');
    }
  };
  const HandleTest = async () => {
    try {
      const response = await client.post(
        '/api/v1/users/reissue',
        {},
        {
          withCredentials: true, // 쿠키 전송을 위해 필요
        },
      );
      console.log('토큰 갱신 성공:', response.data);
      // 여기서 새로운 액세스 토큰을 받아 저장하거나 처리할 수 있습니다.
      return response.data.accessToken; // 새 액세스 토큰 반환
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
        </Button>{' '}
        <button onClick={HandleTest}>토큰 갱신 테스트 시작</button>
      </div>
    </>
  );
};

export default Home;
