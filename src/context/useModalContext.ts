'use client';

import { useContext } from 'react';
import { ModalContext } from './modal.context';

export const useModalContext = () => {
  if (!ModalContext) throw new Error('Context 범위가 아닙니다.');
  return useContext(ModalContext);
};
