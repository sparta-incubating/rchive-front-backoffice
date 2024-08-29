'use client';

import { links } from '@/constants/backoffcicePath.constant';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const dynamicRouteCheck = (url: string): boolean => {
  const dynamicRoutePattern = /^\/backoffice\/posts\/(\d+)$/;
  const match = url.match(dynamicRoutePattern);

  if (match) {
    const idPart = match[1];
    return !isNaN(Number(idPart)) && idPart.length > 0;
  }

  return false;
};

const BackofficeHeaderTitle = () => {
  const router = useRouter();
  const pathName = usePathname();

  const currentLink = links.find((link) => {
    if (link.href === '/backoffice/posts/*') {
      return dynamicRouteCheck(pathName);
    }
    return link.href === pathName;
  });

  return (
    <div className="flex gap-2">
      {dynamicRouteCheck(pathName) && (
        <div
          className="relative h-9 w-9 cursor-pointer"
          onClick={() => router.back()}
        >
          <Image src="/assets/icons/prevPageBlack.svg" alt="이전페이지" fill />
        </div>
      )}
      <h1 className="text-[24px] font-bold">
        {currentLink ? currentLink.title : '페이지 제목 없음'}
      </h1>
    </div>
  );
};

export default BackofficeHeaderTitle;
