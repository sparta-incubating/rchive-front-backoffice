'use client';

import { links } from '@/constants/backoffcicePath.constant';
import { usePathname } from 'next/navigation';

const BackofficeHeaderTitle = () => {
  const pathName = usePathname();

  // 동적 라우팅을 포함한 링크 검사
  const currentLink = links.find((link) => {
    if (link.href.includes('*')) {
      const dynamicRoute = new RegExp(`^${link.href.replace('*', '.*')}$`);
      return dynamicRoute.test(pathName);
    }
    return link.href === pathName;
  });

  return (
    <h1 className="text-[24px] font-bold">
      {currentLink ? currentLink.title : '페이지 제목 없음'}
    </h1>
  );
};

export default BackofficeHeaderTitle;
