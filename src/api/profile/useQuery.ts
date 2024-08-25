'use client';

import { useQuery } from '@tanstack/react-query';
import { PROFILE_QUERY_KEYS } from './keys.constant';
import { getTrackPeriodList, getUserInfo } from './profileApi';

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

export function usePeriodListQuery(trackName: string) {
  const { data } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PERIODLIST, trackName],
    queryFn: () => getTrackPeriodList(trackName),
    enabled: !!trackName,
  });

  const periodList = data?.data?.trackPeriodList;

  return periodList;
}
