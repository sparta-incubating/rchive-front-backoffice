'use client';

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
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    try {
      console.log('제ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ발', data);
    } catch (error) {
      console.error('런타임에러', error);
    }

    // type USER = {
    //   username: string;
    //   password: string;
    // };
  };
  // const loginUser: USER = {
  //   username: 'email,',
  //   password: 'password',
  // };

  // client
  // .post("/api/v1/users/login",loginUser)
  // .then((res)=>{
  //   const {accessToken} = res.data;
  //   cookies.set("Login",accessToken,{
  //     path : "/",
  //     secure : true,
  //     sameStie:"none",
  //   })
  // })
  return (
    <>
      {/* <div className="h-[1024px] w-[1440px] border">1440</div>
      <div className="h-[1024px] w-[1920px] border">1920</div> */}

      <br />
      <br />
      <div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="border">
            <Input type="text" placeholder="이메일" {...register('email')} />
          </div>
          <br />
          <span>{errors.email?.message}</span>
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
