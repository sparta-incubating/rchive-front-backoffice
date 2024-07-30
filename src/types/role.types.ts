import { roleSchema } from '@/validators/auth/role.validator';
import { z } from 'zod';

export type RoleFormSchema = z.infer<typeof roleSchema>;
