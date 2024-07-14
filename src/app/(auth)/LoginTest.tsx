'use client';

import { client } from '@/axois/axiosClient';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import { AppDispatch } from '@/redux/config/storeConfig';
import { setTokens } from '@/redux/modules/authSlice';
import { loginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

export const LoginTest = () => {
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

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    try {
      client.post('/api/v1/users/login', data).then((res) => {
        const authToken = res.headers['authorization'];
        // console.log(authToken, '토큰');
        if (res.status === 200) {
          dispatch(setTokens({ access: authToken }));
          // router.push('/mypage');
        }
      });
    } catch (error) {
      console.error('런타임에러', error);
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
