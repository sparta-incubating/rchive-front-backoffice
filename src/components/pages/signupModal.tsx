'use client';

import SignupHeader from '@/components/molecules/signupHeader';
import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import AcceptTermsGroup from '@/components/organisms/acceptTermsGroup';
import StepIndicatorGroup from '@/components/molecules/stepIndicatorGroup';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signupSchema } from '@/validators/auth/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneForm from '@/components/molecules/form/PhoneForm';
import PasswordForm from '@/components/molecules/form/PasswordForm';
import NameForm from '@/components/molecules/form/NameForm';
import BirthdayForm from '@/components/molecules/form/BirthdayForm';
import InputContainer from '@/components/atoms/InputContainer';
import InputField from '@/components/molecules/InputField';
import React from 'react';
import Label from '@/components/atoms/label';
import Input from '@/components/atoms/input';

const SignupModal = () => {
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
        className="mt-10 flex flex-col gap-5"
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
              className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
            />
            {/*{isInputFilled.length > 0 && (
              <Button
                size="sm"
                variant="submit"
                disabled={true}
                className="h-[42px] w-[85px] p-2 text-xs"
              >
                중복 확인
              </Button>
            )}*/}
          </InputField>
          <span>{errors.email?.message}</span>
        </InputContainer>

        {/* password */}
        <PasswordForm />

        {/* name */}
        <NameForm />

        {/* phone */}
        <PhoneForm />

        {/* birthday */}
        <BirthdayForm />

        {/*약관*/}
        <AcceptTermsGroup />
        {/*submit button*/}
        <div className="mt-5 flex w-full items-center justify-center">
          <Button type="submit" disabled={false} className="mb-5 w-80 px-7">
            다음
          </Button>
          <button type="submit">테스트</button>
        </div>
      </form>
    </Modal>
  );
};

export default SignupModal;
