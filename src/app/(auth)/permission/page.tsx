'use client';

import { AppDispatch } from '@/redux/config/storeConfig';
import { clearTokens } from '@/redux/modules/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Mypage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state) => console.log(state, '로그아웃'));

  const logout = () => {
    dispatch(clearTokens());
  };

  return (
    <div>
      <p>권한 페이지</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Mypage;
