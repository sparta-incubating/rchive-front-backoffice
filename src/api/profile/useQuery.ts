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

export function useUserPatchPhoneQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE],
    queryFn: updatePhone,
  });

  return { data, isPending, isError };
}

export function useUserPatchPasswordQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE],
    queryFn: updatePassword,
  });

  return { data, isPending, isError };
}
