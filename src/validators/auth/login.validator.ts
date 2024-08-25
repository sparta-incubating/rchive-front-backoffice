import { PASSWORD_REG } from '@/validators/auth/signup.validator';
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
  password: z
    .string()
    .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
    .refine(
      (value) => PASSWORD_REG.test(value),
      '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
    ),
});
