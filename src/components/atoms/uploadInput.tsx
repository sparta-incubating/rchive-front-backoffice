'use client';

import Button from '@/components/atoms/button';
import React, { ComponentProps } from 'react';

interface UploadInputProps extends ComponentProps<'input'> {
  watch: string | undefined;
  isUseButton?: boolean;
}

const UploadInput = React.forwardRef<HTMLInputElement, UploadInputProps>(
  ({ watch, isUseButton = true, ...props }, ref) => {
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
            className="right-2 top-1/2 h-[44px] min-w-[74px] px-5 py-3 text-xs font-semibold"
          >
            업로드
          </Button>
        )}
      </div>
    );
  },
);

export default UploadInput;
