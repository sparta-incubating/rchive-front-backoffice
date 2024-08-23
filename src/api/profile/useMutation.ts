import { queryClient } from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { PROFILE_QUERY_KEYS } from './keys.constant';
import {
  sendPhoneAuthNumber,
  updatePassword,
  updatePhoneNumber,
  updateProfileInfo,
  updateRole,
} from './profileApi';

export const useProfileUpdate = () => {
  const postPhoneAuthNumberMutate = useMutation({
    mutationFn: sendPhoneAuthNumber,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updatePhoneNumberMutate = useMutation({
    mutationFn: updatePhoneNumber,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updatePasswordMutate = useMutation({
    mutationFn: updatePassword,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updateRoleMutate = useMutation({
    mutationFn: updateRole,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });

  const updateProfileInfoMutate = useMutation({
    mutationFn: updateProfileInfo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
    onError: (error) => {
      console.log('변경 실패:', error);
    },
  });
  return {
    updatePhoneNumberMutate,
    updatePasswordMutate,
    updateRoleMutate,
    updateProfileInfoMutate,
    postPhoneAuthNumberMutate,
  };
};
