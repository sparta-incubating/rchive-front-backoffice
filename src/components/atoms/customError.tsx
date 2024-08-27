'use client';

import Modal from '@/components/atoms/modal';
import useServerComponentErrorHandling from '@/hooks/useServerComponentErrorHandling';
import Image from 'next/image';
import React from 'react';

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

  return (
    <Modal variant="backOffice">
      <section className="flex h-[98px] w-[414px] items-center justify-center gap-4 px-6 py-4">
        <div className="flex h-[65px] w-[64px] items-center justify-center rounded-full bg-primary-50 p-2.5">
          <div className="relative h-[50px] w-[40px]">
            <Image
              src={'/assets/icons/gif/rtanRun.gif'}
              alt={'progress gif'}
              style={{ transform: 'scaleX(-1)' }}
              fill
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </section>
    </Modal>
  );
};

export default CustomError;
