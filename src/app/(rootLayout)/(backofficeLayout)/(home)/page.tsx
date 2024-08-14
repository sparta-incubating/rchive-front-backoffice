'use client';

import { postReissue } from '@/api/authApi';
import Button from '@/components/atoms/button';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('대기중');

  const handleServerRefresh = async () => {
    try {
      const response = await axios.post('/api/auth/reissue');
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientRefresh = async () => {
    const refresh = getCookie('Refresh');
    console.log({ refresh });
    try {
      const response = await postReissue();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <h1>Home</h1>
        <Button onClick={handleServerRefresh}>ServerRefreshTest</Button>
        <Button onClick={handleClientRefresh} variant="submit">
          ClientRefreshTest
        </Button>
        <div>{message}</div>
      </div>
    </>
  );
};

export default Home;
