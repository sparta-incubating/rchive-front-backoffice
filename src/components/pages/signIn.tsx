'use client';

import board from '@/../public/assets/icons/board-rtan.svg';
import backofficeMain from '@/../public/assets/icons/dashboard.svg';
import permission from '@/../public/assets/icons/permission-rtan.svg';
import rtan from '@/../public/assets/icons/sign-rtan.svg';
import write from '@/../public/assets/icons/write-rtan.svg';
import { useModalContext } from '@/context/useModalContext';
import { setAuth } from '@/redux/slice/auth.slice';
import { useAppDispatch } from '@/redux/storeConfig';
import { signupModalType } from '@/types/signup.types';
import { loginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../atoms/button';
import FormSpan from '../atoms/formSpan';
import Input from '../atoms/input';
import InputContainer from '../atoms/InputContainer';
import Label from '../atoms/label';
import InputField from '../molecules/InputField';
import SignupModal from './signupModal';

const SignIn = () => {
  const [signInError, setSignInError] = useState<string>('');

  const { data: session } = useSession();
  const { open } = useModalContext();
  const dispatch = useAppDispatch();
  const handleSignupModalOpen = () => {
    open(<SignupModal signupModalType={signupModalType.MANAGER} />, false);
  };
  const router = useRouter();

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
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setSignInError(
        '가입되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.',
      );
    } else {
      router.push('/admin');
    }
  };

  useEffect(() => {
    if (session) {
      const { trackName, trackRole, accessToken, loginPeriod } = session.user;
      dispatch(
        setAuth({
          accessToken,
          trackName: trackName || '',
          trackRole: trackRole || 'USER',
          period: String(loginPeriod) || '',
        }),
      );
      router.push('/admin');
    }
  }, [dispatch, router, session]);

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex w-[500px] items-center justify-center"
        >
          <div className="flex w-full flex-col items-center justify-center py-[148px]">
            <div className="flex w-full items-center justify-center">
              <figure className="h-[174px] pb-[20px]">
                <Image src={rtan} height={152} width={152} alt="르탄이" />
              </figure>
            </div>
            <div className="flex h-[32px] w-full flex-col items-center justify-center pb-[26px] pt-[36px]">
              <p className="text-2xl font-bold">르탄이의 아카이브</p>
              <p className="flex justify-center text-2xl font-bold">
                BackOffice
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-[20px] p-[20px]">
              {/*이메일*/}
              <div className="h-[84px] w-[360px]">
                <InputContainer>
                  <InputField>
                    <Label htmlFor="username">이메일</Label>
                    <Input
                      {...register('username')}
                      placeholder="ex.123@email.com"
                      className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                    />
                  </InputField>
                </InputContainer>
                <span className="flex h-[20px] text-sm text-primary-400">
                  {errors.username?.message}
                </span>
              </div>
              {/*이메일*/}
              <div className="h-[84px] w-[360px]">
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
                <div>
                  {errors.password?.message ? (
                    <span className="h-[20px] text-sm text-primary-400">
                      {errors.password?.message}
                    </span>
                  ) : signInError ? (
                    <FormSpan variant="error">{signInError}</FormSpan>
                  ) : null}
                </div>
              </div>
              {/*이메일*/}
            </div>
            <div className="flex h-[104px] w-full items-center justify-center py-[20px]">
              <Button size="sm" className="w-[360px]" variant="submit">
                로그인
              </Button>
            </div>
            <div className="flex h-[56px] w-[360px] items-center justify-center">
              <button onClick={handleSignupModalOpen}>
                <p className="text-sm text-gray-500 underline">회원가입</p>
              </button>
            </div>
          </div>
        </form>

        <div className="flex flex-1 items-center justify-center bg-custom-gradient shadow-signInBox">
          <section>
            <div className="relative">
              <div className="absolute bottom-[380px] right-[0px] z-20 h-[463px] w-[242px]">
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
              </div>
              {/*문구 */}
              <div className="z-10 pl-[38px]">
                <p className="text-2xl font-bold text-gray-700">
                  르탄이의 아카이브에 올릴 자료들을
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  쉽고 편리하게 관리해보세요
                </p>
              </div>
              {/*문구 */}
              {/*대시보드*/}
              <div className="z-20">
                <Image
                  src={backofficeMain}
                  alt="백오피스"
                  width={817}
                  height={743}
                />
              </div>

              {/*대시보드*/}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignIn;
