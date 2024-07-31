import Button from '@/components/atoms/button';
import Link from 'next/link';
import React from 'react';

const RoleWait = () => {
  return (
    <>
      <span className="text-sm text-gray-900">
        승인 처리가 지연될 시, 시스템 관리자에게 문의바랍니다.
      </span>
      <Link href={'/login'}>
        <Button variant="primary" className="mt-4 w-[360px]">
          확인
        </Button>
      </Link>
    </>
  );
};

export default RoleWait;
