import { z } from 'zod';

const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

export const signupSchema = z.object({
  email: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
  password: z
    .string()
    .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
    .refine(
      (value) => PASSWORD_REG.test(value),
      '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
    ),
  passwordConfirm: z
    .string()
    .min(6, '비밀번호가 일치하지 않습니다.')
    .refine(
      (value) => PASSWORD_REG.test(value),
      '비밀번호가 일치하지 않습니다.',
    ),
  age: z.boolean().refine((value) => value, {
    message: '만 14세 이상이어야 합니다.',
  }),
  service: z.boolean().refine((value) => value, {
    message: '서비스 약관에 동의해주세요.',
  }),
  privacy: z.boolean().refine((value) => value, {
    message: '개인정보 처리방침에 동의해주세요.',
  }),
  ad: z.boolean(),
});
