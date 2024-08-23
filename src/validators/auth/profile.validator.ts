import { PASSWORD_REG } from '@/validators/auth/signup.validator';
import { z } from 'zod';

export const profilePasswordSchema = z
  .object({
    originPassword: z
      .string()
      .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
      .refine(
        (value) => PASSWORD_REG.test(value),
        '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
      ),
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
      message: '비밀번호가 일치하지 않습니다. 다시 입력해 주세요.',
      path: ['passwordConfirm'],
    },
  );

export const profilePhoneSchema = z.object({
  phone: z.string().min(8, '휴대폰 인증은 필수 입니다.'),
  authCode: z.string().min(6, '인증번호는 필수 입니다.'),
});
