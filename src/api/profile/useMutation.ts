import { queryClient } from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { PROFILE_QUERY_KEYS } from './keys.constant';
import { updatePassword, updatePhoneNumber } from './profileApi';

export const useProfileUpdate = () => {
  const updatePhoneNumberMutate = useMutation({
    mutationFn: updatePhoneNumber,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
  });

  const updatePasswordMutate = useMutation({
    mutationFn: updatePassword,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEYS.PROFILE],
      }),
  });

  return { updatePhoneNumberMutate, updatePasswordMutate };
};
