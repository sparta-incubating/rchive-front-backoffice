import { getMailCheck, postSignup } from '@/api/client/authApi';
import { Admin, User } from '@/class/signup';
import SignUpCompleteModal from '@/components/pages/signUpCompleteModal';
import { useModalContext } from '@/context/useModalContext';
import {
  GenderEnum,
  OAuthEnum,
  SignupFormSchema,
  signupModalType,
  UserRoleEnum,
} from '@/types/signup.types';
import { formatDate } from '@/utils/utils';
import { signupSchema } from '@/validators/auth/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const DEFAULT_VALUE = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  birth: '',
  // phoneConfirm: false,
  ad: false,
  age: false,
  privacy: false,
  service: false,
};

const useSignupForm = (signupType: signupModalType) => {
  const [isEmailUnique, setIsEmailUnique] = useState<boolean | undefined>(
    undefined,
  );
  const { open } = useModalContext();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: DEFAULT_VALUE,
  });

  const onSubmit = async (data: SignupFormSchema) => {
    const signUpFormData = createSignupForm(signupType, data);
    await postSignup(signUpFormData);
    open(<SignUpCompleteModal />);
  };

  const checkEmail = async (email: string) => {
    try {
      const data = await getMailCheck(email);
      setIsEmailUnique(data.data);
    } catch (error) {
      console.error('Error checking email uniqueness', error);
      setIsEmailUnique(false);
    }
  };

  const email = watch('email');
  useEffect(() => {
    setIsEmailUnique(undefined);
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
  data: SignupFormSchema,
) => {
  if (signupType === signupModalType.MANAGER) {
    return new Admin(
      OAuthEnum.LOCAL,
      data.email,
      data.username,
      data.password,
      formatDate(data.birth),
      data.phone,
      GenderEnum.NONE,
      UserRoleEnum.MANAGER,
      data.age,
      data.service,
      data.privacy,
      data.ad,
      '',
    );
  } else {
    return new User(
      OAuthEnum.LOCAL,
      data.email,
      data.username,
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
      '',
    );
  }
};
export default useSignupForm;
