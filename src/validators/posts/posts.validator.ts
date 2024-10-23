import { z } from 'zod';

const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
const notionPattern = /^(https?:\/\/)(.*\.)?(notion\.so|notion\.site)\/.+$/;

const tutor = z.object({
  tutorId: z.number(),
  tutorName: z.string(),
});

const isOpenEnum = z.enum(['true', 'false'], {
  required_error: '',
});

const tagSchema = z.object({
  tagId: z.string(),
  tagName: z.string(),
});

export const postsSchema = z.object({
  title: z
    .string()
    .trim() // 앞뒤 공백 제거
    .min(1, '최소 1글자 이상의 제목을 입력해주세요.') // 공백 제거 후 최소 1글자 확인
    .max(50, '최대 50글자까지 입력 가능합니다.') // 최대 50글자 제한
    .refine((val) => val.trim().length > 0, {
      message: '공백만 입력할 수 없습니다.',
    }),
  tutor: tutor.nullish().refine((val) => val !== null, {
    message: '튜터를 선택해주세요.',
  }),
  contentLink: z
    .string()
    .max(255, '최대 255글자까지 입력 가능합니다.')
    .optional()
    .refine((url) => !url || notionPattern.test(url), {
      message: '노션 링크가 맞는지 확인해주세요.',
    }),
  videoLink: z
    .string()
    .max(255, '최대 255글자까지 입력 가능합니다.')
    .optional()
    .refine((url) => !url || youtubePattern.test(url), {
      message: '유튜브 링크가 맞는지 확인해주세요.',
    }),
  tagNameList: z.array(tagSchema).max(10, '태그는 10개까지 입력가능합니다.'),
  uploadedAt: z.date().nullable(),
  trackName: z.string(),
  postType: z.string(),
  postPeriod: z.string().min(1, '기수를 선택해주세요.'),
  isOpened: isOpenEnum,
  thumbnailUrl: z.string().optional(),
  content: z.string().optional(),
});
