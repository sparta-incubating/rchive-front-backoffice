import { z } from 'zod';
import { signupSchema } from '@/validators/auth/signup.validator';

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

export type SignupFormData = z.infer<typeof signupSchema>;
