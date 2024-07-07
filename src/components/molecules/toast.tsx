'use client';

import { VariantProps } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import { eventEmitter, toastVariants } from '@/utils/toast';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string;
}

const Toast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const createToast = ({ message, variant }: ToastProps) => {
      setToast({ message, variant });
      setTimeout(() => setIsVisible(true), 10);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setToast(null), 500);
      }, 3000);
    };

    eventEmitter.on('createToast', createToast);

    return () => {
      eventEmitter.on('createToast', createToast);
    };
  }, []);

  if (!toast) return null;

  return createPortal(
    <div
      className={` ${toastVariants({ variant: toast.variant })} transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} `}
    >
      <div className="relative h-8 w-8">
        <Image src={'/assets/icons/checkBlue.svg'} alt={'check icon'} fill />
      </div>
      <span className="">{toast.message}</span>
    </div>,
    document.body,
  );
};

export default Toast;
