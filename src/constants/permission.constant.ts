export interface TableHeaderItem {
  label: string;
  key: string;
  className: string;
}

export const permissionHeaders: TableHeaderItem[] = [
  { label: '이름', key: 'name', className: 'w-[88px] pl-[10px] text-gray-400' },
  { label: '직책', key: 'job', className: 'w-[88px] pl-[10px] text-gray-400' },
  {
    label: '기수',
    key: 'track',
    className: 'w-[88px] pl-[10px] text-gray-400',
  },
  {
    label: '이메일',
    key: 'email',
    className: 'w-[200px] pl-[16px] text-gray-400',
  },
  { label: '요청날짜', key: 'date', className: 'w-[128px] text-gray-400' },
  {
    label: '승인상태',
    key: 'permission',
    className: 'w-[112px] pl-[10px] text-gray-400',
  },
];

export const postHeaders: TableHeaderItem[] = [
  {
    label: '썸네일',
    key: 'thumbnail',
    className: 'w-[65.49px] ml-[28px] text-gray-400',
  },
  {
    label: '제목',
    key: 'title',
    className: 'w-[240px] pl-[16px] text-gray-400 ',
  },
  {
    label: '카테고리',
    key: 'category',
    className: 'w-[160px] pl-[10px] text-gray-400 ',
  },
  {
    label: '튜터',
    key: 'tutor',
    className: 'w-[134.5px] pl-[10px] text-gray-400 ',
  },
  {
    label: '기수',
    key: 'track',
    className: 'w-[100px] text-gray-400 ',
  },
  {
    label: '공개여부',
    key: 'isPublic',
    className: 'w-[134.5px] pl-[10px] text-gray-400 ',
  },
  {
    label: '날짜',
    key: 'date',
    className: 'w-[106px]  text-gray-400',
  },
];

export const tabArr = [
  {
    id: 0,
    title: '전체',
    className: 'w-[104px]',
    bgColor: 'bg-blue-55',
    textColor: 'text-blue-400',
  },
  {
    id: 1,
    title: '대기 중',
    className: 'w-[114px]',
    bgColor: 'bg-[#ff9900]/10',
    textColor: 'text-[#FF9900]',
  },
  {
    id: 3,
    title: '승인',
    className: 'w-[104px]',
    bgColor: 'bg-[#58b32e]/10',
    textColor: 'text-success-green',
  },
];

export const subArr = [
  {
    id: 0,
    title: '전체',
    className: 'w-[61px]',
  },
  {
    id: 1,
    title: '강의자료',
    className: 'w-[85px]',
  },
  { id: 2, title: '수준별 강의', className: 'w-[123px]' },
  { id: 3, title: '과제 해설', className: 'w-[88px]' },
  { id: 4, title: '특강/실시간 세션', className: 'w-[129px]' },
];

export const mockData = [
  {
    id: 1,
    name: '홍길동',
    job: '팀장',
    track: '1기',
    email: 'hong@example.com',
    date: '2024-07-31',
    permission: '승인',
  },
  {
    id: 2,
    name: '김철수',
    job: '사원',
    track: '2기',
    email: 'kim@example.com',
    date: '2024-07-30',
    permission: '대기',
  },
  {
    id: 3,
    name: '이영희',
    job: '부장',
    track: '3기',
    email: 'lee@example.com',
    date: '2024-07-29',
    permission: '승인',
  },
  {
    id: 4,
    name: '박지민',
    job: '대리',
    track: '4기',
    email: 'park@example.com',
    date: '2024-07-28',
    permission: '승인',
  },
  {
    id: 5,
    name: '최수빈',
    job: '사원',
    track: '5기',
    email: 'choi@example.com',
    date: '2024-07-27',
    permission: '대기',
  },
  {
    id: 6,
    name: '최수빈',
    job: '사원',
    track: '5기',
    email: 'choi@example.com',
    date: '2024-07-27',
    permission: '대기',
  },
  {
    id: 7,
    name: '최수빈',
    job: '사원',
    track: '5기',
    email: 'choi@example.com',
    date: '2024-07-27',
    permission: '대기',
  },
];