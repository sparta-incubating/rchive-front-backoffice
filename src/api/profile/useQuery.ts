'use client';

import { useQuery } from '@tanstack/react-query';
import { PROFILE_QUERY_KEYS } from './keys.constant';
import { getUserInfo, updatePassword, updatePhone } from './profileApi';

export function useUserInfoDataQuery() {
  const {
    data: userData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE],
    queryFn: getUserInfo,
  });

  return { userData, isPending, isError };
}

export function useUserPatchPhoneQuery(phoneNumber: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE],
    queryFn: () => updatePhone(phoneNumber),
    enabled: !!phoneNumber,
  });

  return { data, isPending, isError };
}

export function useUserPatchPasswordQuery(password: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE],
    queryFn: () => updatePassword(password),
    enabled: !!password,
  });

  return { data, isPending, isError };
}
