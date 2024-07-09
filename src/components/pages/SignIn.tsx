import Image from 'next/image';
import React from 'react';
import rtan from '@/../public/assets/icons/Group 1000004592.svg';
import Button from '../atoms/button';
import backofficeMain from '@/../public/assets/icons/Frame 1171276232.svg';
import InputContainer from '../atoms/InputContainer';
import InputField from '../molecules/InputField';
import Label from '../atoms/label';
import Input from '../atoms/input';

const SignIn = () => {
  return (
    <>
      <div className="flex h-[1024px] min-w-[1440px] max-w-[1920px] flex-row">
        {/*1 */}
        <div className="w-[514px]">
          {/*르탄이*/}
          <div className="mt-[148px] flex justify-center">
            <Image src={rtan} height={152} width={152} alt="르탄이" />
          </div>

          {/*문구*/}
          <div className="h-[200px]">
            <div className="flex flex-col pt-[36px]">
              <p className="flex justify-center text-2xl font-bold">
                르탄이의 아카이브
              </p>
              <p className="flex justify-center text-2xl font-bold">
                BackOffice
              </p>
            </div>
            <div className="flex flex-col py-[16px]">
              <p className="flex justify-center text-base text-gray-600">
                르탄이의 아카이브에 올릴 자료들을
              </p>
              <p className="flex justify-center text-base text-gray-600">
                쉽고 편리하게 관리해보세요
              </p>
            </div>
          </div>

          {/*로그인*/}
          <div className="flex h-[228px] flex-col">
            <div className="mx-auto">
              {/*이메일*/}
              <InputContainer>
                <InputField>
                  <Label
                    htmlFor="email"
                    className="group-focus-within:text-primary-400"
                  >
                    이메일
                  </Label>
                  <Input
                    //  {...register('email')}
                    className="bold bg-blue-50 pt-[6px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                    placeholder="ex.123@email.com"
                  />
                </InputField>
                <span className="text-sm text-primary-400">
                  {/* {errors.email?.message} */}
                </span>
              </InputContainer>

              {/*비밀번호*/}
              <InputContainer>
                <InputField>
                  <Label
                    htmlFor="email"
                    className="group-focus-within:text-primary-400"
                  >
                    비밀번호
                  </Label>
                  <Input
                    //  {...register('email')}
                    className="bold bg-blue-50 pt-[6px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                    placeholder="비밀번호 입력"
                  />
                </InputField>
                <span className="text-sm text-primary-400">
                  {/* {errors.email?.message} */}
                </span>
              </InputContainer>
            </div>
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
            <Image
              src={backofficeMain}
              alt="백오피스"
              width={1187}
              height={1080}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
