'use client';

import { confirmContext } from '@/context/ConfirmContext';
import { useContext } from 'react';

export const useConfirmContext = () => {
  const context = useContext(confirmContext);
  if (!context) {
    throw new Error('ConfirmContext must be used within a ConfirmProvider');
  }
  return context;
};
