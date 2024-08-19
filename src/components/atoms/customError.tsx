'use client';

import useServerComponentErrorHandling from '@/hooks/useServerComponentErrorHandling';

export interface ErrorResponseType {
  status: number | undefined;
  data: ErrorType | string;
}

interface ErrorType {
  errorCode?: string;
  message?: string;
  status?: number;
  errorData: string;
}

export interface ServerComponentCustomErrorProps {
  errorData: ErrorResponseType;
}

const CustomError = ({ errorData }: ServerComponentCustomErrorProps) => {
  useServerComponentErrorHandling(errorData);

  return <>error page</>;
};

export default CustomError;
