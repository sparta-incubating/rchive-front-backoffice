'use server';

import { LastConnectRoleDataType } from '@/types/auth.types';
import { deleteCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const setServerCookieRole = async (data: LastConnectRoleDataType) => {
  const { trackId, trackRole, trackName, period } = data;

  setCookie('trackId', trackId, { cookies });
  setCookie('trackRole', trackRole, { cookies });
  setCookie('trackName', trackName, { cookies });
  setCookie('period', period, { cookies });
};

export const deleteServerCookieRole = async () => {
  deleteCookie('trackId', { cookies });
  deleteCookie('trackRole', { cookies });
  deleteCookie('trackName', { cookies });
  deleteCookie('period', { cookies });
};

export const setServerAccessTokenCookie = async (accessToken: string) => {
  setCookie('AT', accessToken, { cookies });
};
