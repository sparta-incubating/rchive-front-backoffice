'use client';

import { postReissue } from '@/api/authApi';
import Button from '@/components/atoms/button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const TestComponent = ({ refreshToken }: { refreshToken: string }) => {
  const [message, setMessage] = useState('대기중');

  const { data: session, update } = useSession();

  const handleServerRefresh = async () => {
    try {
      const response = await axios.post('/api/auth/reissue');
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientRefresh = async () => {
    try {
      const response = await postReissue();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextAuthRefresh = async () => {
    await update();
  };

  return (
    <>
      <div className="w-full">
        <h1>Home</h1>
        <h1>refresh is {refreshToken}</h1>
        <h2>next auth accessToken tokens: {session?.user.accessToken}</h2>
        <h2>next auth refreshToken tokens: {session?.user.accessToken}</h2>
        <Button onClick={handleServerRefresh}>ServerRefreshTest</Button>
        <Button onClick={handleClientRefresh} variant="submit">
          ClientRefreshTest
        </Button>
        <Button onClick={handleNextAuthRefresh}>userUpdate</Button>
        <div>{message}</div>
      </div>
    </>
  );
};

export default TestComponent;
