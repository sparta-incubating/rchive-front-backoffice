'use server';

import { LastConnectRoleDataType } from '@/types/auth.types';
import { deleteCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const setServerCookieRole = (data: LastConnectRoleDataType) => {
  const { trackId, trackRole, trackName, period } = data;

  setCookie('trackId', trackId, { cookies });
  setCookie('trackRole', trackRole, { cookies });
  setCookie('trackName', trackName, { cookies });
  setCookie('period', period, { cookies });
};

export const deleteServerCookieRole = () => {
  deleteCookie('trackId', { cookies });
  deleteCookie('trackRole', { cookies });
  deleteCookie('trackName', { cookies });
  deleteCookie('period', { cookies });
};

export const serverLogout = () => {
  deleteCookie('AT', { cookies });
  deleteServerCookieRole();
  redirect('/login');
};

export const setServerCookieLogin = (accessToken: string) => {
  setCookie('AT', accessToken, { cookies });
};
