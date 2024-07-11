import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  emailUniqueResponseType,
  GenderEnum,
  OAuthEnum,
  SignupFormData,
  signupModalType,
  UserRoleEnum,
} from '@/types/signup.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/validators/auth/signup.validator';
import axios from 'axios';
import { Admin, User } from '@/class/signup';
import { formatDate } from '@/utils/utils';

const useSignupForm = (signupType: signupModalType) => {
  const [isEmailUnique, setIsEmailUnique] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'all',
    reValidateMode: 'onChange',
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
    const signUpForm = createSignupForm(signupType, data);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/signup`,
      signUpForm,
    );
    console.log(response.data);
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
    control,
    checkEmail,
    isEmailUnique,
    isValid,
  };
};

const createSignupForm = (
  signupType: signupModalType,
  data: SignupFormData,
) => {
  if (signupType === signupModalType.MANAGER) {
    return new Admin(
      OAuthEnum.LOCAL,
      data.email,
      data.password,
      formatDate(data.birth),
      data.phone,
      GenderEnum.NONE,
      UserRoleEnum.MANAGER,
      data.age,
      data.service,
      data.privacy,
      data.ad,
    );
  } else {
    return new User(
      OAuthEnum.LOCAL,
      data.email,
      data.password,
      formatDate(data.birth),
      data.phone,
      GenderEnum.NONE,
      UserRoleEnum.USER,
      data.age,
      data.service,
      data.privacy,
      data.ad,
      '',
    );
  }
};
export default useSignupForm;
