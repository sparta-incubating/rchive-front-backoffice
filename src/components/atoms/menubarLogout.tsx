'use client';

import { logout } from '@/api/authApi';
import { logoutCookie } from '@/utils/auth.util';
import { useRouter } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';

interface MenubarLogoutProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const MenubarLogout = ({ children, ...props }: MenubarLogoutProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const status = await logout();
    logoutCookie();
    if (status === 200) router.push('/login');
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
