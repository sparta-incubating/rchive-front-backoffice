import { roleSchema } from '@/validators/auth/role.validator';
import { z } from 'zod';

export type RoleFormSchema = z.infer<typeof roleSchema>;

export enum RoleResultEnum {
  WAIT = 'WAIT',
  REJECT = 'REJECT',
  APPROVE = 'APPROVE',
}
