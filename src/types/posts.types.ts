import { SelectOptionType } from '@/types/signup.types';
import { postsSchema } from '@/validators/posts/posts.validator';
import { z } from 'zod';

export type PostsFormSchema = z.infer<typeof postsSchema>;

export const postTypeList: SelectOptionType[] = [
  { value: 'Sparta_Lecture', label: '강의자료', selected: false },
  { value: 'Level_Challenge', label: '챌린지', selected: false },
  { value: 'Level_Standard', label: '스탠다드', selected: false },
  { value: 'Level_Basic', label: '베이직', selected: false },
  { value: 'Special_Lecture', label: '특강/실시간 세션', selected: false },
  { value: 'Project_Description', label: '과제해설', selected: false },
];

export type trackPeriodList = number[];

export type trackPeriodResponse = {
  message: string;
  status: number;
  data: { trackPeriodList: trackPeriodList };
};

export type TutorType = { tutorId: number; tutorName: string };

export type TrackType =
  | ''
  | 'UNITY'
  | 'NODEJS'
  | 'SPRING_JAVA'
  | 'SPRING_KOTLIN'
  | 'FRONT_REACT'
  | 'WEB'
  | 'ANDROID'
  | 'IOS'
  | 'DATA'
  | 'UXUI';

export type PostType =
  | 'Sparta_Lecture'
  | 'Special_Lecture'
  | 'Level_Challenge'
  | 'Level_Standard'
  | 'Level_Basic'
  | 'Project_Description';

export type tutorApiType = {
  data: TutorType[];
  message: string;
  status: number;
};

export type postsEndPointFormData = {
  title: string;
  tutorId: number;
  contentLink: string;
  videoLink: string;
  tagNameList: string[];
  uploadedAt: string;
  postType: PostType;
  postPeriod: number;
  isOpened: boolean;
  thumbnailUrl: string;
  content: string;
};
