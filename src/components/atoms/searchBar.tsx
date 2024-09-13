import search from '@/../public/assets/icons/search-Magnifier.svg';
import Image from 'next/image';
import React, { ComponentProps, ForwardedRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  placeholder?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder = '이름 또는 이메일로 사용자 검색', ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="w-full pt-[29px]">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <input
            placeholder={placeholder}
            {...props}
            ref={ref}
            type="text"
            className="h-[64px] w-full rounded-[14px] border border-blue-100 pl-12 pr-4 placeholder:text-sm"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[20px]">
            <Image src={search} width={18} height={18} alt="돋보기" />
          </span>
        </label>
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
