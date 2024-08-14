'use client';

import Button from '@/components/atoms/button';
import axios from 'axios';
import { useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('대기중');

  const handleRefresh = async () => {
    try {
      const response = await axios.post('/api/auth/reissue');
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full">
        <h1>Home</h1>
        <Button onClick={handleRefresh}>loginTest</Button>
        <div>{message}</div>
      </div>
    </>
  );
};

export default Home;
