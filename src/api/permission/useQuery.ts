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

export function useRoleCountQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [PERMISSION_QUERY_KEYS.PERMISSION],
    queryFn: getRoleCount,
  });

  return { data, isPending, isError };
}

export function useSelectRoleQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [PERMISSION_QUERY_KEYS.PERMISSION],
    queryFn: getSelectRole,
  });

  return { data, isPending, isError };
}
