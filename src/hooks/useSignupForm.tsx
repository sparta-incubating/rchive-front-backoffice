import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  emailUniqueResponseType,
  GenderEnum,
  OAuthEnum,
  SignupFormData,
  UserRoleEnum,
} from '@/types/signup.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/validators/auth/signup.validator';
import axios from 'axios';
import { SignupForm } from '@/class/signup';

const useSignupForm = () => {
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
      phone: '',
      // phoneConfirm: false,
      ad: false,
      age: false,
      privacy: false,
      service: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log('on Submit');
    console.log({ data });

    const signUpForm = new SignupForm(
      OAuthEnum.LOCAL,
      data.email,
      data.password,
      data.birth,
      data.phone,
      GenderEnum.NONE,
      '',
      UserRoleEnum.ADMIN,
      data.age,
      data.service,
      data.privacy,
      data.ad,
    );
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

  return {
    handleSubmit,
    onSubmit,
    register,
    getValues,
    setValue,
    errors,
    watch,
    checkEmail,
    isEmailUnique,
    isValid,
  };
};

export default useSignupForm;
