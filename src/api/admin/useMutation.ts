import { queryClient } from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { deleteUsrRole, postUserApprove } from './adminApi';
import { ADMIN_QUERY_KEYS } from './keys.constant';

export const usePermissionList = () => {
  const postUserApproveMutate = useMutation({
    mutationFn: postUserApprove,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN, ADMIN_QUERY_KEYS.COUNT],
      }),
    onError: (error) => {
      console.log('권한수락 실패:', error);
    },
  });

  const deleteUsrRoleMutate = useMutation({
    mutationFn: deleteUsrRole,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN, ADMIN_QUERY_KEYS.COUNT],
      }),
    onError: (error) => {
      console.log('트랙 거절 실패:', error);
    },
  });

  // const updateRoleRejectionMutate = useMutation({
  //   mutationFn: patchUserRejection,
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: [ADMIN_QUERY_KEYS.ADMIN],
  //     }),
  //   onError: (error) => {
  //     console.log('권한 거절 실패:', error);
  //   },
  // });

  // const updateRolePermissionMutate = useMutation({
  //   mutationFn: patchUserPermission,
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: [ADMIN_QUERY_KEYS.ADMIN],
  //     }),
  //   onError: (error) => {
  //     console.log('권한승인 실패:', error);
  //   },
  // });

  return {
    postUserApproveMutate,
    deleteUsrRoleMutate,
  };
};
