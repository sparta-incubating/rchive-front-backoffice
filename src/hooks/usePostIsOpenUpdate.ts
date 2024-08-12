import { patchPostClose, patchPostOpen } from '@/api/postApi';
import { updateIsOpen } from '@/redux/slice/posts.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';

const usePostIsOpenUpdate = () => {
  const { trackName, period: loginPeriod } = useAppSelector(
    (state) => state.authSlice,
  );
  const dispatch = useAppDispatch();

  return async (postIds: number[], isOpen: boolean) => {
    const apiCall = isOpen ? patchPostOpen : patchPostClose;
    try {
      await apiCall(trackName, loginPeriod, postIds);
      dispatch(updateIsOpen({ postIds, isOpen }));
    } catch (error) {
      throw new Error('게시물 공개 변경에 실패했습니다.');
    }
  };
};

export default usePostIsOpenUpdate;
