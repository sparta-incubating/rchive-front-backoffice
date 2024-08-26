import { z } from 'zod';

export const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
export const BIRTHDATE_REG =
  /^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;

export const signupSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
    username: z.string().min(1, '이름을 입력해주세요.'),
    password: z
      .string()
      .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
      .refine(
        (value) => PASSWORD_REG.test(value),
        '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
      ),
    passwordConfirm: z.string(),
    phone: z.string().min(8),
    authCode: z.string().min(6, '인증번호는 필수 입니다.'),
    birth: z
      .string()
      .min(8, '생년월일을 입력해주세요.')
      .refine(
        (value) => BIRTHDATE_REG.test(value),
        'YYYYMMDD 형식으로 입력해주세요.',
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
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다. 다시 입력해 주세요.',
    path: ['passwordConfirm'],
  });
