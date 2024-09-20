import Confirm from '@/components/atoms/confirm';
import { useConfirmContext } from '@/context/useConfirmContext';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const usePageLeaveConfirm = (isDirty: boolean) => {
  const { handleConfirm } = useConfirmContext();
  const router = useRouter();
  const isConfirmShownRef = useRef(false);

  const showConfirmDialog = useCallback(async () => {
    if (!isDirty || isConfirmShownRef.current) return true;

    isConfirmShownRef.current = true;
    const result = await handleConfirm(
      <Confirm text="이동">
        <p>페이지를 이동하시겠습니까?</p>
        <p>변경사항이 저장되지 않습니다.</p>
      </Confirm>,
      false,
    );
    isConfirmShownRef.current = false;
    return result;
  }, [handleConfirm, isDirty]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handlePopState = async (e: PopStateEvent) => {
      if (isDirty) {
        if (await showConfirmDialog()) {
          router.back();
        } else {
          window.history.pushState(null, '', window.location.href);
        }
      }
    };

    if (isDirty) {
      window.history.pushState(null, '', window.location.href);
    }
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = async (...args: Parameters<typeof router.push>) => {
      if (await showConfirmDialog()) {
        originalPush.apply(router, args);
      }
    };

    router.replace = async (...args: Parameters<typeof router.replace>) => {
      if (await showConfirmDialog()) {
        originalReplace.apply(router, args);
      }
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [isDirty, router, showConfirmDialog]);
};

export default usePageLeaveConfirm;
