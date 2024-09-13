'use client';

import Button from '@/components/atoms/button';
import Image from 'next/image';
import React, { ComponentProps } from 'react';

interface UploadInputProps extends ComponentProps<'input'> {
  watch: string | undefined;
  isUseButton?: boolean;
  buttonLabel?: string;
  onClick?: () => void;
  isLoading?: boolean;
  validate?: boolean;
  isUpdateMod?: boolean;
}

const UploadInput = React.forwardRef<HTMLInputElement, UploadInputProps>(
  (
    {
      watch,
      isUseButton = true,
      buttonLabel,
      isLoading,
      validate,
      onClick,
      isUpdateMod,
      ...props
    },
    ref,
  ) => {
    const showButton =
      !validate &&
      isUseButton &&
      watch &&
      (!isUpdateMod || (isUpdateMod && !validate));

    return (
      <div className="flex h-[60px] w-[326px] items-center justify-between rounded-[12px] border border-blue-100 py-[9px] pl-5 pr-2">
        <input
          type="text"
          ref={ref}
          {...props}
          className="mr-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm placeholder-gray-300 outline-none"
        />
        {showButton && (
          <Button
            size="sm"
            variant="submit"
            onClick={onClick}
            className="right-2 top-1/2 flex h-[44px] w-full min-w-[74px] max-w-[84px] items-center justify-center px-5 py-3 text-xs font-semibold"
            disabled={!!isLoading}
          >
            {isLoading ? (
              <div className="relative h-5 w-5">
                <Image
                  src={'/backoffice/assets/icons/gif/transparentProgress.gif'}
                  alt={'progress gif'}
                  fill
                />
              </div>
            ) : (
              buttonLabel
            )}
          </Button>
        )}
      </div>
    );
  },
);

export default UploadInput;
