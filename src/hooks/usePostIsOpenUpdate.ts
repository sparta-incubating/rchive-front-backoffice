import { patchPostClose, patchPostOpen } from '@/api/client/postApi';
import { useAppSelector } from '@/redux/storeConfig';
import { createToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';

const usePostIsOpenUpdate = () => {
  const { trackName, period: loginPeriod } = useAppSelector(
    (state) => state.authSlice,
  );

  const router = useRouter();
  return async (postIds: number[], isOpen: boolean) => {
    const apiCall = isOpen ? patchPostOpen : patchPostClose;
    try {
      await apiCall(trackName, loginPeriod, postIds);
      createToast(
        `${postIds.length}건의 게시물이 ${isOpen ? '공개' : '비공개'}되었습니다.`,
        'primary',
        false,
      );
      router.refresh();
    } catch (error) {
      throw new Error('게시물 공개 변경에 실패했습니다.');
    }
  };
};

export default usePostIsOpenUpdate;
