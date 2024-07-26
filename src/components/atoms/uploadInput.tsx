'use client';

import Button from '@/components/atoms/button';
import React, { ComponentProps } from 'react';

interface UploadInputProps extends ComponentProps<'input'> {
  watch: string | undefined;
  isUseButton?: boolean;
  buttonLabel?: string;
  onClick?: () => void;
}

const UploadInput = React.forwardRef<HTMLInputElement, UploadInputProps>(
  ({ watch, isUseButton = true, buttonLabel, onClick, ...props }, ref) => {
    return (
      <div className="flex h-[62px] w-[334px] items-center justify-between rounded-[12px] border border-blue-100 py-[9px] pl-5 pr-2">
        <input
          type="text"
          ref={ref}
          {...props}
          className="mr-2 w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none"
        />
        {isUseButton && watch && (
          <Button
            size="sm"
            variant="secondary"
            onClick={onClick}
            className="right-2 top-1/2 h-[44px] w-full min-w-[74px] max-w-[84px] px-5 py-3 text-xs font-semibold"
          >
            {/*<div className="relative h-5 w-5">
              <Image
                src={'/assets/icons/gif/secondaryProgress.gif'}
                alt={'progress gif'}
                fill
              />
            </div>*/}
            {buttonLabel}
          </Button>
        )}
      </div>
    );
  },
);

export default UploadInput;
