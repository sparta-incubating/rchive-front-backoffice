'use client';

import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';

import { loginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl: '/',
      });
      console.log(result, '로그인 계정');
      if (result?.error) {
        console.error('Login failed:', result.error);
        // 에러 메시지를 사용자에게 표시
      } else {
        // 로그인 성공 처리 (예: 리다이렉트)
      }
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      // 예상치 못한 오류 처리
    }
  };
  return (
    <>
      <br />
      <br />
      <div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="border">
            <Input type="text" placeholder="이메일" {...register('username')} />
          </div>
          <br />
          <span className="text-primary-400">{errors.username?.message}</span>
          <br />
          <div className="border">
            <Input
              type="password"
              placeholder="비밀번호 "
              {...register('password')}
            />
            <br />
            <span className="text-primary-400">{errors.password?.message}</span>
          </div>

          <br />
          <Button type="submit" disabled={false} className="mb-5 w-80 px-7">
            다음
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
