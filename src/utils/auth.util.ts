import { LastConnectRoleDataType } from '@/types/auth.types';
import { deleteCookie, setCookie } from 'cookies-next';

export const setCookieRole = (data: LastConnectRoleDataType) => {
  const { trackId, trackRole, trackName, period } = data;
  setCookie('trackId', trackId);
  setCookie('trackRole', trackRole);
  setCookie('trackName', trackName);
  setCookie('period', period);
};

export const deleteCookieRole = () => {
  deleteCookie('trackId');
  deleteCookie('trackRole');
  deleteCookie('trackName');
  deleteCookie('period');
};

export const logoutCookie = () => {
  deleteCookie('AT');
  deleteCookieRole();
};
