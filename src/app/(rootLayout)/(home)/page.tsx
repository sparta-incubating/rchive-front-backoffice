'use client';

import { client } from '@/axois/axiosClient';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import { loginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Home = () => {
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

  type USER = {
    username: string;
    password: string;
  };

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    try {
      const loginInfo: USER = data;
      console.log('로그인정보', loginInfo);

      client.post('/api/v1/users/login', loginInfo).then((res) => {
        //토큰 저장
        const accessToken = res.headers.authorization;
        console.log(accessToken, '토큰');
      });
    } catch (error) {
      console.error('런타임에러', error);
    }
  };

  return (
    <>
      {/* <div className="h-[1024px] w-[1440px] border">1440</div>
      <div className="h-[1024px] w-[1920px] border">1920</div> */}

      <br />
      <br />
      <div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="border">
            <Input type="text" placeholder="이메일" {...register('username')} />
          </div>
          <br />
          <span>{errors.username?.message}</span>
          <br />
          <div className="border">
            <Input
              type="password"
              placeholder="비밀번호 "
              {...register('password')}
            />
            <br />
            <span>{errors.password?.message}</span>
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

export default Home;
