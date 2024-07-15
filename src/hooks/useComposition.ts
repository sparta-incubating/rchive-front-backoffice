import { useEffect, useState } from 'react';

const useComposition = (ref: React.RefObject<HTMLDivElement>) => {
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    const inputElement = ref.current;
    if (inputElement) {
      inputElement.addEventListener('compositionstart', () =>
        setIsComposing(true),
      );
      inputElement.addEventListener('compositionend', () =>
        setIsComposing(false),
      );
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('compositionstart', () =>
          setIsComposing(true),
        );
        inputElement.removeEventListener('compositionend', () =>
          setIsComposing(false),
        );
      }
    };
  }, [ref]);

  return { isComposing };
};

export default useComposition;
