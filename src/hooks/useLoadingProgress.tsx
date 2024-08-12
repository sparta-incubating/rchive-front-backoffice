import ProgressModal from '@/components/pages/progressModal';
import { useModalContext } from '@/context/modal.context';
import { useEffect, useState } from 'react';

const useLoadingProgress = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [LoadingMessage, setLoadingMessage] = useState<string>('');
  const { open, close } = useModalContext();

  // loading modal을 제어하는 useEffect
  useEffect(() => {
    if (isSubmitLoading)
      open(<ProgressModal>{LoadingMessage}</ProgressModal>, false);
    else if (!isSubmitLoading) close();
  }, [isSubmitLoading, open, close, LoadingMessage]);

  return { setIsSubmitLoading, setLoadingMessage };
};

export default useLoadingProgress;
