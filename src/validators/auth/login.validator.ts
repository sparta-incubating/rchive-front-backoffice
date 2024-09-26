import { z } from 'zod';

// 한글을 포함하는지 확인하는 정규식
export const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

export const loginSchema = z.object({
  username: z
    .string()
    .email({ message: '올바른 이메일 주소 형식으로 다시 입력해주세요.' }),
  password: z
    .string()
    .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
    .refine(
      (value) => PASSWORD_REG.test(value),
      '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
    ),
});
