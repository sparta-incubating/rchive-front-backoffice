import { Links } from '@/types/menubar.types';

export const links: Links[] = [
  { href: '/backoffice/admin', title: '권한 설정' },
  { href: '/backoffice/posts/write', title: '게시물 작성' },
  { href: '/backoffice/posts', title: '게시물 관리' },
  { href: '/backoffice/profile', title: '프로필 관리' },
  { href: '/backoffice/posts/*', title: '게시물 관리' },
];
