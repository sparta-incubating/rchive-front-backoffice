'use client';

import board from '@/../public/assets/icons/board-rtan.svg';
import backofficeMain from '@/../public/assets/icons/dashboard.svg';
import permission from '@/../public/assets/icons/permission-rtan.svg';
import rtan from '@/../public/assets/icons/sign-rtan.svg';
import write from '@/../public/assets/icons/write-rtan.svg';
import SignupModal from '@/components/pages/signupModal';
import { useModalContext } from '@/context/modal.context';

import { signupModalType } from '@/types/signup.types';
import Image from 'next/image';
import Button from '../atoms/button';
import Input from '../atoms/input';
import InputContainer from '../atoms/InputContainer';
import Label from '../atoms/label';
import InputField from '../molecules/InputField';

const SignIn = () => {
  const { open } = useModalContext();

  const handleSignupModalOpen = () => {
    open(<SignupModal signupModalType={signupModalType.MANAGER} />, false);
  };

  return (
    <>
      {/* <main className="min-w-main max-w-sub h-screen"> */}
      {/* <main className="min-w-main max-w-sub"> */}
      <main className="w-screen">
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
                <p className="flex justify-center text-2xl font-bold">
                  르탄이의 아카이브
                </p>
                <p className="flex justify-center text-2xl font-bold">
                  BackOffice
                </p>
              </section>
            </section>

            {/* <section className="flex flex-col h-[228px] gap-5 pt-5">  */}
            <section className="flex flex-col gap-5 pt-5">
              <section className="mx-auto">
                {/*이메일*/}
                <InputContainer>
                  <InputField>
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      // {...register('email')}
                      placeholder="ex.123@eamil.com"
                      className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                    />
                  </InputField>
                </InputContainer>
                <span className="text-sm text-primary-400">
                  {/* {errors.email?.message} */}
                  에러메시지
                </span>
              </section>
              <section className="mx-auto">
                {/*비밀번호*/}
                <InputContainer>
                  <InputField>
                    <Label htmlFor="email">비밀번호</Label>
                    <Input
                      // {...register('email')}
                      placeholder="비밀번호 입력"
                      className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                    />
                  </InputField>
                </InputContainer>{' '}
                <span className="text-sm text-primary-400">
                  {/* {errors.email?.message} */}
                  에러메시지
                </span>
              </section>
            </section>
            {/* 회원가입*/}
            <section className="flex justify-center py-5">
              <Button size="sm" className="w-[300px]" variant="submit">
                로그인
              </Button>
            </section>
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
            <section className="flex justify-center pt-[138px]">
              {/* <section className="px-[110px] pb-[145px] pt-[138px] sub:px-[337px]"> */}
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
                <article className="mb-[30px] h-[80px] w-[338px]">
                  <p className="pl-[28px] text-2xl font-bold text-gray-700">
                    르탄이의 아카이브에 올릴 자료들을 쉽고 편리하게 관리해보세요
                  </p>
                </article>
                <article className="h-[663px] w-[736.43px]">
                  <Image
                    src={backofficeMain}
                    alt="백오피스"
                    width={1633}
                    height={1486}
                    // className="rounded-[22px] shadow-dashboardBox"
                  />
                </article>
              </section>
            </section>
          </section>
          {/*2 */}
        </section>
      </main>
    </>
  );
};

export default SignIn;
