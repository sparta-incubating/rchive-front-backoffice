'use client';

import Button from '@/components/atoms/button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const TestComponent = () => {
  const [message, setMessage] = useState('대기중');

  const { data: session, update } = useSession();

  const handleServerRefresh = async () => {
    try {
      const response = await axios.post('/backoffice/api/auth/reissue');
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextAuthRefresh = async () => {
    await update({
      ...session,
      user: { ...session?.user, accessToken: 'asdf' },
    });
  };

  return (
    <>
      <div className="w-full">
        <h1>Home</h1>
        <h2>next auth accessToken tokens: {session?.user.accessToken}</h2>
        <h2>next auth refreshToken tokens: {session?.user.refreshToken}</h2>
        <Button onClick={handleServerRefresh}>ServerRefreshTest</Button>
        <Button onClick={handleNextAuthRefresh}>userUpdate</Button>
        <div>{message}</div>
      </div>
    </>
  );
};

export default TestComponent;
