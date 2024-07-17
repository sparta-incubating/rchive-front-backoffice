import { z } from 'zod';

const trackEnum = z.enum([
  'UNITY',
  'NODEJS',
  'SPRING_JAVA',
  'SPRING_KOTLIN',
  'FRONT_REACT',
  'WEB',
  'ANDROID',
  'IOS',
  'DATA',
  'UXUI',
]);

const postTypeEnum = z.enum([
  'Sparta_Lecture',
  'Special_Lecture',
  'Level_Challenge',
  'Level_Standard',
  'Level_Basic',
  'Project_Description',
]);

const tagSchema = z.object({
  tagId: z.number(),
  tagName: z.string(),
});

export const postsSchema = z.object({
  postType: postTypeEnum,
  title: z.string().min(1, '최소 1글자 이상의 제목을 입력해주세요.'),
  tutor: z.string(),
  thumbnail: z.string().optional(),
  contentLink: z.string().optional(),
  videoLink: z.string().optional(),
  tagNameList: z.array(tagSchema).max(10, '태그는 10개까지 입력가능합니다.'),
  uploadedAt: z.string(),
  trackName: trackEnum,
  period: z.number(),
  isOpened: z.boolean(),
});
