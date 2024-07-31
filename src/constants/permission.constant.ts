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
