'use client';

import Button from '@/components/atoms/button';
import { ChangeEvent } from 'react';

interface UploadInputProps {
  value: string;
  onChange: (value: string) => void;
}

const UploadInput = ({ value, onChange }: UploadInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex h-[100vh] max-h-[60px] w-full max-w-[360px] items-center justify-between rounded-[12px] border border-blue-100 py-[9px] pl-5 pr-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="mr-2 w-full overflow-hidden text-ellipsis whitespace-nowrap outline-none"
        placeholder="자료 링크를 입력해주세요."
      />
      {value && (
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
};

export default UploadInput;
