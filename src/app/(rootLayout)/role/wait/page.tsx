import Button from '@/components/atoms/button';
import RoleContainerPage from '@/components/pages/roleContainerPage';
import Link from 'next/link';
import React from 'react';

const RoleWait = () => {
  return (
    <RoleContainerPage>
      <section className="m-auto flex w-[520px] flex-col items-center gap-5 rounded-[12px] bg-white pb-7 pt-14">
        <span className="text-center text-xl font-medium text-gray-900">
          현재 승인대기 상태입니다.
        </span>
        <span className="text-sm text-gray-900">
          승인 처리가 지연될 시, 시스템 관리자에게 문의바랍니다.
        </span>
        <Link href={'/login'}>
          <Button variant="primary" className="mt-4 w-[360px]">
            확인
          </Button>
        </Link>
      </section>
    </RoleContainerPage>
  );
};

export default RoleWait;
