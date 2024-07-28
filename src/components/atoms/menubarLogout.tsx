'use client';

import { client } from '@/utils/clientAPI';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';

interface MenubarLogoutProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const MenubarLogout = ({ children, ...props }: MenubarLogoutProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await client.delete('/api/v1/users/logout');
      if (res.status === 200) {
        deleteCookie('AT');
        router.push('/login');
      } else {
        console.log('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <button
      className="font-xl h-16 w-[292px] rounded-[12px] px-9 py-5 text-left font-bold text-gray-600 hover:bg-[#1F2122] hover:text-white"
      {...props}
      onClick={handleLogout}
    >
      {children}
    </button>
  );
};
export default MenubarLogout;
