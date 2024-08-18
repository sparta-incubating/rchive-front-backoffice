'use client';

import { useQuery } from '@tanstack/react-query';
import { getBoardList, getRoleCount, getSelectRole } from './adminApi';
import { ADMIN_QUERY_KEYS } from './keys.constant';

export function usePermissionDataQuery(filters: Record<string, string>) {
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
