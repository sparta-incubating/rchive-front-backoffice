'use client';

import board from '@/../public/assets/icons/board-rtan.svg';
import backofficeMain from '@/../public/assets/icons/dashboard.svg';
import permission from '@/../public/assets/icons/permission-rtan.svg';
import rtan from '@/../public/assets/icons/sign-rtan.svg';
import write from '@/../public/assets/icons/write-rtan.svg';
import { useModalContext } from '@/context/useModalContext';
import { signupModalType } from '@/types/signup.types';
import { loginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../atoms/button';
import Input from '../atoms/input';
import InputContainer from '../atoms/InputContainer';
import Label from '../atoms/label';
import InputField from '../molecules/InputField';
import SignupModal from './signupModal';

const SignIn = () => {
  const { data: session } = useSession();
  const { open } = useModalContext();
  const handleSignupModalOpen = () => {
    open(<SignupModal signupModalType={signupModalType.MANAGER} />, false);
  };

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
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // await axios.post('/api/auth/login', data);
    // await postSignIn(data);
    const authRes = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (authRes?.status === 200) {
      console.log("let's go to home");
      router.push('/');
    }
    /*
        try {
          await getLastConnectRole();
          router.push('/');
          // window.location.href = '/';
        } catch (error) {
          const roleApplyStatusResponse = await getRoleApplyStatus();
          setCookie('loginId', data.username);
    
          if (roleApplyStatusResponse) {
            router.push(`/role/result`);
          } else {
            router.push('/role');
          }
        }*/
  };

  return (
    <>
      <main className="m-auto w-screen">
        <section className="flex flex-row">
          {/*1 */}
          <aside className="h-screen w-[500px]">
            {/*르탄이*/}
            <figure className="mt-[183.5px] flex justify-center">
              <Image src={rtan} height={152} width={152} alt="르탄이" />
            </figure>
            {/*문구*/}
            <section className="h-[120px]">
              <section className="flex flex-col pb-[20px] pt-[36px]">
                {/* <p className="flex justify-center text-2xl font-bold">
                  르탄이의 아카이브
                </p>
                <p className="flex justify-center text-2xl font-bold">
                  BackOffice
                </p>*/}
                <p>
                  <div>{session?.user.accessToken}</div>
                  <div>{session?.user.refreshToken}</div>
                </p>
              </section>
            </section>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <section className="flex flex-col gap-5 pt-5">
                <section className="mx-auto">
                  {/*이메일*/}
                  <InputContainer>
                    <InputField>
                      <Label htmlFor="username">이메일</Label>
                      <Input
                        {...register('username')}
                        placeholder="ex.123@eamil.com"
                        className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                      />
                    </InputField>
                  </InputContainer>
                  <span className="text-sm text-primary-400">
                    {errors.username?.message}
                  </span>
                </section>
                <section className="mx-auto">
                  {/*비밀번호*/}
                  <InputContainer>
                    <InputField>
                      <Label htmlFor="password">비밀번호</Label>
                      <Input
                        {...register('password')}
                        placeholder="비밀번호 입력"
                        type="password"
                        className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                        autoComplete="current-password"
                      />
                    </InputField>
                  </InputContainer>
                  <span className="text-sm text-primary-400">
                    {errors.password?.message}
                  </span>
                </section>
              </section>
              {/* 회원가입*/}
              <section className="flex justify-center py-5">
                <Button size="sm" className="w-[300px]" variant="submit">
                  로그인
                </Button>
              </section>
            </form>
            <section className="mx-auto flex h-[53px] flex-row justify-center p-[16px] text-center">
              <span className="w-[120px] text-sm text-gray-500">
                <button onClick={handleSignupModalOpen}>회원가입</button>
              </span>
              <div className="border" />
              <span className="w-[120px] text-sm text-gray-500">
                비밀번호 찾기
              </span>
            </section>
          </aside>

          {/*2 */}

          <section className="w-[calc(100%-500px)] bg-custom-gradient shadow-signInBox">
            <section className="flex items-center justify-center pt-[138px]">
              <section className="relative">
                <article className="absolute bottom-[445.52px] left-[508px] h-[351.48px] w-[237.79px]">
                  <Image
                    src={permission}
                    alt="게시물르탄이"
                    width={237.79}
                    height={107.61}
                    className="mb-[14px] rounded-[14px] shadow-rtanBox"
                  />
                  <Image
                    src={write}
                    alt="권한르탄이"
                    width={237.79}
                    height={107.61}
                    className="mb-[14px] rounded-[14px] shadow-rtanBox"
                  />
                  <Image
                    src={board}
                    alt="작성르탄이"
                    width={237.79}
                    height={107.61}
                    className="rounded-[14px] shadow-rtanBox"
                  />
                </article>
                <article className="mb-[31px] h-[80px] w-[330px]">
                  <p className="text-2xl font-bold text-gray-700">
                    르탄이의 아카이브에 올릴 자료들을 쉽고 편리하게 관리해보세요
                  </p>
                </article>
                <article className="h-[663px] w-[736.43px]">
                  <Image
                    src={backofficeMain}
                    alt="백오피스"
                    width={1633}
                    height={1486}
                  />
                </article>
              </section>
            </section>{' '}
          </section>
          {/*2 */}
        </section>
      </main>
    </>
  );
};

export default SignIn;
