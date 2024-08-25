import { ErrorResponseType } from '@/components/atoms/customError';
import {
  TOKEN_EXPIRATION_ERROR_CODE,
  TOKEN_EXPIRATION_ERROR_STATUS,
} from '@/constants/auth.constant';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useServerComponentErrorHandling = (errorData: ErrorResponseType) => {
  const { status, data } = errorData;
  const router = useRouter();

  useEffect(() => {
    if (status === 401) {
      if (typeof data === 'object') {
        if (
          data.errorCode === TOKEN_EXPIRATION_ERROR_CODE &&
          data.status === TOKEN_EXPIRATION_ERROR_STATUS
        ) {
          (async () => await signOut())();
        }
      } else {
        if (data === 'access token expired') {
          (async () => {
            try {
              await axios.post('/api/auth/reissue');
              router.refresh();
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                  await signOut();
                }
              }
            }
          })();
        }
      }
    }
  }, [data, errorData, router, status]);
};

export default useServerComponentErrorHandling;
