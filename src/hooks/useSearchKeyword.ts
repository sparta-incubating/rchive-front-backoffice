import React, { useCallback, useEffect, useRef, useState } from 'react';

const useSearchKeyword = (initialKeyword?: string) => {
  const [searchKeyword, setSearchKeyword] = useState<string>(
    initialKeyword ?? '',
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const inputElement = e.currentTarget;
        if (document.activeElement === inputElement) {
          setSearchKeyword(inputElement.value);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (searchInputRef.current && initialKeyword !== undefined) {
      searchInputRef.current.value = initialKeyword;
    }
  }, [initialKeyword]);

  return {
    searchInputRef,
    searchKeyword,
    handleSearchKeyDown,
  };
};

export default useSearchKeyword;
