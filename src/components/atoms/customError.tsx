'use client';

import {
  TOKEN_EXPIRATION_ERROR_CODE,
  TOKEN_EXPIRATION_ERROR_STATUS,
} from '@/constants/auth.constant';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

interface ErrorType {
  errorCode?: string;
  message?: string;
  status?: number;
}

interface CustomErrorProps {
  errorData: ErrorType;
}

const CustomError = ({ errorData }: CustomErrorProps) => {
  useEffect(() => {
    const { errorCode, message, status } = errorData;
    console.log({ errorCode, message, status });
    if (
      errorCode === TOKEN_EXPIRATION_ERROR_CODE &&
      status === TOKEN_EXPIRATION_ERROR_STATUS
    ) {
      (async () => await signOut())();
    }
  }, [errorData]);
  return <>error page</>;
};

export default CustomError;
