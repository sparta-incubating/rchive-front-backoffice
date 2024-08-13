import { useState } from 'react';

type returnType = [
  isLoading: boolean,
  handleIsLoading: (state: boolean) => void,
];

const useIsLoading = (): returnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIsLoading = (state: boolean) => {
    setIsLoading(state);
  };

  return [isLoading, handleIsLoading];
};

export default useIsLoading;
