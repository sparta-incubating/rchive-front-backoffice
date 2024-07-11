import Image from 'next/image';
import React from 'react';
import rtan from '@/../public/assets/icons/siginIn-rtan.svg';
import Button from '../atoms/button';
import backofficeMain from '@/../public/assets/icons/dashboard.svg';
import InputContainer from '../atoms/InputContainer';
import InputField from '../molecules/InputField';
import Label from '../atoms/label';
import Input from '../atoms/input';
import board from '@/../public/assets/icons/board-rtan.svg';
import permission from '@/../public/assets/icons/permissions-rtan.svg';
import write from '@/../public/assets/icons/write-rtan.svg';

const SignIn = () => {
  return (
    <>
      <div className="flex h-[1024px] min-w-[1440px] max-w-[1920px] flex-row">
        {/*1 */}
        <div className="w-[500px]">
          {/*르탄이*/}
          <div className="mt-[148px] flex justify-center">
            <Image src={rtan} height={152} width={152} alt="르탄이" />
          </div>

          {/*문구*/}
          <div className="h-[120px]">
            <div className="flex flex-col pt-[36px]">
              <p className="flex justify-center text-2xl font-bold">
                르탄이의 아카이브
              </p>
              <p className="flex justify-center text-2xl font-bold">
                BackOffice
              </p>
            </div>
          </div>

          <div className="flex h-[228px] flex-col gap-5 pt-5">
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
              </InputContainer>{' '}
              <span className="text-sm text-primary-400">
                {/* {errors.email?.message} */}
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
              </span>
            </section>
          </div>

          {/* 회원가입*/}
          <div className="flex justify-center py-5">
            <Button size="sm" className="w-[300px]" variant="submit">
              로그인
            </Button>
          </div>
          <div className="mx-auto flex h-[53px] flex-row justify-center p-[16px] text-center">
            <span className="w-[120px] text-sm text-gray-500">회원가입</span>
            <div className="border" />
            <span className="w-[120px] text-sm text-gray-500">
              비밀번호 찾기
            </span>
          </div>
        </div>

        {/*2 */}
        <div className="flex flex-row">
          <div className="bg-custom-gradient">
            <div className="h-[80px] w-max border">
              <p className="text-2xl font-bold text-gray-700">
                르탄이의 아카이브에 올릴 자료들을
              </p>
              <p className="text-2xl font-bold text-gray-700">
                쉽고 편리하게 관리해보세요
              </p>
            </div>
            <div className="h-max w-max border">
              <Image
                src={backofficeMain}
                alt="백오피스"
                width={817}
                height={743}
              />
            </div>

            <div className="flex h-max w-max flex-col gap-[14px] border">
              <Image src={write} alt="권한르탄이" width={238} height={109} />
              <Image
                src={permission}
                alt="게시물르탄이"
                width={238}
                height={108}
              />
              <Image src={board} alt="작성르탄이" width={238} height={109} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
