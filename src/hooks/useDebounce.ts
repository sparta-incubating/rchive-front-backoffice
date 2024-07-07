import { useEffect, useState } from 'react';

/**
 * 디바운싱 커스텀 훅
 * 입력이 끝난 후 일정 시간이 지나 어떠한 동작을 실행하게 만드는 훅
 *
 * @template T 입력 값의 타입
 * @param {T} value - 디바운스할 값
 * @param {number} delay - 디바운스 지연 시간 (밀리초)
 * @returns {T} 디바운스된 값
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
