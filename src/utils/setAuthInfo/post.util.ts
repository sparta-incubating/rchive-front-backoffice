import { PostType } from '@/types/posts.types';

export const getNameCategory = (postType: PostType) => {
  switch (postType) {
    case 'Sparta_Lecture':
      return '강의자료';
    case 'Project_Description':
      return '과제해설';
    case 'Level_Basic':
      return '베이직';
    case 'Level_Standard':
      return '스텐다드';
    case 'Special_Lecture':
      return '특강/실시간 세션';
    default:
      return '첼린지';
  }
};
