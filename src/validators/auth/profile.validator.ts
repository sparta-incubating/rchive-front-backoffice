import { PASSWORD_REG } from '@/validators/auth/signup.validator';
import { z } from 'zod';
import { trackEnum } from '../commons';

export const profileSchema = {
  phone: z.object({
    phone: z.string().min(8, '휴대폰 인증은 필수 입니다.'),
  }),
  password: z
    .object({
      currentPassword: z
        .string()
        .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.'),
      newPassword: z
        .string()
        .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
        .refine(
          (value) => PASSWORD_REG.test(value),
          '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
        ),
      passwordConfirm: z.string(),
    })
    .refine(
      ({ newPassword, passwordConfirm }) => newPassword === passwordConfirm,
      {
        message: '비밀번호가 일치하지 않습니다',
        path: ['passwordConfirm'],
      },
    ),

  role: z
    .object({
      trackRole: z.string().optional(),
      trackName: trackEnum,
      period: z.string().optional(),
    })
    .refine(
      (data) => {
        return !(data.trackRole === 'APM' && !data.period);
      },
      {
        message: '기수를 선택해주세요.',
        path: ['period'],
      },
    ),
};
