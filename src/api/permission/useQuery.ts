'use client';

import { useQuery } from '@tanstack/react-query';
import { PERMISSION_QUERY_KEYS } from './keys.constant';
import { getBoardList, getRoleCount, getSelectRole } from './permissionApi';

export function usePermissionDataQuery() {
  const {
    data: boardList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [PERMISSION_QUERY_KEYS.PERMISSION],
    queryFn: getBoardList,
  });

  return { boardList, isPending, isError };
}

export function useRoleCountDataQuery() {
  const {
    data: countList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [PERMISSION_QUERY_KEYS.COUNT],
    queryFn: getRoleCount,
  });

  return { countList, isPending, isError };
}

export function useSelectRoleQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [PERMISSION_QUERY_KEYS.SELECT],
    queryFn: getSelectRole,
  });

  return { data, isPending, isError };
}
