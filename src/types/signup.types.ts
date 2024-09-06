import { signupSchema } from '@/validators/auth/signup.validator';
import { z } from 'zod';

export type CheckListType = {
  id: string;
  label: string;
  isChecked: boolean;
  link?: string;
};

export type SelectOptionType = {
  value: string;
  label: string;
  selected: boolean;
};

export type emailUniqueResponseType = {
  status: string;
  message: string;
  data: false;
};

export type SignupFormSchema = z.infer<typeof signupSchema>;

export enum OAuthEnum {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
}

export enum GenderEnum {
  NONE = 'NONE',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum UserRoleEnum {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export enum signupModalType {
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export type authCodeType = {
  username: string;
  phone: string;
  authCode: string;
};
