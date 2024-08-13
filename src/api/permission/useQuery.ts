'use client';

import { useQuery } from '@tanstack/react-query';
import { PERMISSION_QUERY_KEYS } from './keys.constant';
import { getBoardList } from './permissionApi';

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
