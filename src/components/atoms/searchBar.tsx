import search from '@/../public/assets/icons/search-Magnifier.svg';
import Image from 'next/image';
import React, { ComponentProps, ForwardedRef } from 'react';

interface InputProps extends ComponentProps<'input'> {}

const SearchBar = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 ml-[20px] flex items-center">
          <Image src={search} width={18} height={18} alt="돋보기" />
        </span>
        <input
          {...props}
          ref={ref}
          type="text"
          placeholder="이름 도는 이메일로 사용자 검색"
          className="h-[62px] w-[1084px] rounded-xl border-2 border-blue-100 pl-[48px] placeholder:text-sm"
        />
      </label>
    );
  },
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;