import { patchPostClose, patchPostOpen } from '@/api/postApi';
import { updateIsOpen } from '@/redux/slice/posts.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { useCallback } from 'react';

const usePostIsOpenUpdate = () => {
  const { trackName, period: loginPeriod } = useAppSelector(
    (state) => state.authSlice,
  );
  const dispatch = useAppDispatch();

  return useCallback(
    async (postIds: number[], isOpen: boolean) => {
      const apiCall = isOpen ? patchPostOpen : patchPostClose;
      await apiCall(trackName, loginPeriod, postIds);
      dispatch(updateIsOpen({ postIds, isOpen }));
    },
    [dispatch, loginPeriod, trackName],
  );
};

export default usePostIsOpenUpdate;
