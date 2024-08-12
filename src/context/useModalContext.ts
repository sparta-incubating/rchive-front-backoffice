'use client';

import { createContext, useContext } from 'react';
import { ModalContextValue } from './modal.context';

const initialModalContext: ModalContextValue = {
  open: () => {},
  close: () => {},
  backdropClosable: true,
};

const ModalContext = createContext<ModalContextValue>(initialModalContext);

export const useModalContext = () => {
  if (!ModalContext) throw new Error('Context 범위가 아닙니다.');
  return useContext(ModalContext);
};
