'use client';

import { FilterParams } from '@/types/admin.types';
import { useQuery } from '@tanstack/react-query';
import {
  getBackOfficeInfo,
  getBoardList,
  getRoleCount,
  getSelectRole,
} from './adminApi';
import { ADMIN_QUERY_KEYS } from './keys.constant';

//백오피스에서의 프로필 조회
export function useBackOfficeProfileQuery() {
  const {
    data: profileInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: [ADMIN_QUERY_KEYS.PROFILE],
    queryFn: getBackOfficeInfo,
  });

  return { profileInfo, isPending, isError };
}

export function usePermissionDataQuery(filters: FilterParams) {
  const {
    data: boardList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [ADMIN_QUERY_KEYS.ADMIN, filters],
    queryFn: () => getBoardList(filters),
  });

  return { boardList, isPending, isError };
}

export function useRoleCountDataQuery() {
  const {
    data: countList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [ADMIN_QUERY_KEYS.COUNT],
    queryFn: getRoleCount,
  });

  return { countList, isPending, isError };
}

export function useSelectRoleQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [ADMIN_QUERY_KEYS.SELECT],
    queryFn: getSelectRole,
  });

  return { data, isPending, isError };
}
