'use client';

import Button from '@/components/atoms/button';
import FormSpan from '@/components/atoms/formSpan';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import Label from '@/components/atoms/label';
import Modal from '@/components/atoms/modal';
import PhoneForm from '@/components/molecules/form/PhoneForm';
import InputField from '@/components/molecules/InputField';
import SignupHeader from '@/components/molecules/signupHeader';
import AcceptTermsGroup from '@/components/organisms/acceptTermsGroup';
import useSignupForm from '@/hooks/useSignupForm';
import { signupModalType } from '@/types/signup.types';
import { handleKeyPressOnlyNumber } from '@/utils/utils';

interface SignupModalProps {
  signupModalType: signupModalType;
}

const SignupModal = ({ signupModalType }: SignupModalProps) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    getValues,
    setValue,
    errors,
    watch,
    control,
    checkEmail,
    isEmailUnique,
    isValid,
  } = useSignupForm(signupModalType);

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

        {/* password */}

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
        <PhoneForm register={register} control={control} />

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
