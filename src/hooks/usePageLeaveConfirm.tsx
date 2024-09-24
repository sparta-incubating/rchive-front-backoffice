import Confirm from '@/components/atoms/confirm';
import { useConfirmContext } from '@/context/useConfirmContext';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const usePageLeaveConfirm = (isDirty: boolean, isSubmitting: boolean) => {
  const { handleConfirm } = useConfirmContext();
  const router = useRouter();
  const isConfirmShownRef = useRef(false);

  const showConfirmDialog = useCallback(async () => {
    if (!isDirty || isConfirmShownRef.current || isSubmitting) return true;

    isConfirmShownRef.current = true;
    const result = await handleConfirm(
      <Confirm text="이동">
        <div className="flex flex-col gap-2.5">
          <span className="text-center text-xl font-bold">
            작성화면을 나가시겠어요?
          </span>
          <div className="flex flex-col justify-center">
            <span className="text-center text-base font-medium text-gray-600">
              이동하게 되면 변경사항이 저장되지 않아요.
            </span>
          </div>
        </div>
      </Confirm>,
      false,
    );
    isConfirmShownRef.current = false;
    return result;
  }, [handleConfirm, isDirty, isSubmitting]);

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
