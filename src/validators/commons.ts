import { z } from 'zod';

export const trackEnum = z.enum([
  '',
  'UNITY',
  'NODEJS',
  'SPRING_JAVA',
  'SPRING_KOTLIN',
  'FRONT_REACT',
  'WEB',
  'ANDROID',
  'IOS',
  'DATA',
  'UXUI',
]);
