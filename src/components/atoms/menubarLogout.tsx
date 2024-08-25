'use client';

import { signOut } from 'next-auth/react';
import { ComponentProps, ReactNode } from 'react';

interface MenubarLogoutProps extends ComponentProps<'button'> {
  children: ReactNode;
}

const MenubarLogout = ({ children, ...props }: MenubarLogoutProps) => {
  const handleLogout = async () => {
    await signOut();
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
