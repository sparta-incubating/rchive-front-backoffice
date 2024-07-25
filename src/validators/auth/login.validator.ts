import { PASSWORD_REG } from '@/validators/auth/signup.validator';
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
  password: z
    .string()
    .min(6, '가입되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.')
    .refine(
      (value) => PASSWORD_REG.test(value),
      '가입되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.',
    ),
});
