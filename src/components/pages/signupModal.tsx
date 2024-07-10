'use client';

import SignupHeader from '@/components/molecules/signupHeader';
import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import AcceptTermsGroup from '@/components/organisms/acceptTermsGroup';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/validators/auth/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneForm from '@/components/molecules/form/PhoneForm';
import InputContainer from '@/components/atoms/InputContainer';
import InputField from '@/components/molecules/InputField';
import React, { useEffect, useState } from 'react';
import Label from '@/components/atoms/label';
import Input from '@/components/atoms/input';
import FormSpan from '@/components/atoms/formSpan';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import { handleKeyPressOnlyNumber } from '@/utils/utils';
import { emailUniqueResponseType, SignupFormData } from '@/types/signup.types';
import axios from 'axios';

const SignupModal = () => {
  const [isEmailUnique, setIsEmailUnique] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      /*      phone: '',
      phoneConfirm: false,*/
      ad: false,
      age: false,
      privacy: false,
      service: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log('on Submit');
    console.log({ data });
  };

  const checkEmail = async (email: string) => {
    try {
      const response = await axios.get<emailUniqueResponseType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/overlap/email?email=${email}`,
      );
      setIsEmailUnique(!!response.data.status);
    } catch (error) {
      console.error('Error checking email uniqueness', error);
      setIsEmailUnique(false);
    }
  };

  const email = watch('email');
  useEffect(() => {
    setIsEmailUnique(false);
  }, [email]);

  useEffect(() => {
    console.log({ isEmailUnique });
    console.log({ isValid });
    console.log('ad = ', getValues('ad'));
    console.log('privacy = ', getValues('privacy'));
    console.log('service = ', getValues('service'));
    console.log('age = ', getValues('age'));
  }, [isEmailUnique, isValid, getValues]);

  return (
    <Modal>
      {/*modal 헤더*/}
      <SignupHeader />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-5"
      >
        <h1 className="text-center text-xl font-semibold">회원가입</h1>
        {/* email */}
        <section>
          <InputContainer>
            <InputField>
              <Label htmlFor="email">이메일</Label>
              <Input
                {...register('email')}
                placeholder="이메일 입력"
                className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              />
            </InputField>
            {watch('email').length > 0 && (
              <Button
                size="sm"
                variant={'submit'}
                type="button"
                disabled={!!errors.email?.message}
                className="h-[42px] w-[85px] p-2 text-xs"
                onClick={() => checkEmail(getValues('email'))}
              >
                중복 확인
              </Button>
            )}
          </InputContainer>
          {errors.email?.message && (
            <FormSpan variant="error">{errors.email?.message}</FormSpan>
          )}
          {isEmailUnique && (
            <FormSpan variant="success">사용가능한 이메일입니다.</FormSpan>
          )}
        </section>

        {/* password */}
        <section>
          <PasswordContainer>
            <InputField variant="secondary">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                {...register('password')}
                placeholder="6자 이상, 숫자와 영문자 조합"
                className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              />
            </InputField>
            <div className="border" />
            <Input
              type="password"
              {...register('passwordConfirm')}
              placeholder="비밀번호 재입력"
              className="my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
            />
          </PasswordContainer>
          <div className="flex flex-col gap-1">
            {errors.password?.message && (
              <FormSpan variant="error">{errors.password?.message}</FormSpan>
            )}
            {errors.passwordConfirm?.message && (
              <FormSpan variant="error">
                {errors.passwordConfirm?.message}
              </FormSpan>
            )}
          </div>
        </section>

        {/* name */}
        <section>
          <InputContainer>
            <InputField>
              <Label htmlFor="userName">이름</Label>
              <Input
                {...register('name')}
                placeholder="이름 입력"
                className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              />
            </InputField>
          </InputContainer>
          {errors.name?.message && (
            <FormSpan variant="error">{errors.name?.message}</FormSpan>
          )}
        </section>

        {/* phone */}
        <PhoneForm />

        {/* birthday */}
        <section>
          <InputContainer>
            <InputField>
              <Label htmlFor="birthdate">생년월일</Label>
              <Input
                {...register('birth')}
                placeholder="ex.  19990101"
                className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                onKeyDown={handleKeyPressOnlyNumber}
              />
            </InputField>
          </InputContainer>
          {errors.birth?.message && (
            <FormSpan variant="error">{errors.birth?.message}</FormSpan>
          )}
        </section>

        {/*약관*/}
        <AcceptTermsGroup
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />

        {/*submit button*/}
        <div className="mt-5 flex w-full items-center justify-center">
          <Button
            type="submit"
            disabled={!isValid || !isEmailUnique}
            className="mb-5 w-80 px-7"
          >
            다음
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignupModal;
