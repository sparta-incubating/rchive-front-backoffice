import { z } from 'zod';

export const trackEnum = z.enum([
  '',
  'UNITY',
  'NODEJS',
  'SPRING_JAVA',
  'SPRING_KOTLIN',
  'REACT',
  'AI',
  'ANDROID',
  'IOS',
  'DATA',
  'UXUI',
  'SPRING_DEEP',
]);
