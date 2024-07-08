'use client';

import SignupHeader from '@/components/molecules/signupHeader';
import Modal from '@/components/atoms/modal';
import StepIndicatorGroup from '@/components/molecules/stepIndicatorGroup';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signupSchema } from '@/validators/auth/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import InputContainer from '@/components/atoms/InputContainer';
import InputField from '@/components/molecules/InputField';
import React from 'react';
import Label from '@/components/atoms/label';
import Input from '@/components/atoms/input';
import AcceptTermsGroup from '../organisms/acceptTermsGroup';
import Button from '../atoms/button';
import SelectBox from '../organisms/selectBox';
import useSelectBox from '@/hooks/useSelectBox';
import { phoneCountries } from '@/utils/phoneCountry';

const SignupModal = () => {
  const { selectOptions, handleSelected } = useSelectBox(phoneCountries);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      phoneConfirm: false,
      ad: false,
      age: false,
      privacy: false,
      service: false,
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    console.log({ data });
  };

  return (
    <Modal>
      {/*modal 헤더*/}
      <SignupHeader />

      {/*step 인디케이터*/}
      <StepIndicatorGroup />

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="mt-10 flex flex-col gap-2"
      >
        <h1 className="text-center text-xl font-semibold">회원가입</h1>

        {/* email */}
        <InputContainer>
          <InputField>
            <Label
              htmlFor="email"
              className="group-focus-within:text-primary-400"
            >
              이메일
            </Label>
            <Input
              {...register('email')}
              className="bold bg-blue-50 pt-[6px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              placeholder="이메일 입력"
            />
            <Button
              size="sm"
              variant="submit"
              disabled={true}
              className="invisible absolute bottom-5 right-5 h-[42px] w-[85px] p-2 text-xs group-focus-within:visible"
            >
              중복 확인
            </Button>
            {/* {isInputFilled.length > 0 && (
              <Button
                size="sm"
                variant="submit"
                disabled={true}
                className="h-[42px] w-[85px] p-2 text-xs"
              >
                중복 확인
              </Button>
            )} */}
          </InputField>
          <span className="text-sm text-primary-400">
            {errors.email?.message}
          </span>
        </InputContainer>

        {/* password */}
        <InputContainer variant="secondary">
          <InputField variant="secondary">
            <Label
              htmlFor="password"
              className="group-focus-within:text-primary-400"
            >
              비밀번호
            </Label>
            <Input
              {...register('password')}
              className="bold bg-blue-50 py-[24px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              placeholder="6자 이상, 숫자와 영문자 조합"
            />
            <div className="border" />
            <Input
              type="text"
              placeholder="비밀번호 재입력"
              className="my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
            />
          </InputField>
          {/* <span className="text-sm text-primary-400">
            {errors.email?.message}
          </span> */}
        </InputContainer>

        {/* name */}
        <InputContainer>
          <InputField>
            <Label
              htmlFor="email"
              className="group-focus-within:text-primary-400"
            >
              이름
            </Label>
            <Input
              {...register('email')}
              className="bold bg-blue-50 pt-[6px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              placeholder="이름 입력"
            />
          </InputField>
          {/* <span className="text-sm text-primary-400">
            {errors.email?.message}
          </span> */}
        </InputContainer>

        {/* phone */}
        <InputContainer variant="tertiary">
          <InputField variant="tertiary">
            <SelectBox
              options={selectOptions}
              label="휴대폰 번호"
              onSelect={handleSelected}
            />

            <div className="border" />
            <Input
              type="text"
              placeholder="휴대폰 번호 입력(- 제외)"
              className="h-[68px] bg-blue-50 py-[24px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
            />
            <Button
              size="sm"
              variant="submit"
              disabled={true}
              className="invisible absolute bottom-[95px] right-5 h-[42px] w-[85px] p-2 text-xs group-focus-within:visible"
            >
              인증 요청
            </Button>
            <div className="border" />
            <Input
              type="text"
              placeholder="인증번호 입력"
              className="h-[20px] bg-blue-50 py-[40px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
            />
          </InputField>
          {/* <span className="text-sm text-primary-400">
            {errors.email?.message}
          </span> */}
        </InputContainer>

        {/* birthday */}
        <InputContainer>
          <InputField>
            <Label
              htmlFor="email"
              className="group-focus-within:text-primary-400"
            >
              생년월일
            </Label>
            <Input
              {...register('email')}
              className="bold bg-blue-50 pt-[6px] text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              placeholder="ex. 19990101"
            />
          </InputField>
          {/* <span className="text-sm text-primary-400">
            {errors.email?.message}
          </span> */}
        </InputContainer>

        {/*약관*/}
        <AcceptTermsGroup />

        {/*submit button*/}
        <div className="mt-5 flex w-full items-center justify-center">
          <Button type="submit" disabled={false} className="mb-5 w-80 px-7">
            다음
          </Button>
          {/* <button type="submit">테스트</button> */}
        </div>
      </form>
    </Modal>
  );
};

export default SignupModal;
