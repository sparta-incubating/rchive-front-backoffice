import { z } from 'zod';

export const roleSchema = z.object({
  track: z.string().min(1, '트랙을 선택해주세요.'),
  period: z.string().optional(),
});
