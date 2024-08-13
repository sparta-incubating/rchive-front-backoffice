'use client';

import checkBlue from '@/../public/assets/icons/checkBlue.svg';
import checkOrange from '@/../public/assets/icons/checkOrange.svg';
import { eventEmitter, toastVariants } from '@/utils/toast';
import { VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string;
  isIcon: boolean;
}

const Toast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const createToast = ({ message, variant, isIcon }: ToastProps) => {
      setToast({ message, variant, isIcon });
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
      {toast.isIcon && (
        <div className="relative h-8 w-8">
          {toast.variant === 'primary' ? (
            <Image src={checkBlue} alt={'check icon'} fill />
          ) : (
            <Image src={checkOrange} alt={'check icon'} fill />
          )}
        </div>
      )}
      <span className="">{toast.message}</span>
    </div>,
    document.body,
  );
};

export default Toast;
