'use client';

import { postReissue } from '@/api/authApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PostError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.log({ error });
  }, [error]);

  useEffect(() => {
    (async () => {
      await postReissue();
      // router.refresh();
    })();
  }, [router]);

  return <></>;
};

export default PostError;
