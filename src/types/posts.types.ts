import { SelectOptionType } from '@/types/signup.types';
import { postsSchema } from '@/validators/posts/posts.validator';
import { z } from 'zod';

export type PostsFormSchema = z.infer<typeof postsSchema>;

const postTypeEnum: SelectOptionType[] = [
  { value: 'Sparta_Lecture', label: '강의자료', selected: false },
  { value: 'Special_Lecture', label: '특강/실시간 세션', selected: false },
  { value: 'Level_Challenge', label: '챌린지', selected: false },
  { value: 'Level_Standard', label: '스탠다드', selected: false },
  { value: 'Level_Basic', label: '베이직', selected: false },
  { value: 'Project_Description', label: '과제해설', selected: false },
];
