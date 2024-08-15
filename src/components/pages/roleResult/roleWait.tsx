'use client';

import Button from '@/components/atoms/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const RoleWait = () => {
  const router = useRouter();
  const handleGoToLogin = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2.5">
        <span className="text-sm text-gray-900">
          승인 처리가 지연될 시, 시스템 관리자에게 문의바랍니다.
        </span>
        <a target="_blank" className="text-sm text-gray-400 underline">
          문의하기
        </a>
      </div>

      <Button
        variant="primary"
        className="mt-4 w-[360px]"
        onClick={handleGoToLogin}
      >
        확인
      </Button>
    </>
  );
};

export default RoleWait;
